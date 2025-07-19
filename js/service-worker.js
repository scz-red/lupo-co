const CACHE_NAME = 'lupo-cache-v3';

// Excluir archivos que no quieres que se cacheen
const EXCLUDE_FROM_CACHE = ['manifest.json'];

// Solo cachear lo necesario (index.html e íconos)
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/manifest.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  console.log('[ServiceWorker] Instalado');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[ServiceWorker] Borrando caché vieja:', cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
  console.log('[ServiceWorker] Activado');
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // No cachear archivos excluidos
  if (EXCLUDE_FROM_CACHE.some(path => requestUrl.pathname.endsWith(path))) {
    return event.respondWith(fetch(event.request));
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    }).catch(() => {
      // Si falla todo, intenta cargar offline básico (puedes poner aquí un fallback.html si quieres)
      return caches.match('/index.html');
    })
  );
});
