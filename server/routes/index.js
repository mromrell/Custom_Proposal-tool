// This is the Catch-all route handler
module.exports = function(app, routes) {
    app.get('/', routes.index);
    app.get('/partials/:name', routes.partials);
    app.get('*', routes.index); // redirect any routes not found to the index (HTML5 history)
};

//catch-all route handler. First line: if what is passed as a result of a get request is an X,  save in Y.
