'use strict';

var Marionette = require('backbone.marionette');
var template = require('../../templates/user.tpl');

module.exports = Marionette.ItemView.extend({
    className: 'user',

    template: template,

    ui: {
        connect: '.connect'
    },

    events: {
        'click @ui.connect': 'onConnectClick'
    },

    onConnectClick: function(e) {
        e.preventDefault();
        e.stopPropagation();

        chrome.runtime.sendMessage({
            action: 'connect',
            appUserA: this.options.currentAppUserId,
            appUserB: this.model.get('appUserId')
        }, function() {
            console.log('connection successful');
        });
    }
});