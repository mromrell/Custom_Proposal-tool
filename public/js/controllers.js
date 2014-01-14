'use strict';

/* Controllers */

angular.module('addressBookApp.controllers', [])
    .controller('BaseController', ['$scope', '$location', '$window', 'Restangular', 'SessionService', function($scope, $location, $window, Restangular, SessionService) {
        $scope.userSession = SessionService.getUserSession();

        $scope.isActive = function(viewLocation) {
            if (typeof viewLocation == "object") {
                var active = false;
                for (var i = 0; i < viewLocation.length; i++) {
                    if (viewLocation[i] == $location.path()) {
                        active = true;
                    }
                }
                return active;
            } else {
                return viewLocation == $location.path();
            }
        };

        $scope.doLogout = function() {
            Restangular.one('account/logout').post()
                .then(function(data) {
                    SessionService.removeUserSession();
                    $window.location = '/';
                }), function(response) {
                    $scope.message = response;
                };
        };
    }])
    .controller('LoginController', ['$scope', '$window', 'loginTitle', 'Restangular', 'SessionService', function($scope, $window, loginTitle, Restangular, SessionService) {
        $scope.user = {}

        $scope.register = function() {
            $window.location = '/register';
        }

        $scope.doLogin = function() {
            console.log('Logging in user: ' + $scope.user.email);
            var user = {
                'email': $scope.user.email,
                'password': $scope.user.password
            };

            Restangular.all('account/login').customPOST(user)
                .then(function(data) {
                    if (data == 'Unauthorized') {
                        $scope.errorMessage = 'Invalid username and/or password';
                    } else {
                        SessionService.saveUserSession(data);
                        $scope.userSession = data;
                        $window.location = '/home';
                    }
                }), function(response) {
                    $scope.errorMessage = response;
                };
        }

        $scope.hasError = function (field, validation) {
            if (validation) {
                return $scope.loginForm[field].$dirty && $scope.loginForm[field].$error[validation];
            }
            return $scope.loginForm[field].$dirty && $scope.loginForm[field].$invalid;
        };

        $scope.loginTitle = loginTitle;
    }])
    .controller('IndexController', ['$scope', '$http', function($scope, $http) {

    }])
    .controller('ExampleProposalController', ['$scope', function($scope) {
        $scope.proposal = {
            'id':'1',
            'title':'Custom Website Cost',
            'description':'This is an Example Proposal that should give you the price wio build a new website',
            'questions':{
                'q1':{
                    'qId':'1',
                    'title':'What is your Favorite Color?',
                    'qOptions': {
                        'opt1':{
                            'optionChoice':'Yellow',
                            'optionValue':"300"
                        },
                        'opt2':{
                            'optionChoice':'Green',
                            'optionValue':"50"
                        },
                        'opt3':{
                            'optionChoice':'Blue',
                            'optionValue':"120"
                        }
                    }
                    //end question
                },
                'q2':{
                    'qId':'2',
                    'title':'Who is Bill Clinton?',
                    'qOptions': {
                        'opt1':{
                            'optionChoice':'A Democrat',
                            'optionValue':"300"
                        },
                        'opt2':{
                            'optionChoice':'A Jazz Saxaphonist',
                            'optionValue':"120"
                        }
                    },
                    'qOption1':'A Democrat',
                    'qOption2':'A Saxophone player'
                },
                'q3':{
                    'qId':'3',
                    'title':'How many pages do you want?',
                    'qOptions': {
                        'opt1':{
                            'optionChoice':'A Democrat',
                            'optionValue':"300"
                        },
                        'opt2':{
                            'optionChoice':'A Jazz Saxaphonist',
                            'optionValue':"120"
                        }
                    },
                    'qOption1':'A Democrat',
                    'qOption2':'A Saxophone player'
                }
            }

        }

    }])
    .controller('RegisterController', ['$scope', '$window', 'registerConstants', 'Restangular', 'SessionService', function($scope, $window, registerConstants, Restangular, SessionService) {
        $scope.user = {}

        $scope.doRegister = function() {
            var user = {
                'email': $scope.user.email,
                'password': $scope.user.password,
                'username': $scope.user.email,
                'created': new Date(),
                'first_name': $scope.user.first_name,
                'last_name': $scope.user.last_name
            };

            Restangular.all('account/register').customPOST(user)
                .then(function(data) {
                    SessionService.saveUserSession(data);
                    $window.location = '/home';
                }), function(response) {
                    console.log('Register error: ' + response);
                    $scope.errorMessage = response;
                };
        }

        $scope.hasError = function (field, validation) {
            if (validation) {
                return $scope.registerForm[field].$dirty && $scope.registerForm[field].$error[validation];
            }

            return $scope.registerForm[field].$dirty && $scope.registerForm[field].$invalid;
        };

        $scope.registerTitle = registerConstants['title'];
        $scope.registerSubTitle = registerConstants['subTitle'];
    }])
    .controller('ContactController', ['$scope', 'Restangular', 'SessionService', function($scope, Restangular, SessionService) {
        Restangular.all('api/contacts').customGET()
            .then(function(data) {
                $scope.contacts = data.contacts;
            }), function(response) {
                console.log("Error retrieving contacts: " + response);
            };

        $scope.contact = SessionService.getCurrentContact();
    }])
//    .controller('NewProposalController'), ['$scope'], function($scope) {
//
//
//}
//    .controller('proposalResults'), ['$scope', proposalCalc], function($scope, proposalCalc) {
//
//}
    .controller('AddProposalController', ['$scope', '$window', 'contactConstants', 'Restangular', 'SessionService', function($scope, $window, contactConstants, Restangular, SessionService) {
        $scope.contact = {}

        $scope.addquestion = function() {
            var question = {
                'question_name': $scope.question.first_name,
                'last_name': $scope.question.last_name,
                'email': $scope.question.email,
                'created': new Date()
            };

            Restangular.all('api/question').customPOST(question)
                .then(function(data) {
                    SessionService.saveCurrentquestion(data.question);
                    $window.location = '/questions';
                }), function(response) {
                    $scope.errorMessage = response;
                };
        };

        $scope.hasError = function (field, validation) {
            if (validation) {
                return $scope.questionForm[field].$dirty && $scope.questionForm[field].$error[validation];
            }

            return $scope.questionForm[field].$dirty && $scope.questionForm[field].$invalid;
        };

        $scope.questionTitle = questionConstants['title'];
        $scope.questionSubTitle = questionConstants['subTitle'];
    }])

    .controller('AddContactController', ['$scope', '$window', 'contactConstants', 'Restangular', 'SessionService', function($scope, $window, contactConstants, Restangular, SessionService) {
        $scope.contact = {}

        $scope.addContact = function() {
            var contact = {
                'first_name': $scope.contact.first_name,
                'last_name': $scope.contact.last_name,
                'email': $scope.contact.email,
                'created': new Date()
            };

            Restangular.all('api/contact').customPOST(contact)
                .then(function(data) {
                    SessionService.saveCurrentContact(data.contact);
                    $window.location = '/contacts';
                }), function(response) {
                    $scope.errorMessage = response;
                };
        };

        $scope.hasError = function (field, validation) {
            if (validation) {
                return $scope.contactForm[field].$dirty && $scope.contactForm[field].$error[validation];
            }

            return $scope.contactForm[field].$dirty && $scope.contactForm[field].$invalid;
        };

        $scope.contactTitle = contactConstants['title'];
        $scope.contactSubTitle = contactConstants['subTitle'];
    }]);

