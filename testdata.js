var models = require('./dbModels');

/*5 Bug Documents*/
models.Bug({bugName: 'Firefox', author : 'Pushkin', description : 'Very slow', 
	status: 'OnGoing', link: 'firefox.com'}).savetest()
models.Bug({bugName: 'Chrome', author : 'Tolstoy', description : 'Very fast', 
	status: 'Solved', link: 'chrome.com'}).savetest()
models.Bug({bugName: 'Opera', author : 'Chehov', description : 'Too heavy', 
	status: 'OnGoing', link: 'opera.com'}).savetest()
models.Bug({bugName: 'IE', author : 'Esenin', description : 'Nuff said', 
	status: 'Planned', link: 'IE.com'}).savetest()
models.Bug({bugName: 'Safari', author : 'Akhmatova', description : 'Smug', 
	status: 'Solved', link: 'safari.com'}).savetest()
