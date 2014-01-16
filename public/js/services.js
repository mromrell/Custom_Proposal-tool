'use strict';

/* Services */
angular.module('proposalTool.services', ['angularLocalStorage'])
    .factory('SessionService', function($http, storage) {
        return {
            saveUserSession: function(data) {
                storage.set('user', data);
            },
            getUserSession: function() {
                return storage.get('user');
            },
            removeUserSession: function() {
                storage.clearAll();
            },
            isUserLoggedIn: function() {
                return storage.get('user') != null;
            },
            saveCurrentContact: function(data) {
                storage.set('contact', data);
            },
            getCurrentContact: function() {
                return storage.get('contact');
            },
            saveCurrentProposal: function(data) {
                storage.set('proposal', data);
            },
            getCurrentProposal: function() {
                return storage.get('proposal');
            },
            saveIdToProposal: function() {
                return storage.get(userId);
            }
        };
    })
    .value('version', '0.1');
