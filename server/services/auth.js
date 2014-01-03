module.exports = function (req, res, next) {
    if (!req.isAuthenticated()) {
        console.log('You are not authenticated!');
        res.send(401);
    } else {
        console.log('You are authenticated!')
        next();
    }
};