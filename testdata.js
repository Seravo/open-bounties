var models = require('./dbModels');

/*5 Bug Documents*/
models.Bug({bugName: 'Firefox', author : 'Pushkin', description : 'Very slow', 
	bountyStatus: 'OnGoing', link: 'firefox.com'}).saveone()
models.Bug({bugName: 'Chrome', author : 'Tolstoy', description : 'Very fast', 
	bountyStatus: 'Solved', link: 'chrome.com'}).saveone()
models.Bug({bugName: 'Opera', author : 'Chehov', description : 'Too heavy', 
	bountyStatus: 'OnGoing', link: 'opera.com'}).saveone()
models.Bug({bugName: 'IE', author : 'Esenin', description : 'Nuff said', 
	bountyStatus: 'Planned', link: 'IE.com'}).saveone()
models.Bug({bugName: 'Safari', author : 'Akhmatova', description : 'Smug', 
	bountyStatus: 'Solved', link: 'safari.com'}).saveone()

models.User({name:'Egor', email:'egor.danchenkov@mail.com', 
	username: 'EgorDanchenkov', hashed_password: 'password'});
models.User({name:'Olga', email:'olga.shakurova@mail.com', 
	username: 'OlgaShakurova', hashed_password: 'password1'});
models.User({name:'Svetlana', email:'svetlana.borisenkova@mail.com', 
	username: 'SvetlanaBorisenkova', hashed_password: 'password2'});