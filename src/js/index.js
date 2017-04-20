var main = function(){
	var state = {};

	var loadPost = function(post){
		interface.activatePostTitleInList(post);
		interface.updatePostTitleInHeader(post);
		loader.loadPost(post,function(err,rawpost){
			if(err){
				return console.log("Error thrown by loader.getPost.");
			}
			interface.renderPost(post,rawpost);
		})
	};

	var refreshEventListners = function(){
		events.setPostTitleClickEventHandler(function(elem){
			state.posts.forEach(function(post){
				if(post.path === elem.target.id){
					return loadPost(post);
				}
			});
		});
	};

	var implementSearch = function(){
		events.setSearchBoxKeyEventHandler(function(text){
			interface.removePostTitlesInList();
			state.posts.forEach(function(post){
				if(post.title.toLowerCase().indexOf(text.toLowerCase()) != -1){
					interface.addPostTitleInList(post);
				}
			});
			interface.activatePostTitleInList();
			refreshEventListners();
		});
	}

	var doInitialLoad = function(){
		interface.init();
		state.posts.forEach(function(post){
				interface.addPostTitleInList(post);
			});
		loadPost(state.posts[0]);
		refreshEventListners();
	}

	var begin = function(blogpath){
		loader.init(blogpath);
		loader.loadPostsJson(function(err,posts){
			if(err){
				return console.log("Error thrown by loader.getPostsJson.");
			}
			state.posts = posts;
			doInitialLoad();
			implementSearch();
		});
	};
	return begin;
}();

// here goes nothing...
main("/demo");