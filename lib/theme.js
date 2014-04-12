(function(module) {
	"use strict";

	var Theme = {};

	Theme.defineWidgetAreas = function(areas, callback) {
		areas = areas.concat([
			{
				'name': 'Homepage Content',
				'template': 'home.tpl',
				'location': 'content'
			},
			{
				name: 'MOTD',
				template: 'home.tpl',
				location: 'motd'
			}
		]);

		callback(null, areas);
	};

	module.exports = Theme;

}(module));