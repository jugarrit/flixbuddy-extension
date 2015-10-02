'use strict';

var SupportKit = require('./libs/supportkit-js/dist/supportkit.min.js');

SupportKit.init({
    appToken: '59d4v95r7lsa1se2wh2a877rf',
    serviceUrl: 'https://supportkit-staging.herokuapp.com',
    givenName: 'Julian',
    surname: 'Garritano',
    email: 'julian@supportkit.io',
    customText: {
        headerText: 'FlixBuddy',
        inputPlaceholder: 'Type a message...',
        sendButtonText: 'Send',
        introText: ''
    },
    emailCaptureEnabled: false
});