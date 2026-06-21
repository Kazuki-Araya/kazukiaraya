const CACHE_NAME = 'kazuki-cache-v1.0.2';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/images/icon-192.png',
  '/assets/images/icon-512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    ).then(() => clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // Không cache file sw.js và các file từ catbox/media
  if (url.pathname.includes('sw.js') || url.hostname.includes('files.catbox.moe')) return;
  if (
    request.destination === 'image' ||
    request.destination === 'audio' ||
    request.destination === 'video'
  ) return;

  // Chiến lược Network First cho HTML (trang chính) để luôn nhận diện được v=... mới
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(() =>
          new Response('Offline', {
            status: 503,
            headers: { 'Content-Type': 'text/plain' }
          })
        );
    })
  );
});
