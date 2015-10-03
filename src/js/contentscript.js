'use strict';

function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}

function injectCSS(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('link');
    s.setAttribute('rel', 'stylesheet');
    s.setAttribute('type', 'text/css');
    s.setAttribute('href', file);
    th.appendChild(s);
}

function isLoggedIn(cb) {
    chrome.runtime.sendMessage({
        action: 'isLoggedIn',
        userId: localStorage.getItem('sk_appuserid')
    }, function(loggedIn) {
        cb(loggedIn);
    });
}

isLoggedIn(function(loggedIn) {
if (true) {
    injectScript(chrome.extension.getURL('/scripts/sk-loader.js'), 'body');
    injectCSS(chrome.extension.getURL('styles/custom.css'), 'head');
}
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method === 'getLocalStorage') {
        sendResponse({
            data: localStorage.getItem('sk_appuserid')
        });
    } else {
        sendResponse({});
    }
});
