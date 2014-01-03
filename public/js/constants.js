'use strict';

angular.module('addressBookApp.constants', [])
    .constant('loginTitle', 'Please sign in')
    .constant('registerConstants', {
        'title': 'Account registration',
        'subTitle': 'Create a new account.'
    })
    .constant('contactConstants', {
        'title': 'Create contact',
        'subTitle': 'Create a new contact.'
    });