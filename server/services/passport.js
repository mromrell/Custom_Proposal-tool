var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport, Account) {  // passport and Account are two other functions that this current function uses
    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, Account.authenticate()));

    passport.serializeUser(Account.serializeUser());    // these are required and allow you to marshall info back and forth
    passport.deserializeUser(Account.deserializeUser());
}