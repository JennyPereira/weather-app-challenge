let version = "version 1";

self.addEventListener("install", e=>{
    console.log("instalado");
    caches.open(version).then(cache => {
        cache.add("index.html").then(res => {
            console.log("Informacion de index.html cacheada");
        }).catch(error => {
            console.log(error);
        })
    })
});

self.addEventListener("activate", ()=>{
    caches.keys().then(key => {
        return Promise.all(
            key.map(cache => {
                if (cache !== version) {
                    console.log("ACTIVADO");
                    return caches.delete(cache);
                }
            })
        )
    })
});

self.addEventListener("fetch", e => {
    e.respondWith(async function() {
        const responseCache = await caches.match(e.request);
        if (responseCache) return responseCache;
        return e.request;
    });
})
