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

	var setWindowHashChangeEventHandler = function(callback){
		var sugarcallback = function(){
			return callback(location.hash);
		};
		window.addEventListener("hashchange", sugarcallback, false);
	}
	return {
		init:init,
		setPostTitleClickEventHandler: setPostTitleClickEventHandler,
		setSearchBoxKeyEventHandler: setSearchBoxKeyEventHandler,
		setWindowHashChangeEventHandler: setWindowHashChangeEventHandler,
	};
}();