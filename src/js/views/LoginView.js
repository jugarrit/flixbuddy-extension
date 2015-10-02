'use strict';

var Marionette = require('backbone.marionette');
var template = require('../../templates/login.tpl');

module.exports = Marionette.ItemView.extend({
    className: 'login',

    template: template,

    ui: {
        form: '[data-ui-form]',
        firstName: '#first-name',
        lastName: '#last-name',
        email: '#email'
    },

    events: {
        'submit @ui.form': 'onFormSubmit'
    },

    onFormSubmit: function(e) {
        e.preventDefault();

        var firstName = this.ui.firstName.val();
        var lastName = this.ui.lastName.val();
        var email = this.ui.email.val();

        this.trigger('login', {
            firstName: firstName,
            lastName: lastName,
            email: email
        });
    }
});