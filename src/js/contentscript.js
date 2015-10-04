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

function checkIn() {
    var flickTitle = document.getElementsByClassName('player-status')[0];
    var remaining = document.getElementsByClassName('player-slider')[0];
    var episode = flickTitle && flickTitle.children[1];
    var episodeTitle = flickTitle && flickTitle.children[2];

    flickTitle = flickTitle && flickTitle.children[0].innerText;
    flickTitle = episode ? flickTitle + ' - ' + episode.innerText : flickTitle;
    flickTitle = episodeTitle ? flickTitle + ' - ' + episodeTitle.innerText : flickTitle;
    remaining = remaining && remaining.firstChild.innerText;

    chrome.runtime.sendMessage({
        action: 'checkIn',
        flickTitle: flickTitle,
        remaining: remaining,
        appUserId: localStorage.getItem('sk_appuserid')
    });
}

// isLoggedIn(function(loggedIn) {
if (true) {
    injectScript(chrome.extension.getURL('/scripts/sk-loader.js'), 'body');
    injectCSS(chrome.extension.getURL('styles/custom.css'), 'head');
}
// });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method === 'getLocalStorage') {
        sendResponse({
            data: localStorage.getItem('sk_appuserid')
        });
    } else {
        sendResponse({});
    }
});

setInterval(checkIn, 5000);