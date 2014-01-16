'use strict';

/* Controllers */

angular.module('proposalTool.controllers', [])
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
    .controller('IndexController', ['$scope', function($scope) {

    }])
    .controller('TestController', ['$scope', function($scope) {

    }])
    .controller('ExampleProposalController', ['$scope', function($scope) {
        $scope.grandTotal= 0;

        var answerList = [];

        $scope.total = function(questionId, answerName, value){     // ---> Removed references to answerName because it was throwing a syntax error when answerName included letters
            var answer ={};                                         // Set an Empty Answer
            if (answerList.length == 0){                            // if this is the first time you are choosing an answer, just fill it out
                answer["questionId"] = questionId;
                answer["value"] = value;
                answerList.push(answer);                            // Puts the Answer hash into the AnswerList
                $scope.grandTotal += answerList[0].value
            }
            else{
                $scope.alreadyAnswered = false;
                for (var i= 0; i<answerList.length; i++ ){
                    if (questionId == answerList[i].questionId ){
                        $scope.grandTotal -= answerList[i].value
                        answerList[i].value=value;
                        $scope.grandTotal += answerList[i].value
                        $scope.alreadyAnswered = true;
                    }
                }
                if ($scope.alreadyAnswered==false) {
                    answer["questionId"] = questionId;
                    answer["value"] = value;
                    answerList.push(answer);
                    $scope.grandTotal += value;
                }
            }

            //console.log("The answerList is:");
            console.log(answerList);



        };


        $scope.proposal = {
            'id':'1',
            'title':'Custom Website Cost',
            'description':'This is an Example Proposal that should give you the price to build a new website',
            'questions':{
                'q1':{
                    'qId':'1',
                    'qTemplate':'partials/qTemplate-radio',
                    'title':'How many pages will your site have?',
                    'qOptions': {
                        'opt1':{
                            'optionChoice':'400',
                            'optionValue':"400"
                        },
                        'opt2':{
                            'optionChoice':'800',
                            'optionValue':"800"
                        },
                        'opt3':{
                            'optionChoice':'1200',
                            'optionValue':"1200"
                        }
                    }
                },  //end question
                'q2':{
                    'qId':'2',
                    'qTemplate':'partials/qTemplate-radio',
                    'title':'Fully Custom or Templated',
                    'qOptions': {
                        'opt1':{
                            'optionChoice':"1000",
                            'optionValue':"1000"
                        },
                        'opt2':{
                            'optionChoice': "500",
                            'optionValue':"500"
                        }
                    }
                },  //end question
                'q3':{
                    'qId':'3',
                    'qTemplate':'partials/qTemplate-radio',
                    'title':'How many photo galleries will you have?',
                    'qOptions': {
                        'opt1':{
                            'optionChoice':"0",
                            'optionValue':"0"
                        },
                        'opt2':{
                            'optionChoice': "200",
                            'optionValue':"200"
                        },
                        'opt3':{
                            'optionChoice':"400",
                            'optionValue':"400"
                        },
                        'opt4':{
                            'optionChoice': "800",
                            'optionValue':"800"
                        }
                    }
                }, //end question
                'q4':{
                    'qId':'4',
                    'qTemplate':'partials/qTemplate-textbox',
                    'title':'How many photo galleries will you have?'
                } //end question
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
    .controller('ProposalListController', ['$scope', 'Restangular', 'SessionService', function($scope, Restangular, SessionService) {
        Restangular.all('api/proposals').customGET()
            .then(function(data) {
                $scope.proposals = data.proposals;
            }), function(response) {
                console.log("Error retrieving proposals: " + response);
            };

        $scope.proposal = SessionService.getCurrentProposal();
        $scope.currentUserInfo = SessionService.getUserSession();
    }])

    .controller('ProposalOptionsController', ['$scope', function($scope) {
        $scope.typeChecker = function (text){
            return text
        };

        $scope.myTotal = 500;
        $scope.submitQuote = function(choices) {
            choices = parseInt(choices);
            $scope.myTotal += choices;

            return $scope.myTotal;
        }
        $scope.grandTotal = 5000;
        $scope.total = function(value){

            value = parseInt(value);
            $scope.grandTotal += value;

            return $scope.grandTotal;
        };

        $scope.proposal = {
            'id':'1',
            'title':'Custom Website Cost',
            'description':'This is an Example Proposal that should give you the price to build a new website',
            'questions':{
                'q1':{
                    'qId':'1',
                    'qTemplate':'partials/qTemplate-radio',
                    'title':'How many pages will your site have?',
                    'qOptions': {
                        'opt1':{
                            'optionChoice':'10',
                            'optionValue':"400"
                        },
                        'opt2':{
                            'optionChoice':'20',
                            'optionValue':"800"
                        },
                        'opt3':{
                            'optionChoice':'30',
                            'optionValue':"1200"
                        }
                    }
                },  //end question
                'q2':{
                    'qId':'2',
                    'qTemplate':'partials/qTemplate-radio',
                    'title':'Fully Custom or Templated',
                    'qOptions': {
                        'opt1':{
                            'optionChoice':"I want it Fully Custom",
                            'optionValue':"1000"
                        },
                        'opt2':{
                            'optionChoice': "I'll Choose a template",
                            'optionValue':"500"
                        }
                    }
                },  //end question
                'q3':{
                    'qId':'3',
                    'qTemplate':'partials/qTemplate-textbox',
                    'title':'How many photo galleries will you have?',
                    'qOptions': {
                        'opt1':{
                            'optionChoice':"0",
                            'optionValue':"0"
                        },
                        'opt2':{
                            'optionChoice': "2",
                            'optionValue':"200"
                        },
                        'opt3':{
                            'optionChoice':"4",
                            'optionValue':"400"
                        },
                        'opt4':{
                            'optionChoice': "8",
                            'optionValue':"800"
                        }
                    }
                } //end question
            }

        }

    }])

    .controller('AddProposalController', ['$scope', '$window', 'proposalConstants', 'Restangular', 'SessionService', function($scope, $window, proposalConstants, Restangular, SessionService) {
        $scope.proposal = {}

        $scope.addProposal = function() {
            var proposal = {
                'proposal_name': $scope.proposal.proposal_name,
                'description': $scope.proposal.description,
                'created': new Date()
            };

            Restangular.all('api/proposal').customPOST(proposal)
                .then(function(data) {
                    SessionService.saveCurrentProposal(data.proposal);
                    $window.location = '/proposalOptions';
                }), function(response) {
                    $scope.errorMessage = response;
                };
        };

        $scope.hasError = function (field, validation) {
            if (validation) {
                return $scope.proposalForm[field].$dirty && $scope.proposalForm[field].$error[validation];
            }

            return $scope.proposalForm[field].$dirty && $scope.proposalForm[field].$invalid;
        };

        $scope.proposalTitle = proposalConstants['title'];
        $scope.proposalSubTitle = proposalConstants['subTitle'];
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

