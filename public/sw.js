var CACHE_STATIC_NAME = 'static-v4' 
var CACHE_DYNAMIC_NAME = 'dynamic-v2'

self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME).then(function (cache) {
            console.log('[Service Worker] Pre-caching app shell');
            // cache.add('/')
            // cache.add('/index.html') // NOTE: it won't work
            // cache.add('/src/js/app.js')


            cache.addAll([
                '/',
                '/index.html',
                // '/help/index.html',
                '/src/js/app.js',
                '/src/js/feed.js',
                '/src/js/promise.js',
                '/src/js/fetch.js',
                '/src/js/material.min.js',
                '/src/css/app.css',
                '/src/css/feed.css',
                '/src/images/main-image.jpg',
                'https://fonts.googleapis.com/css?family=Roboto:400,700',
                'https://fonts.googleapis.com/icon?family=Material+Icons',
                'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
            ]);
        })
    );
})

self.addEventListener('activate', function (event) {
    // console.log('[Service Worker] Activating Service Worker ...', event);
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
                    console.log('[Service Worker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    )
    return self.clients.claim()
})

self.addEventListener('fetch', function (event) {
    console.log('[Service Worker] Fetching something ...', event);

    // event.respondWith(fetch(event.request));
    event.respondWith(caches.match(event.request).then((response) => {
        console.log('inside fetch:::', { response });
        if (response) {
            return response;
        }
        else {
            return fetch(event.request).then((res) => {
                return caches.open('dynamic').then((cache) => {
                    if (
                        event.request.url.startsWith('chrome-extension') ||
                        event.request.url.includes('extension') ||
                        !(event.request.url.indexOf('http') === 0)
                    ) return;
                    cache.put(event.request.url, res.clone());
                    return res;
                }).catch((error) => {

                });
            })
        }
    })
    );
});