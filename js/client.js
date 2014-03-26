(function() {
	var	init = function() {
		attachEvents();
		getCategories();
	};

	var attachEvents = function() {
		var	sidebarEl = $('.nav-sidebar'),
			toggleEl = $('.forum-logo, .forum-title'),
			closeEl = sidebarEl.find('.sidebar-close'),
			backEl = sidebarEl.find('h2');

		toggleEl.on('click', function() {
			toggleSidebar();
		});

		sidebarEl.on('click', 'li[data-cid]', function() {
			enterCategory(this.getAttribute('data-cid'));
		});

		closeEl.on('click', function() {
			toggleSidebar(false);
		});

		backEl.on('click', goBack);
	};

	var	toggleSidebar = function(state) {
		var	sidebarEl = $('.nav-sidebar'),
			contentEl = $('#content'),
			headerEl = $('#header-menu');

		sidebarEl.toggleClass('active', state);
		contentEl.toggleClass('active', state);
		headerEl.toggleClass('active', state);
	};

	var	getCategories = function() {
		var	categoryContainer = $('.nav-sidebar .categories'),
			titleEl = $('.nav-sidebar h2');

		titleEl.text('categories');

		$.get(RELATIVE_PATH + '/api/home').success(function(returnData) {
			templates.preload_template('home', function() {
				var html = templates.prepare(templates['home'].toString()).parse(returnData);
				categoryContainer.append(html);
			});
		});
	};

	var enterCategory = function(cid) {
		var	categoryContainer = $('.nav-sidebar .categories'),
			topicContainer = $('.nav-sidebar .topics'),
			titleEl = $('.nav-sidebar h2');

		titleEl.text('topics');

		$.get(RELATIVE_PATH + '/api/category/' + cid).success(function(returnData) {
			console.log(returnData);
			templates.preload_template('category', function() {
				var html = templates.prepare(templates['category'].toString()).parse(returnData);
				topicContainer.empty().append(html);
				categoryContainer.removeClass('active');
				topicContainer.addClass('active');
			});
		});
	};

	var	goBack = function() {
		var	categoryContainer = $('.nav-sidebar .categories'),
			topicContainer = $('.nav-sidebar .topics'),
			titleEl = $('.nav-sidebar h2');

		if (topicContainer.hasClass('active')) {
			titleEl.text('categories');
			topicContainer.removeClass('active');
			categoryContainer.addClass('active');
		} else if (categoryContainer.hasClass('active')) {
			toggleSidebar();
		}
	};

	$(document).ready(init);
})();