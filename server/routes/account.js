module.exports = function (app, passport, account) {
    app.get('/account/loggedin', account.loggedin);  // app.get will only accept a get request from the frontend
    app.post('/account/login', passport.authenticate('local'), account.login);  // when we see the account/login URL then use the passport.authenticate &  eaccount.log for thisin parameters
    app.post('/account/logout', account.logout);     // app.post will only accept a post request from the frontend
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
