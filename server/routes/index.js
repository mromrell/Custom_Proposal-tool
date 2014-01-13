// This is the Catch-all route handler
module.exports = function(app, routes) {
    app.get('/', routes.index);
    app.get('/partials/:name', routes.partials);
    app.get('*', routes.index); // redirect any routes not found to the index (HTML5 history)
};