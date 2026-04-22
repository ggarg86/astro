// Geo-Time Chart Calculator — Service Worker
// Handles caching for PWA install and offline shell

const CACHE_NAME = 'geotimechart-v1';

// Files to cache for offline shell
// (app still needs internet for Google Sheets data)
const SHELL_FILES = [
  '/analysis.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Install — cache the app shell
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(SHELL_FILES).catch(function() {
        // Silently fail if some files not found — app still works
        return Promise.resolve();
      });
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(name) { return name !== CACHE_NAME; })
          .map(function(name) { return caches.delete(name); })
      );
    })
  );
  self.clients.claim();
});

// Fetch — network first, fallback to cache for shell files
self.addEventListener('fetch', function(event) {
  // Skip cross-origin requests (Google Fonts, CDN, Apps Script)
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(function(response) {
        // Cache successful responses for shell files
        if (response && response.status === 200) {
          var responseClone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(function() {
        // Network failed — try cache
        return caches.match(event.request).then(function(cached) {
          if (cached) return cached;
          // Return offline page for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/analysis.html');
          }
        });
      })
  );
});
