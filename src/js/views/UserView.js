'use strict';

var Marionette = require('backbone.marionette');
var template = require('../../templates/user.tpl');
var _ = require('underscore');
var moment = require('moment');

module.exports = Marionette.ItemView.extend({
    className: 'user-item',

    template: template,

    ui: {
        connect: '.connect',
        disconnect: '.disconnect'
    },

    events: {
        'click @ui.connect': 'onConnectClick',
        'click @ui.disconnect': 'onDisconnectClick'
    },

    serializeData: function() {
        var data = this.model.toJSON();
        var currentUser = this.options.currentUser;
        var lastSeen = moment(this.model.get('lastSeen'));
        var active = moment(Date.now()).diff(lastSeen, 'minutes') < 5;

        _.extend(data, {
            currentUserConnectedTo: currentUser && currentUser.connectedTo,
            connectedTo: false || data.connectedTo,
            flickTitle: data.flickTitle || 'Browsing Netflix',
            remaining: '' || data.remaining,
            browsing: !data.remaining,
            lastSeen: '' || lastSeen && lastSeen.fromNow(),
            active: active
        });

        return data;
    },

    onConnectClick: function(e) {
        e.preventDefault();
        e.stopPropagation();

        chrome.runtime.sendMessage({
            action: 'connect',
            appUserA: this.options.currentAppUserId,
            appUserB: this.model.get('appUserId')
        }, function(success) {
            if (success) {
                // connection successful
                this.model.set('connectedTo', this.options.currentAppUserId);
                this.options.currentUser.connectedTo = this.model.get('appUserId');
                this.render();
            } else {
                // something something error
            }
        }.bind(this));
    },

    onDisconnectClick: function(e) {
        e.preventDefault();
        e.stopPropagation();

        chrome.runtime.sendMessage({
            action: 'disconnect',
            appUserA: this.options.currentAppUserId,
            appUserB: this.model.get('appUserId')
        }, function(success) {
            if (success) {
                // disconnection successful
                this.model.unset('connectedTo');
                delete this.options.currentUser.connectedTo;
                this.render();
            }
        }.bind(this));
    }
});