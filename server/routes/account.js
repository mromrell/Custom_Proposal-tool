module.exports = function (app, passport, account) {
    app.get('/account/loggedin', account.loggedin); //will only accept get request from the front end. specified by app.get
    app.post('/account/login', passport.authenticate('local'), account.login); // see previous comment. Will only
    app.post('/account/logout', account.logout);
    app.get('/account/register', account.register);
    app.post('/account/register', account.register_p);
};
//get requests are seen in the address bar with parameters and a  250 characters
//forms are typically a post
//post provides data and asks for some type of mainpulation

//put to uppdate
//post to create
//get to request information

//see line 78 in server.js

// todo: authentication with social meda accounts on the routes/accounts.js page