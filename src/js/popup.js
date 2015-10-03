'use strict';

var UsersView = require('./views/UserListView');
var LoginView = require('./views/LoginView');

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var userIdPromise;
var userList;
var currentAppUserId;

function getUserId() {
    var deferred = $.Deferred();

    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            method: 'getLocalStorage'
        }, function(response) {
            var appUserId = response && response.data;
            deferred.resolve(appUserId);
        });
    });

    return deferred.promise();
}

function login(user) {
    var deferred = $.Deferred();

    userIdPromise.then(function(appUserId) {
        if (appUserId) {
            var loginMessage = {
                action: 'login',
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                appUserId: appUserId
            };

            chrome.runtime.sendMessage(loginMessage, function() {
                deferred.resolve(user);
            });
        }
    });

    return deferred.promise();
}

function showUsersView() {
    var omitted = _(_.omit(userList, function(user) {
        return user.appUserId === currentAppUserId;
    })).toArray();

    var usersView = new UsersView({
        collection: new Backbone.Collection(omitted),
        currentAppUserId: currentAppUserId
    });

    $('body').empty();
    $('body').append(usersView.render().el);
}

function showLoginView() {
    var loginView = new LoginView();

    $('body').empty();
    $('body').append(loginView.render().el);

    loginView.on('login', function(user) {
        login(user).then(function() {
            $('body').empty();
            showUsersView();
        });
    });
}

function initialize() {
    userIdPromise = getUserId();

    chrome.runtime.sendMessage({
        action: 'getUsers'
    }, function(users) {
        userList = users;

        userIdPromise.then(function(appUserId) {
            currentAppUserId = appUserId;

            var loggedIn = _.some(userList, function(user) {
                return user.appUserId === currentAppUserId;
            });

            if (loggedIn) {
                showUsersView();
            } else {
                showLoginView();
            }
        });
    });
}

initialize();