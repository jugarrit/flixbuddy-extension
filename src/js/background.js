'use strict';

var $ = require('jquery');
var _ = require('underscore');
var API_URL = 'http://bfe85653.ngrok.io';

function login(data) {
    return $.ajax({
        url: API_URL + '/login',
        data: data,
        method: 'post'
    });
}

function getUsers() {
    return $.ajax({
        url: API_URL + '/users',
        method: 'get'
    });
}

function connect(data) {
    return $.ajax({
        url: API_URL + '/connect',
        data: data,
        method: 'post'
    });
}

function disconnect(data) {
    return $.ajax({
        url: API_URL + '/disconnect',
        data: data,
        method: 'post'
    });
}

function checkIn(data) {
    return $.ajax({
        url: API_URL + '/checkIn',
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
    } else if (request.action === 'disconnect') {
        disconnect(request).then(function() {
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
    } else if (request.action === 'checkIn') {
        checkIn(request).then(function() {
            sendResponse(true);
        });
    } else {
        sendResponse({});
    }

    return true;
});
