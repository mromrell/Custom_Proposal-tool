/*
 ** Load the appropriate models
 */
var Account = require('../models/account.js');
var passport = require('passport');

/*
 ** GET requests
 */
module.exports.loggedin = function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
};

module.exports.register = function (req, res) {
    res.render('register');
};

/*
 ** POST requests
 */
module.exports.login = function (req, res) {
    res.send(req.user);
};

module.exports.logout = function (req, res) {
    req.logout();
    res.send(200);
};

module.exports.register_p = function (req, res) {
    Account.register(
        new Account({
            username: req.body.username,
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            created: req.body.created
        }),
        req.body.password,
        function (err, account) {
            if (err) {
                return res.render('partials/register', { info: 'Sorry, an error occurred: ' + err + ' with account: ' + account });
            }

            passport.authenticate('local')(req, res, function () {
    //            res.redirect('/');
                res.send(req.user);
            });
        }
    );
};