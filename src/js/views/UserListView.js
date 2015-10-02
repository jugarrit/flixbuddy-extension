'use strict';

var Marionette = require('backbone.marionette');
var UserView = require('./UserView');

module.exports = Marionette.CollectionView.extend({
    childView: UserView,
    childViewOptions: function() {
        return {
            currentAppUserId: this.options.currentAppUserId
        };
    }
});