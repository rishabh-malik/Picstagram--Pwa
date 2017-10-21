//check the existence of service worker in browser
if('serviceWorker' in navigator){
    //registering the service worker
    navigator.serviceWorker
        .register("/sw.js")
        .then(function(){
            console.log("service worker registered");
        });
}
