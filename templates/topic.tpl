<input type="hidden" template-variable="expose_tools" value="{expose_tools}" />
<input type="hidden" template-variable="topic_id" value="{tid}" />
<input type="hidden" template-variable="category_id" value="{cid}" />
<input type="hidden" template-variable="currentPage" value="{currentPage}" />
<input type="hidden" template-variable="pageCount" value="{pageCount}" />
<input type="hidden" template-variable="locked" value="{locked}" />
<input type="hidden" template-variable="deleted" value="{deleted}" />
<input type="hidden" template-variable="pinned" value="{pinned}" />
<input type="hidden" template-variable="topic_name" value="{title}" />
<input type="hidden" template-variable="postcount" value="{postcount}" />
<input type="hidden" template-variable="viewcount" value="{viewcount}" />

<div class="viridian-topic">
	<!-- IF thumb -->
	<img class="header" src="{thumb}" />
	<!-- ENDIF thumb -->
	<ul id="post-container">
		<!-- BEGIN posts -->
		<li data-pid="{posts.pid}">
			<div class="row post-row">
				<div class="col-sm-2 meta">
					<img src="{posts.user.picture}" title="{posts.user.username}" class="img-circle" />
					<div>
						<p class="username">{posts.user.username}</p>
						<p class="timestamp"><span class="timeago" title="{posts.relativeTime}"></span></p>
						<p class="category">{category.name}</p>
					</div>
				</div>
				<div class="col-sm-10">
					<!-- IF @first -->
					<h1>{title}</h1>
					<!-- ENDIF @first -->
					{posts.content}
				</div>
			</div>
		</li>
		<!-- IF !posts.index -->
		<li class="well well-sm post-bar" data-index="{posts.index}">
			<div class="inline-block">
				<small class="topic-stats">
					<span>[[category:posts]]</span>
					<strong><span id="topic-post-count" class="human-readable-number" title="{postcount}">{postcount}</span></strong> |
					<span>[[category:views]]</span>
					<strong><span class="human-readable-number" title="{viewcount}">{viewcount}</span></strong> |
					<span>[[category:browsing]]</span>
				</small>
				<div class="thread_active_users active-users inline-block"></div>
			</div>
			<div class="topic-main-buttons pull-right inline-block">
				<!-- IF privileges.write -->
				<button class="btn btn-primary post_reply" type="button">[[topic:reply]]</button>
				<!-- ENDIF privileges.write -->
				<div class="btn-group thread-tools hide">
					<button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button">[[topic:thread_tools.title]] <span class="caret"></span></button>
					<ul class="dropdown-menu pull-right">
						<li><a href="#" class="markAsUnreadForAll"><i class="fa fa-fw fa-inbox"></i> [[topic:thread_tools.markAsUnreadForAll]]</a></li>
						<li><a href="#" class="pin_thread"><i class="fa fa-fw fa-thumb-tack"></i> [[topic:thread_tools.pin]]</a></li>
						<li><a href="#" class="lock_thread"><i class="fa fa-fw fa-lock"></i> [[topic:thread_tools.lock]]</a></li>
						<li class="divider"></li>
						<li><a href="#" class="move_thread"><i class="fa fa-fw fa-arrows"></i> [[topic:thread_tools.move]]</a></li>
						<li><a href="#" class="fork_thread"><i class="fa fa-fw fa-code-fork"></i> [[topic:thread_tools.fork]]</a></li>
						<li class="divider"></li>
						<li><a href="#" class="delete_thread"><span class="text-error"><i class="fa fa-fw fa-trash-o"></i> [[topic:thread_tools.delete]]</span></a></li>
						<!-- BEGIN thread_tools -->
						<li>
							<a href="#" class="{thread_tools.class}"><i class="fa fa-fw {thread_tools.icon}"></i> {thread_tools.title}</a>
						</li>
						<!-- END thread_tools -->
					</ul>
				</div>
			</div>
			<div style="clear:both;"></div>
		</li>
		<!-- ENDIF !posts.index -->
		<!-- END posts -->
	</ul>
</div>