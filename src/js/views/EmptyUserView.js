'use strict';

var Marionette = require('backbone.marionette');
var emptyUserTemplate = require('../../templates/emptyUser.tpl');

module.exports = Marionette.CompositeView.extend({
    className: 'users-empty',
    template: emptyUserTemplate
});