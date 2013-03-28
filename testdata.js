var models = require('./dbModels');

/*5 Bug Documents*/
models.Bug({bugName: 'Firefox', author : 'Pushkin', description : 'Very slow', 
	status: 'OnGoing', link: 'firefox.com'}).saveone()
models.Bug({bugName: 'Chrome', author : 'Tolstoy', description : 'Very fast', 
	status: 'Solved', link: 'chrome.com'}).saveone()
models.Bug({bugName: 'Opera', author : 'Chehov', description : 'Too heavy', 
	status: 'OnGoing', link: 'opera.com'}).saveone()
models.Bug({bugName: 'IE', author : 'Esenin', description : 'Nuff said', 
	status: 'Planned', link: 'IE.com'}).saveone()
models.Bug({bugName: 'Safari', author : 'Akhmatova', description : 'Smug', 
	status: 'Solved', link: 'safari.com'}).saveone()

models.User({name:'Egor', email:'egor.danchenkov@mail.com', 
	username: 'EgorDanchenkov', hashed_password: 'password'});
models.User({name:'Olga', email:'olga.shakurova@mail.com', 
	username: 'OlgaShakurova', hashed_password: 'password1'});
models.User({name:'Svetlana', email:'svetlana.borisenkova@mail.com', 
	username: 'SvetlanaBorisenkova', hashed_password: 'password2'});