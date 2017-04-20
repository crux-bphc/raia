var loader = function(){
	var state = {
		blogpath: "",
		posts: false,
	};

	var init = function(blogpath){
		state.blogpath = blogpath;
	};

	var loadPostsJson = function(callback) {
		var setPostsJson = function () {
  			state.posts = JSON.parse(this.responseText);
  			if(state.posts == false){
  				return callback(true);
  			}
  			//state.posts.reverse();
  			return callback(false, state.posts);
		}
		var req = new XMLHttpRequest();
		req.addEventListener("load", setPostsJson);
		req.open("GET",state.blogpath + "/posts.json");
		req.send();
	};

	var getPostsJson = function(){
		return state.posts;
	}

	var loadPost = function(post, callback) {
		var setPostsJson = function () {
  			var rawpost = this.responseText;
  			if(rawpost == false){
  				return callback(true);
  			}
  			return callback(false, rawpost);
		}
		var req = new XMLHttpRequest();
		req.addEventListener("load", setPostsJson);
		req.open("GET",state.blogpath + "/" + post.path + ".md");
		req.send();
	};

	return {
		init,
		getPostsJson,
		loadPostsJson,
		loadPost,
	};
}();