var interface = function(){
	var state = {};
	
	var init = function(config){
		state.currentpost=false;
		state.config = config;
		var languageOverrides = {
		    js: 'javascript',
		    html: 'xml'
		};
		state.markdownparser = markdownit({
	        html: true,
	        highlight: function(code, lang) {
	            if (languageOverrides[lang]) lang = languageOverrides[lang];
	            if (lang && hljs.getLanguage(lang)) {
	                try {
	                    return hljs.highlight(lang, code).value;
	                } catch (e) {}
	            }
	            return '';
	        }
	    })
	    .use(markdownitFootnote);
	    document.getElementById("search-box").value="";
	    //initial config based UI loading.
	    document.getElementById("profile-image").src=config.profileimage;
	    document.getElementById("favicon").setAttribute("href", config.profileimage);
	    document.getElementById("blog-title").innerHTML=config.blogtitle;
	    document.title=config.blognick;
	}

	var addPostTitleInList = function(post){
		var li = document.createElement("li");
		var list = document.getElementById("post-title-list");
		var a = document.createElement("a");
		a.innerHTML = post.title;
		a.setAttribute("href","#"+post.path);
		li.appendChild(a);
		li.setAttribute("id","post-list-"+post.path);
		list.appendChild(li);
	}

	var removePostTitlesInList = function(){
		var list = document.getElementById("post-title-list");
		list.innerHTML = null;
	}

	var activatePostTitleInList = function(post){
		if(!post){
			post = state.currentpost;
			if(!post){
				return;
			}
		}
		if(state.currentpost){
			var oldli = document.getElementById("post-list-"+state.currentpost.path);
			if(oldli){
				oldli.classList.remove("active-title");
			}
		}
		var newli = document.getElementById("post-list-"+post.path);
		if(newli){
			newli.classList.add("active-title");
			state.currentpost=post;
			newli.scrollIntoView();
		}
	}

	var getCurrentListNarrow = function(){
		var list = document.getElementById("post-title-list");
		var list_narrow = [];
		for(var i=0;i<list.children.length;i++){
			list_narrow.push(list.children[i].getAttribute("id").replace('post-list-',''));
		}
		return list_narrow;
	}

	var updatePostTitleInHeader = function(post){
		var date = {};
		date.year = post.date.split("-")[2];
		date.month = post.date.split("-")[1];
		date.day = post.date.split("-")[0];
		var title = " > " + post.title;
		var titleholder = document.getElementById("post-title");
		titleholder.innerHTML = title;
		document.title = state.config.blognick + " > " + post.title;
	}

	var renderPost = function(post,rawpost){
		var articlebody = document.getElementById("article-body");
		articlebody.innerHTML = state.markdownparser.render(rawpost);
		var articlecontainer = document.getElementById("article-container");
		articlecontainer.scrollTop=0;
	};

	var getCurrentPost = function(){
		return state.currentpost;
	}

	return {
		init: init,
		addPostTitleInList: addPostTitleInList,
		removePostTitlesInList: removePostTitlesInList,
		activatePostTitleInList: activatePostTitleInList,
		updatePostTitleInHeader: updatePostTitleInHeader,
		renderPost:renderPost,
		getCurrentPost: getCurrentPost,
		getCurrentListNarrow: getCurrentListNarrow,
	};
}();