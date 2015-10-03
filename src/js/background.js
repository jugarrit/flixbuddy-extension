'use strict';

var $ = require('jquery');
var _ = require('underscore');

function login(data) {
    return $.ajax({
        url: 'http://bfe85653.ngrok.io/login',
        data: data,
        method: 'post'
    });
}

function getUsers() {
    return $.ajax({
        url: 'http://bfe85653.ngrok.io/users',
        method: 'get'
    });
}

function connect(data) {
    return $.ajax({
        url: 'http://bfe85653.ngrok.io/connect',
        data: data,
        method: 'post'
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'login') {
        login(request).then(function() {
            sendResponse({});
        });
    } else if (request.action === 'getUsers') {
        getUsers().then(function(data) {
            sendResponse(data);
        });
    } else if (request.action === 'connect') {
        connect(request).then(function() {
            sendResponse(true);
        }).fail(function() {
            sendResponse(false);
        });
    } else if (request.action === 'isLoggedIn') {
        getUsers().then(function(users) {
            if (_.some(users, function(user) {
                        return user.appUserId === request.userId;
                    })) {
                sendResponse(true);
            } else {
                sendResponse(false);
            }
        });
    } else {
        sendResponse({});
    }

    return true;
});
