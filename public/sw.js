//react to events
self.addEventListener('install',function(event){
    console.log('Installing service worker',event);
    //caching imp things
    event.waitUntil(
        caches.open('static')
        .then(function(cache){
            console.log('Precaching app shell');
            cache.addAll([
                '/',
                '/src/js/app.js',
                '/src/js/feed.js',
                '/src/css/app.css',
                '/src/css/feed.css',
                '/index.html',
                '/offline.html',
                '/src/js/material.min.js',
                '/src/images/main-image.jpg',
                'https://fonts.googleapis.com/css?family=Roboto:400,700',
                "https://fonts.googleapis.com/icon?family=Material+Icons",
                "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css"
            ]);
            //cache.add('/');
            //cache.add('/src/js/app.js');
            //cache.add('/sindex.html');
        })
);
});

self.addEventListener('activate',function(event){
    console.log('service worker activated',event);
    //different cache version cleanup
    // event.waitUntil(
    //     caches.keys()
    //         .then(function(keyList){
    //             return Promise.all(keyList.map(function(key){
    //                 if(key!=='static-v2' && key!=='dynamic'){
    //                     console.log('Removing  old cache',key);
    //                     return caches.delete(key);
    //                 }
    //             }));
    //         })
    // );

    //to ensure sw is activated correctly
    return self.clients.claim();
});

self.addEventListener('fetch',function(event){
    //console.log('service worker fetching something',event);
    //fetch data from cache
    event.respondWith(
        caches.match(event.request)
        .then(function(response){
            if(response){
                return response;
            }else{
                //dynamic caching
                return fetch(event.request)
                    .then(function(res){
                        return caches.open('dynamic')
                            .then(function(cache){
                                cache.put(event.request.url,res.clone());
                                return res;
                            });
                    }).catch(function(err){
                        //returning the offline page
                        return caches.open('static')
                            .then(function(cache){
                                return cache.match('/offline.html');
                            })
                    });
            }
            })
    );
    
});