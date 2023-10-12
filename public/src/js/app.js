var deferredPrompt;

navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
        console.log('Service Worker unregistered!');
        registration.unregister();
    }
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js',
        // { scope: '/help/' }
    ).then(function () {
        console.log('Service Worker registered!')
    });
}

window.addEventListener('beforeinstallprompt', function (event) {
    console.log('beforeinstallprompt fired!');
    event.preventDefault();

    deferredPrompt = event;

    return false

})