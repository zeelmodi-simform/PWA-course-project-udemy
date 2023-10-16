var deferredPrompt;

if (!window.Promise) {
    window.Promise = Promise;
}

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
    }).catch((error) => {
        console.log(error);
    });
}

window.addEventListener('beforeinstallprompt', function (event) {
    console.log('beforeinstallprompt fired!');
    event.preventDefault();

    deferredPrompt = event;

    return false

})

var promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('This is executed once the timer is done')
        reject({code: 500, message: 'An error occured!'})
        // console.log('This is executed once the timer is done');
    }, 3000);
});

// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://httpbin.org/ip');
// xhr.responseType = 'json';
// xhr.onload = function () {
//     console.log(xhr.response);
// }
// xhr.onerror = function (error) {
//     console.error(error);
// }
// xhr.send()

fetch(`https://httpbin.org/ip`).then((response) => {
    console.log(response);
    return response.json()
}).then((data) => {
    console.log(data);
}).catch((error) => {
    console.error(error);
})

fetch(`https://httpbin.org/post`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        message: 'Does this work?'
    }),
    mode: 'cors'
}).then((response) => {
    console.log(response);
    return response.json()
}).then((data) => {
    console.log(data);
}).catch((error) => {
    console.error(error);
});

promise.then((text) => {
    return text
},
    // (err) => {
    // console.log(error.code, error.message);  
    // }
).then((newText) => {
    console.log(newText);
}).catch((error) => {
    console.log(error.code, error.message);
});

console.log('This is executed right after setTimeout()');