'use strict';

// Declare app level module which depends on filters, and services

angular.module('proposalTool', [
        'ngRoute',
        'restangular',
        'proposalTool.constants',
        'proposalTool.controllers',
        'proposalTool.filters',
        'proposalTool.services',
        'proposalTool.directives'
    ]).
    config(['$routeProvider', '$locationProvider', 'RestangularProvider', '$httpProvider', function ($routeProvider, $locationProvider, RestangularProvider, $httpProvider) {
        var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope, SessionService) {
            var deferred = $q.defer();

            $http.get('/account/loggedin')
                .success(function (user) {
                    if (user != 0) {
                        // Let's make sure that localStorage has the data
                        if (!SessionService.isUserLoggedIn()) {
                            SessionService.saveUserSession(user);
                        }

                        $timeout(deferred.resolve, 0);
                    } else {
                        // Let's make sure we empty localStorage
                        if (SessionService.isUserLoggedIn()) {
                            SessionService.removeUserSession();
                        }

                        $rootScope.errorMessage = 'You need to log in.';
                        $timeout(function () {
                            deferred.reject();
                        }, 0);
                        $location.url('/');
                    }
                });

            return deferred.promise;
        };

        $httpProvider.responseInterceptors.push(function ($q, $location) {   // This intercepts a response coming back from node
            return function (promise) {
                return promise.then(
                    function (response) {
                        return response;
                    },
                    function (response) {
                        console.log('Response: ' + JSON.stringify(response));
                        console.log('URL: ' + response.config.url + ' and ' + response.config.data.email);
                        if (response.config.method = 'POST' && response.config.url.indexOf('login') != -1) {
                            return response;
                        } else {
                            if (response.status == 401) {
                                $location.url('/');
                            }

                            return $q.reject(response);
                        }
                    }
                );
            }
        });

        $routeProvider.
            when('/', {
                templateUrl: 'partials/login',
                controller: 'LoginController'
            }).
            when('/home', {
                templateUrl: 'partials/index',
                controller: 'IndexController',
                resolve: {
                    loggedin: checkLoggedin
                }
            }).
            when('/register', {
                templateUrl: 'partials/register',
                controller: 'RegisterController'
            }).
            when('/contacts', {
                templateUrl: 'partials/contacts',
                controller: 'ContactController',
                resolve: {
                    loggedin: checkLoggedin
                }
            }).
            when('/addContact', {
                templateUrl: 'partials/addContact',
                controller: 'AddContactController',
                resolve: {
                    loggedin: checkLoggedin
                }
            }).
            when('/addProposal', {
                templateUrl: 'partials/addProposal',
                controller: 'AddProposalController',
                resolve: {
                    loggedin: checkLoggedin
                }
            }).
            when('/exampleProposal', {
                templateUrl: 'partials/exampleProposal',
                controller: 'ExampleProposalController',
                radio: 'partials/templates/radio',
                textbox: 'partials/templates/textbox',

            }).
            otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
        RestangularProvider.setBaseUrl('http://localhost:3000');
    }])
    .run(['$rootScope', '$location', 'SessionService', function ($rootScope, $location, SessionService) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            if (!SessionService.isUserLoggedIn()) {
                if (next.originalPath != '/register') {
                    $location.path('/');
                }
            } else {
                // No reason to go to the login page if they are already logged in
                if (next.originalPath == '/') {
                    $location.path('/home');
                }
            }
        });
    }]);


