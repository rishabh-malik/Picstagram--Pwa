//react to events
self.addEventListener('install',function(event){
    console.log('Installing service worker',event);
    //caching imp things
    event.waitUntil(
        caches.open('static')
        .then(function(cache){
            console.log('Precaching app shell');
            cache.add('/src/js/app.js');
        })
);
});

self.addEventListener('activate',function(event){
    console.log('service worker activated',event);
    //to ensure sw is activated correctly
    return self.clients.claim();
});

self.addEventListener('fetch',function(event){
    //console.log('service worker fetching something',event);
    //fetch data from cache
    event.respondWith(
        caches.match(event.request)
        .then(function(){
            if(response){
                return response;
            }else{
                return fetch(event.request);
            }
            })
    );
    
});