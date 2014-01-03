/*
** GET requests
 */

module.exports.index = function (req, res) {
    res.render('layout');
};

module.exports.partials = function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
};