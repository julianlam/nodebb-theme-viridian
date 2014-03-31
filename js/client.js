(function() {
	var	init = function() {
		attachEvents();
		getCategories();
	};

	var attachEvents = function() {
		var	contentEl = $('#content'),
			sidebarEl = $('.nav-sidebar'),
			categoryContainer = sidebarEl.find('.categories'),
			topicContainer = sidebarEl.find('.topics'),
			toggleEl = $('.forum-logo, .forum-title'),
			closeEl = sidebarEl.find('.sidebar-close'),
			backEl = sidebarEl.find('h2');

		toggleEl.on('click', function() {
			toggleSidebar();
		});

		categoryContainer.on('click', 'li[data-cid]', function() {
			enterCategory(this.getAttribute('data-cid'));
		});

		topicContainer.on('click', 'li[data-tid]', function() {
			var	tid = this.getAttribute('data-tid');

			ajaxify.go('topic/' + tid);
			topicContainer.find('li').removeClass('active');
			topicContainer.find('li[data-tid="' + tid + '"]').addClass('active');
			toggleSidebar();
		}).on('click', '.more', function() {
			var	cid = this.parentNode.getAttribute('data-cid'),
				numTids = topicContainer.find('[data-tid]').length;

			loadMoreTopics(cid, numTids);
		});

		closeEl.on('click', function() {
			toggleSidebar(false);
		});

		backEl.on('click', goBack);

		$(window).one('action:ajaxify.end', function(data) {
			// If we started in a topic, prepare the topic menu
			var	cid = ajaxify.variables.get('category_id');
			if (cid) {
				enterCategory(cid);
			}
		});

		$(window).on('resize', resizeSidebar);
		resizeSidebar();

		// Swipe!
		require(['hammer'], function(Hammer) {
			Hammer(contentEl[0], {
				drag_block_horizontal: true
			}).on('swipeleft swiperight', function(e) {
				e.gesture.preventDefault();
				toggleSidebar(e.type === 'swiperight' ? true : false);
			});

			Hammer(sidebarEl[0], {
				drag_block_horizontal: true
			}).on('swiperight', goBack);
		});
	};

	var	toggleSidebar = function(state) {
		var	sidebarEl = $('.nav-sidebar');

		sidebarEl.toggleClass('active', state);
	};

	var resizeSidebar = function() {
		var	sidebarEl = $('.nav-sidebar'),
			categoryContainer = sidebarEl.find('.categories'),
			topicContainer = sidebarEl.find('.topics');

		categoryContainer.css('height', $(window).height() - 54);
		topicContainer.css('height', $(window).height() - 54);
	};

	var	getCategories = function() {
		var	categoryContainer = $('.nav-sidebar .categories'),
			titleEl = $('.nav-sidebar h2');

		titleEl.text('categories');

		$.get(RELATIVE_PATH + '/api/home').success(function(returnData) {
			templates.parse('sidebar-home', returnData, function(html) {
				categoryContainer.append(html);
			});
		});
	};

	var enterCategory = function(cid) {
		var	categoryContainer = $('.nav-sidebar .categories'),
			categoryEl = categoryContainer.find('[data-cid="' + cid + '"]'),
			topicContainer = $('.nav-sidebar .topics'),
			titleEl = $('.nav-sidebar h2'),
			iconClass = categoryEl.attr('class');

		// Highlight the active category
		categoryContainer.find('li').removeClass('active');
		categoryEl.addClass('active');

		// Show topics list
		categoryContainer.removeClass('active');
		topicContainer.addClass('active');
		topicContainer.empty().html('<li class="loading"><i class="fa fa-spin fa-refresh"></i> Loading Topics</li>');

		$.get(RELATIVE_PATH + '/api/category/' + cid).success(function(returnData) {
			titleEl.html('<i class="' + iconClass + '"></i> ' + returnData.name).find('i').removeClass('fa-2x');
			if (returnData.topics.length) {
				templates.parse('sidebar-category', returnData, function(html) {
					topicContainer.empty().append(html).attr('data-cid', returnData.cid);
					topicContainer.find('.timeago').timeago();

					// If a topic_id is present, highlight it
					var	tid = ajaxify.variables.get('topic_id'),
						topicEl = topicContainer.find('[data-tid="' + tid + '"]');
					if (tid && topicEl) {
						topicEl.addClass('active');
					}
				});
			} else {
				translator.translate('<li class="empty">[[topic:no_topics_found]]</li>', function(translated) {
					topicContainer.empty().html(translated);
				});
			}
		});
	};

	var	loadMoreTopics = function(cid, after) {
		socket.emit('categories.loadMore', {
			cid: parseInt(cid, 10),
			after: parseInt(after, 10)
		}, function (err, data) {
			console.log(err, data);
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