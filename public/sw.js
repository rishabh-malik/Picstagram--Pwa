//react to events
self.addEventListener('install',function(event){
    console.log('Installing service worker',event);
});

self.addEventListener('activate',function(event){
    console.log('service worker activated',event);
    //to ensure sw is activated correctly
    return self.clients.claim();
})