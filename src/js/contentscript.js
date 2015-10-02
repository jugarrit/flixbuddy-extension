'use strict';

console.log('injecting sk-loader');


function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}

function loggedIn() {
    return true;
}

if (loggedIn()) {
    injectScript(chrome.extension.getURL('/scripts/sk-loader.js'), 'body');
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method === 'getLocalStorage') {
        sendResponse({
            data: localStorage.getItem(request.key)
        });
    } else {
        sendResponse({});
    }
});
