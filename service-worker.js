// Geo-Time Chart Calculator — Service Worker
// Handles caching for PWA install and offline shell

const CACHE_NAME = 'geotimechart-v3'; // bumped: forces iOS Safari to evict stale cache

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

// Fetch — network first with iOS Safari fixes
self.addEventListener('fetch', function(event) {
  // Skip cross-origin requests (Google Fonts, CDN, Apps Script)
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // iOS Safari fix: for navigate (page load / pull-to-refresh) requests,
  // always go network-first with cache:'no-cache' so iOS never serves stale HTML
  // and pull-to-refresh actually fetches fresh content.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request, { cache: 'no-cache' })
        .then(function(response) {
          if (response && response.status === 200) {
            var responseClone = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(function() {
          // Network failed — serve cached shell as offline fallback
          return caches.match('/analysis.html');
        })
    );
    return;
  }

  // For all other requests: network first, fallback to cache
  event.respondWith(
    fetch(event.request)
      .then(function(response) {
        if (response && response.status === 200) {
          var responseClone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(function() {
        return caches.match(event.request);
      })
  );
});