var events = function(){
	var state = {
	};

	var init = function(){
	};

	var setPostTitleClickEventHandler = function(callback){
		var list = document.getElementById("post-title-list");
		var lis = Array.prototype.slice.call(list.children);
		lis.forEach(function(li){
			li.addEventListener("click",callback);
		})
	}

	var setSearchBoxKeyEventHandler = function(callback){
		var searchbox = document.getElementById("search-box");
		var sugarcallback = function(){
			callback(searchbox.value);
		};
		searchbox.addEventListener("input",sugarcallback);
	}
	return {
		init,
		setPostTitleClickEventHandler,
		setSearchBoxKeyEventHandler,
	};
}();