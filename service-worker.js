
// ======================================
// 1. CACHE SETTINGS
// ======================================

const CACHE_NAME = "study-planner-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json"
];


// ======================================
// 2. INSTALL SERVICE WORKER
// ======================================

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME).then(cache => {

            return cache.addAll(FILES_TO_CACHE);

        })

    );

});


// ======================================
// 3. ACTIVATE SERVICE WORKER
// ======================================

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(cacheNames => {

            return Promise.all(

                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))

            );

        })

    );

});


// ======================================
// 4. FETCH CACHED FILES
// ======================================

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(

        caches.match(event.request).then(cachedResponse => {

            return cachedResponse || fetch(event.request);

        })

    );

});
