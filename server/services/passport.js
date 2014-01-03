var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport, Account) {
    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, Account.authenticate()));

    passport.serializeUser(Account.serializeUser());
    passport.deserializeUser(Account.deserializeUser());
}