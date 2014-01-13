module.exports = function (req, res, next) { // Express framework already created the req, res and next framework for us
    if (!req.isAuthenticated()) {            //passport has built in isAuthenticated
        console.log('You are not authenticated!');
        res.send(401);   // send to a not authorized error page (401)
    } else {
        console.log('You are authenticated!')
        next();          // if authenticated, then pass them through to wherever they were trying to go
    }
};

// the req res and next are passport-declared functions
