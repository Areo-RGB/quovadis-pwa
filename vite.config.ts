import { defineConfig, type HmrContext, type Plugin, type IndexHtmlTransform } from 'vite';

// Define plugin interfaces
interface HtmlHotReloadPlugin extends Plugin {
  handleHotUpdate: (ctx: HmrContext) => void | Promise<void>;
}

interface DisablePwaDevPlugin extends Plugin {
  transformIndexHtml: IndexHtmlTransform;
}

export default defineConfig({
  root: '.',
  server: {
    port: 3006,
    host: true,
    open: true,
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: true,
      ignored: ['**/node_modules/**'],
    },
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  },
  plugins: [
    {
      name: 'html-hot-reload',
      handleHotUpdate: ({ file, server }: HmrContext) => {
        if (file.endsWith('.html')) {
          server.ws.send({
            type: 'full-reload',
          });
          return [];
        }
      },
    } as HtmlHotReloadPlugin,
    {
      name: 'disable-pwa-dev',
      transformIndexHtml: (html: string) => {
        return html
          .replace('let isPWA = true;', 'let isPWA = false;')
          .replace('var pwaNoCache = false;', 'var pwaNoCache = true;')
          .replace(/serviceWorker\.register/g, '// serviceWorker.register')
          .replace(
            '</head>',
            `<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
            <meta http-equiv="Pragma" content="no-cache">
            <meta http-equiv="Expires" content="0">
            <script>
              console.log('🔥 Development Mode: PWA disabled, cache cleared');
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for(let registration of registrations) {
                    registration.unregister();
                  }
                });
              }
              if ('caches' in window) {
                caches.keys().then(function(names) {
                  for (let name of names) {
                    caches.delete(name);
                  }
                });
              }
            </script></head>`
          );
      },
    } as DisablePwaDevPlugin,
  ],
});
