# Raia

Raia is a Single Page Static Blog Engine compatible with GitHub pages and can be used to easily deploy your blogs or other linearly ordered content like magazines or books or tutorials.

## Developer Introduction

The main file is `/src/index.html` that loads the complete GUI. The styles are primarily described in `/src/css/blog.css`. The execution of JavaScript begins in `/src/js/index.js`.

The JavaScript code has been modularised so that each file handles one specific type of tasks.

### JavaScript Modules Breakdown

1. **Interface** - `/src/js/interface.js`  
 This file handles updating the user interface, and includes functions like: 
 - `addPostTitleInList()`
 - `removePostTitlesInList()`
 - `activatePostTitleInList()`
 - `updatePostTitleInHeader()`
 - `renderPost()`

2. **Loader** - `/src/js/loader.js`  
 This file handles dynamically loading posts and other content(?) using XMLHtmlRequest, and includes functions like:
 - `getPostsJson`
 - `loadPostsJson`
 - `loadPost`

3. **Events** - `/src/js/events.js`  
 This file handles incoming user interaction events and uses callbacks, providing minimal abstractions on top of the JS Events API.

4. **Main** - `/src/js/index.js`  
 This file pulls everything together. As an example of what the sample functions in this module look like, read this snippet:
 ```javascript
  var loadPost = function(post){
 		interface.activatePostTitleInList(post);
 		interface.updatePostTitleInHeader(post);
 		loader.loadPost(post,function(err,rawpost){
 			if(err){
 				return console.log("Error thrown by  loader.getPost.");
 			}
 			interface.renderPost(post,rawpost);
 		})
 	};
 ```

### Content Structure

 The content needs to be in markdown files. The `main()` module needs to be given the path to the directory containing `blog.json` file. Sample blog.json file would look like:

 ```json
 [
	{
		"title": "Sample Code For Testing",
		"path": "code",
		"date": "10-04-2017"
	},
	{
		"title": "My Profile",
		"path": "rohitt-vashishtha",
		"date": "10-04-2017"
	}
]
```

The code paths evaluate to `code.md` from `code`. The date format is `dd-mm-yyyy`.

## License

Copyright 2017 Rohitt Vashishtha

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.