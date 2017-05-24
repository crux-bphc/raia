var main = function(){
	var state = {};

	var loadPost = function(post){
		if(!post){
			interface.renderPost(false,templates.error_wrong_path);
			hideOverlay();//calls global function. TODO find alternative
			return;
		}
		interface.activatePostTitleInList(post);
		interface.updatePostTitleInHeader(post);
		loader.loadPost(post,function(err,rawpost){
			if(err){
				interface.renderPost(post,templates.error_not_on_server);
				return console.log("Error thrown by loader.getPost.");
			}
			interface.renderPost(post,rawpost);
			hideOverlay();//calls global function. TODO find alternative
		})
	};

	var getRelativePost = function(curpost,difference){
		var curindex = false;
		var curnarrow = interface.getCurrentListNarrow();
		if(curnarrow.indexOf(curpost.path) == -1){
			return false;
		} // currenty open post is not in current search narrow. do nothing.
		curnarrow.forEach(function(post,index){
			if(post === curpost.path){
				curindex = index;
				return;
			}
		});
		var targetindex = curindex + difference;
		var targetpost = false;
		if( targetindex >=0 && targetindex < curnarrow.length){
			state.posts.forEach(function(post){
				if(post.path == curnarrow[targetindex]){
					return targetpost = post;
				}
			});
		}
		console.log(targetpost);
		return targetpost;
	}

	var loadPostFromHash = function(hash){
		state.posts.forEach(function(post){
			if(post.path === hash.split("#")[1]){
				return loadPost(post);
			}
		});
		return loadPost(false);
	}

	var implementSearch = function(){
		events.setSearchBoxKeyEventHandler(function(text){
			interface.removePostTitlesInList();
			state.posts.forEach(function(post){
				if(post.title.toLowerCase().indexOf(text.toLowerCase()) != -1){
					interface.addPostTitleInList(post);
				}
			});
			interface.activatePostTitleInList();
		});
	}

	var implementShortcuts = function(){
		Mousetrap.bind("ctrl+right",function loadNextPost(){
			var targetpost = getRelativePost(interface.getCurrentPost(),1);
			if(targetpost){
				location.hash = "#" + targetpost.path;
			}
		});
		Mousetrap.bind("ctrl+left",function loadPreviousPost(){
			var targetpost = getRelativePost(interface.getCurrentPost(),-1);
			if(targetpost){
				location.hash = "#" + targetpost.path;
			}
		});
	}

	var doInitialLoad = function(){
		state.posts.forEach(function(post){
				interface.addPostTitleInList(post);
			});
		if(!location.hash){
			location.hash = "#" + state.posts[state.posts.length - 1].path;
		}
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
				implementShortcuts();
				loadPostFromHash(location.hash);
			});
		});
		events.setWindowHashChangeEventHandler(function(hash){
			loadPostFromHash(hash);
		});
	};
	return begin;
}();

// here goes nothing...
main("../demo");