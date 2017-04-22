var main = function(){
	var state = {};

	var loadPost = function(post){
		interface.activatePostTitleInList(post);
		interface.updatePostTitleInHeader(post);
		loader.loadPost(post,function(err,rawpost){
			if(err){
				var errormessage = "# Could not load post.\n Sorry. This file is not located on the server.";
				interface.renderPost(post,errormessage);
				return console.log("Error thrown by loader.getPost.");
			}
			interface.renderPost(post,rawpost);
		})
	};

	var loadPostFromHash = function(hash){
		state.posts.forEach(function(post){
			if(post.path === hash.split("#")[1]){
				return loadPost(post);
			}
		});
	}

	var refreshEventListners = function(){
		events.setPostTitleClickEventHandler(function(elem){
			state.posts.forEach(function(post){
				if(post.path === elem.target.id){
					location.hash = "#" + post.path;
					return;
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
		//interface.init();
		state.posts.forEach(function(post){
				interface.addPostTitleInList(post);
			});
		// loadPost(state.posts[0]);
		location.hash = "#" + state.posts[0].path;
		refreshEventListners();
	}

	var begin = function(blogpath){
		loader.init(blogpath);
		loader.loadConfigJson(function(err,config){
			interface.init(config);
			loader.loadPostsJson(function(err,posts){
				if(err){
					return console.log("Error thrown by loader.getPostsJson.");
				}
				state.posts = posts;
				doInitialLoad();
				implementSearch();
				loadPostFromHash(location.hash);
			});
		});
		events.setWindowHashChangeEventHandler(function(hash){
			console.log(hash);
			loadPostFromHash(hash);
		});
	};
	return begin;
}();

// here goes nothing...
main("../demo");