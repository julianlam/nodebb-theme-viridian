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

<div class="veridian-topic">
	<ul>
		<!-- BEGIN posts -->
		<li data-pid="{posts.pid}">
			<div class="row">
				<div class="col-sm-2 meta">
				</div>
				<div class="col-sm-10">
					{posts.content}
				</div>
			</div>
		</li>
		<!-- END posts -->
	</ul>
</div>