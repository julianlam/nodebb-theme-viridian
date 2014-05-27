"use strict";

var Theme = {};

Theme.init = function(app, middleware, controllers) {
	// Overwrite the existing `/` route handler to load the recent topics page
	app.get('/', middleware.buildHeader,  function(req, res, next) {
		req.params.term = 'month';
		controllers.categories.recent.apply(controllers.categories.recent, arguments);
	});
	app.get('/api/home', function(req, res, next) {
		req.params.term = 'month';
		controllers.categories.recent.apply(controllers.categories.recent, arguments);
	});
	app.get('/api/categories', controllers.home);
};

module.exports = Theme;
