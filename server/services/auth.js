module.exports = function (req, res, next) {
    if (!req.isAuthenticated()) {
        console.log('You are not authenticated!');
        res.send(401);
    } else {
        console.log('You are authenticated!')
        next();
    }
};

// the req res and next are passport-declared functions