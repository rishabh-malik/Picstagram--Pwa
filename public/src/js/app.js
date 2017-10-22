var deferredPrompt;
//check the existence of service worker in browser
if('serviceWorker' in navigator){
    //registering the service worker
    navigator.serviceWorker
        .register("/sw.js")
        .then(function(){
            console.log("service worker registered");
        }).catch(function(err){
            console.log(err);
        });
}

//disallowing chrome to show install app prompt at default time
window.addEventListener('beforeinstallprompt',function(event){
    console.log('before installation fired');
    event.preventDefault();
    //storing that event
    deferredPrompt=event;
    return false;
});
