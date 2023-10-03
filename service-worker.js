// service-worker.js

// Define el nombre de la caché
const CACHE_NAME = 'arasamovil-cache-v1';

// Lista de archivos que se deben almacenar en caché
const cacheUrls = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/logo.jpg',
    // Agrega más archivos y recursos que deseas almacenar en caché aquí
];

// Instala el service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(cacheUrls);
            })
    );
});

// Activa el service worker y elimina las cachés antiguas
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Intercepta las solicitudes y busca en caché antes de hacer una solicitud de red
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
