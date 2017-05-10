var templates = function () {
	var error_not_on_server = [
		"# Could not load post.\n",
		"Sorry. This file is not located on the server.\n\n",
		"`Error: 404 Not Found`"
	].join('');
	var error_wrong_path = [
		""
	].join('');//blank error to mitigate multiple hash change bug.
	return {
		error_not_on_server: error_not_on_server,
		error_wrong_path: error_wrong_path,
	}
}();