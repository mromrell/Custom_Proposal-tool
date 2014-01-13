module.exports = function (app, passport, account) {
    app.get('/account/loggedin', account.loggedin);  // app.get will only accept a get request from the frontend
    app.post('/account/login', passport.authenticate('local'), account.login);  // when we see the account/login URL then use the passport.authenticate & account.login parameters
    app.post('/account/logout', account.logout);     // app.post will only accept a post request from the frontend
    app.get('/account/register', account.register);
    app.post('/account/register', account.register_p);
};