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
     .controller('ProposalDetailsController', ['$scope', 'Restangular', '$routeParams', function($scope, Restangular, $routeParams) {
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

        Restangular.all('api/proposals').customGET()
            .then(function(data) {
                for (var i=0; i<data.proposals.length; i++){
                    if (data.proposals[i]._id == $routeParams.id){
                        $scope.proposal = data.proposals[i];
                        console.log($scope.proposal);
                        console.log($scope.proposal.questionList[1]);
                    }
                }
            });

        //This is used to choose the right project data to display based on the URL/project selected
//        PortfolioListService.success(function(portfolioList) {
//            $scope.project = portfolioList[$routeParams.id];
//
//        });
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
            'questionList':{
                'q1':{
                    'qId':'1',
                    'qtemplate':'partials/qtemplate-radio',
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
                    'qtemplate':'partials/qtemplate-radio',
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
                    'qtemplate':'partials/qtemplate-radio',
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
                    'qtemplate':'partials/qtemplate-textbox',
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
        Restangular.all('api/contacts').customGET()
            .then(function(data) {
                $scope.contacts = data.contacts;
            }), function(response) {
                console.log("Error retrieving contacts: " + response);
            };
        $scope.deleteProposal = function (proposalId) {
			Restangular.one('api/proposals/' + proposalId).remove()
		    	.then(function (data) {
		        	$scope.proposals = data.proposals;
		        })
        }

        $scope.proposals = SessionService.getProposalLength();
        $scope.currentUserInfo = SessionService.getUserSession();
        $scope.contact = SessionService.getCurrentContact();
    }])
    .controller('AddProposalController', ['$scope', '$window', 'proposalConstants', 'Restangular', 'SessionService', function($scope, $window, proposalConstants, Restangular, SessionService) {

        $scope.qtemplateViews = [
            {name:'Multiple Choice', value:'partials/qtemplateCreation-radio'},
            {name:'Text Box', value:'partials/qtemplateCreation-textbox'}
        ];
        $scope.qtemplateView = $scope.qtemplateViews[0];  // sets the default question type to Radio

        $scope.newProposal = {};
        $scope.newProposal['title'] = null;
        $scope.newProposal['description'] = null;
        $scope.newProposal['created'] = new Date();
        $scope.newProposal['questionList'] = [];

        $scope.questionAdder = function(){
            $scope.newProposal.questionList[$scope.newProposal.questionList.length] = { 'title': '', 'qtemplate': '', 'options':[]};
            console.log($scope.newProposal);
        };
        $scope.optionAdder = function(question){
            question.options.push({ 'optionChoice':'', 'optionValue':'' });
//            question.options = { 'optionChoice':'', 'optionValue':'' };
            console.log($scope.newProposal);
        };

        $scope.proposal = {};
        $scope.addProposal = function() {
            $scope.newProposal.title = $scope.proposal.title;
            $scope.newProposal.description = $scope.proposal.description;
            $scope.newProposal.created = new Date();
            console.log("newProposal: " + $scope.newProposal);
            var proposal = $scope.newProposal;
            Restangular.all('api/proposals').customPOST(proposal)
                .then(function(data) {
                    SessionService.saveCurrentProposal(data.proposal);
                    console.log("data.proposal " + data.proposal);
                    $window.location = '/proposalList';
                }), function(response) {
                    $scope.errorMessage = response;
                };
        };

//        $scope.hasError = function (field, validation) {
//            if (validation) {
//                return $scope.proposalForm[field].$dirty && $scope.proposalForm[field].$error[validation];
//            }
//
//            return $scope.proposalForm[field].$dirty && $scope.proposalForm[field].$invalid;
//        };

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

