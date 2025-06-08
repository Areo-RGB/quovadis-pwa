import { defineConfig } from 'vite';

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
  // Enable hot reload for HTML files and disable PWA caching during development
  plugins: [
    {
      name: 'html-hot-reload',
      handleHotUpdate({ file, server }) {
        if (file.endsWith('.html')) {
          server.ws.send({
            type: 'full-reload',
          });
          return [];
        }
      },
    },
    {
      name: 'disable-pwa-dev',
      transformIndexHtml(html) {
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
    },
  ],
});
