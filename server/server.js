var express = require('express');  // Pulls in the express framework

/*
    Mongoose is a standard library used with Node to interact with MongoDB
 */
var mongoose = require('mongoose'); // Pulls in the mongoose library
mongoose.connect(process.env.MONGOLAB_URI); // pulls in the Mongo database I selected in the PyCharm Settings

/*
** Passport config
 */
var passport = require('passport'); /* 'Require' is pulling in an external library. Passport helps to verify social accounts */
require('./services/passport.js')(passport, require('./models/account'));  //

var auth = require('./services/auth'); // declares the auth service

/*
    App Configuration Section
 */
var app = module.exports = express(); // Creates our app with Express support
app.configure(function() {            // this is where we say: Here are all of our configurations
    /*
    ** Session setup and passport initialization
     */
    app.use(express.cookieParser());    //uses Express' CookieParser functionality
    app.use(express.session( { secret: 'securedsession' }));  //uses Express' Session functionality.  Secret uses a SALT?
    app.use(passport.initialize());   // initialize authenticates the user
    app.use(passport.session());      // session will store an authenticated user into the session

    /*
        bodyParser() - http://expressjs.com/api.html
        This is middleware that supports parsing JSON, urlencoded and multipart requests
        ** It is recommended to disable file upload functionality if it is not needed
     */
//    app.use(express.bodyParser()); // Automatically includes JSON, urlencoded and multipart requests
    app.use(express.json()); // This handles JSON parsing
    app.use(express.urlencoded()); // This handles urlencoded parsing

    /*
        methodOverride() - http://www.senchalabs.org/connect/methodOverride.html
        This is Connect middleware (Connect is a Framework) which allows you to simulate a DELETE or PUT (REST services)
        An example of this is in controllers.js within EditPostController and within this file (app.put)
        Stackoverflow - http://stackoverflow.com/questions/8378338/what-does-connect-js-methodoverride-do
        Below
     */
    app.use(express.methodOverride());

    /*
        This handles static files (e.g. css, js, img, etc.).
     */
    app.use(express.static(__dirname + '/../public')); // __dirname returns the current working directory. This is a built in node thing

    /*
        This explicitly handles route requests from the browser.  For example, http://localhost:3000/about will
        try and locate a route ( app.get('/about...) ) that matches.
     */
    app.use(app.router);  // app.router is an Express command
    app.set('port', process.env.PORT || 3000); // Sets the port based on the environment or to 3000
    app.set('views', __dirname + '/../public'); // Jade views will be found under public (also under partials)
    app.set('view engine', 'jade'); // Jade will be our view engine

    app.use(express.logger('dev')); // log every request to the console, only if we are in Dev Mode

    /*
        errorHandler() - http://www.senchalabs.org/connect/errorHandler.html
        Provides stack traces and error message responses for requests
     */
    console.log('ENV: ' + app.get('env'));
    if (app.get('env') === 'development') { // Only do error handling in development
        app.use(express.errorHandler());
        // We can put more 'development' specific things here as well...
    }
})  // End of Configure Block

/*
** Routes: Put the most specific routes on top and the least specific on bottom.
 */
require('./routes/account')(app, passport, require('./controllers/account'));
require('./routes/contact')(app, auth, require('./controllers/contact'));
require('./routes/index')(app, require('./controllers/index'));

// Let's create the server and listen on the port defined in the configuration above
var http = require('http');
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});