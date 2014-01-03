'use strict';

/* Directives */

angular.module('addressBookApp.directives', [])
    .directive('appVersion', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    })
    .directive('loggedIn', ['$rootScope', 'SessionService', function ($rootScope, SessionService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var prevDisplay = element.css('display');
                var userSession = SessionService.getUserSession();
                $rootScope.$watch('userSession', function () {
                    if (userSession == undefined || userSession == null) {
                        element.css('display', 'none');
                    } else {
                        element.css('display', prevDisplay);
                    }
                })
            }
        }
    }])
    .directive('loggedOut', ['$rootScope', 'SessionService', function ($rootScope, SessionService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var prevDisplay = element.css('display');
                var userSession = SessionService.getUserSession();
                $rootScope.$watch('userSession', function () {
                    if (userSession != undefined && userSession != null) {
                        element.css('display', 'none');
                    } else {
                        element.css('display', prevDisplay);
                    }
                })
            }
        }
    }]);
