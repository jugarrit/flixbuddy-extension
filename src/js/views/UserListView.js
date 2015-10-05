'use strict';

var Marionette = require('backbone.marionette');
var UserView = require('./UserView');
var EmptyUserView = require('./EmptyUserView');
var usersHeaderTemplate = require('../../templates/userHeader.tpl');

module.exports = Marionette.CompositeView.extend({
    className: 'users-list',
    template: usersHeaderTemplate,
    emptyView: EmptyUserView,
    childView: UserView,
    childViewOptions: function() {
        return {
            currentAppUserId: this.options.currentAppUserId,
            currentUser: this.options.currentUser
        };
    }
});