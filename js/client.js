(function() {
	var	init = function() {
		attachEvents();
		getCategories();
	};

	var attachEvents = function() {
		var	sidebarEl = $('.nav-sidebar'),
			toggleEl = $('.forum-logo, .forum-title'),
			closeEl = sidebarEl.find('.sidebar-close');

		toggleEl.on('click', function() {
			toggleSidebar();
		});

		sidebarEl.on('click', 'li[data-cid]', function() {
			var	cid = this.getAttribute('data-cid');

			ajaxify.go('category/' + cid);
			toggleSidebar();
		});

		closeEl.on('click', function() {
			toggleSidebar(false);
		});
	};

	var	toggleSidebar = function(state) {
		var	sidebarEl = $('.nav-sidebar'),
			contentEl = $('#content'),
			headerEl = $('#header-menu');

		sidebarEl.toggleClass('active', state);
		contentEl.toggleClass('active', state);
		headerEl.toggleClass('active', state);	
	}

	var	getCategories = function() {
		var	categoryContainer = $('.nav-sidebar > ul'),
			titleEl = $('.nav-sidebar h2');

		titleEl.text('CATEGORIES');

		$.get(RELATIVE_PATH + '/api/home').success(function(returnData, status) {
			if (status === 'success' && returnData.categories.length) {
				var	categoryObj;

				for(var x=0,numCats=returnData.categories.length;x<numCats;x++) {
					categoryObj = returnData.categories[x];
					categoryContainer.append($('<li data-cid="' + categoryObj.cid + '"><div class="count">' + categoryObj.topic_count + '</div><i class="fa fa-3x fa-fw ' + categoryObj.icon + '"></i><span class="sidebar-label">' + categoryObj.name + '</span><div class="clearfix"></div></li>'));
				}
			}
		});
	};

	$(document).ready(function() {
		init();
	});
})();