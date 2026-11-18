const CACHE_NAME = 'hako-presents-v2.7.0';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/app.css',
  '/js/core.js',
  '/js/game.js',
  '/js/features.js',
  '/js/social.js',
  '/js/admin.js',
  '/js/sync.js',
  '/js/fixtures.js',
  '/js/hako_extensions.js',
  '/vendor/qrcode.js',
  '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request).catch(() => {
      if (event.request.mode === 'navigate') return caches.match('/index.html');
    }))
  );
});
