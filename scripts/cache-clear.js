// Development Cache Clearing Script
// This script runs on page load to clear any cached content during development

(function () {
  'use strict';

  console.log('🧹 Development Mode: Clearing cache...');

  // Clear Service Worker registrations
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .getRegistrations()
      .then(function (registrations) {
        for (let registration of registrations) {
          registration.unregister();
          console.log('🔄 Unregistered service worker:', registration);
        }
      })
      .catch(function (error) {
        console.log('Service worker unregister failed:', error);
      });
  }

  // Clear all caches
  if ('caches' in window) {
    caches
      .keys()
      .then(function (names) {
        for (let name of names) {
          caches.delete(name);
          console.log('🗑️ Deleted cache:', name);
        }
      })
      .catch(function (error) {
        console.log('Cache clearing failed:', error);
      });
  }

  // Clear localStorage related to PWA
  try {
    localStorage.removeItem('QuoVadis-pwa-prompt');
    localStorage.removeItem('QuoVadis-installed');
    console.log('🧹 Cleared PWA localStorage');
  } catch (error) {
    console.log('localStorage clear failed:', error);
  }

  // Disable any service worker registration attempts
  if (window.addEventListener) {
    window.addEventListener('load', function () {
      // Override service worker registration
      if ('serviceWorker' in navigator && navigator.serviceWorker.register) {
        const originalRegister = navigator.serviceWorker.register;
        navigator.serviceWorker.register = function () {
          console.log('🚫 Service worker registration blocked for development');
          return Promise.reject(new Error('Service worker disabled in development'));
        };
      }
    });
  }

  console.log('✅ Cache clearing complete');
})();
