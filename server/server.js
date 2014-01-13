var express = require('express');  // Pulls in the express framework

/*
    Mongoose is a standard library used with Node to interact with MongoDB
 */
var mongoose = require('mongoose'); // Pulls in the mongoose library
mongoose.connect(process.env.MONGOLAB_URI);

/*
** Passport config
 */
var passport = require('passport');
require('./services/passport.js')(passport, require('./models/account'));

var auth = require('./services/auth');

/*
    App Configuration Section
 */
var app = module.exports = express(); // Creates our app with express support
//the app.configure function essentially is configuring pasport insde of  function for future reference
app.configure(function() {
    /*
    ** Session setup and passport initialization
     */
    app.use(express.cookieParser());
    app.use(express.session( { secret: 'securedsession' })); //todo: find out about the securedsession
    app.use(passport.initialize());
    app.use(passport.session());

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
        This is connect middleware which allows you to simulate a DELETE or PUT (REST services)
        An example of this is in controllers.js within EditPostController and within this file (app.put)
        Stackoverflow - http://stackoverflow.com/questions/8378338/what-does-connect-js-methodoverride-do
     */
    app.use(express.methodOverride());

    /*
        This handles static files (e.g. css, js, img, etc.).
     */
    app.use(express.static(__dirname + '/../public'));
    //dirname is returned from Node. It is built in.
    // the reference starts at the directory behind where we are.

    /*
        This explicitly handles route requests from the browser.  For example, http://localhost:3000/about will
        try and locate a route ( app.get('/about...) ) that matches.
     */
    app.use(app.router);

    app.set('port', process.env.PORT || 3000); // Sets the port based on the environment or to 3000
    app.set('views', __dirname + '/../public'); // Jade views will be found under public (also under partials)
    app.set('view engine', 'jade'); // Jade will be our view engine

    app.use(express.logger('dev')); // log every request to the console

    /*
        errorHandler() - http://www.senchalabs.org/connect/errorHandler.html
        Provides stack traces and error message responses for requests
     */
    console.log('ENV: ' + app.get('env'));
    if (app.get('env') === 'development') { // Only do error handling in development
        app.use(express.errorHandler());
        // We can put more 'development' specific things here as well...
    }
}) //specifies what is to be done in terms of error hand in development mode vs otherwise

/*
** Routes
 */
require('./routes/account')(app, passport, require('./controllers/account'));
require('./routes/contact')(app, auth, require('./controllers/contact'));
require('./routes/index')(app, require('./controllers/index'));

// Let's create the server and list on the port defined in the configuration above
var http = require('http');
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});