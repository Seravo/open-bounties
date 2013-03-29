var mongoose = require('mongoose');
<<<<<<< HEAD
var Schema = mongoose.Schema
  , authTypes = ['facebook']
=======
var Schema = mongoose.Schema;
>>>>>>> ff2fb420b64ca72d8e2add84d207329a6a7d9db9



/*create 2 schemas*/
var BugSchema = new Schema(
{
	ts : { type: Date, default: Date.now },
	bugName: String,	
<<<<<<< HEAD
	author : { type: String, default: 'EgorDefault' },
=======
	author : { type : Schema.ObjectId, ref : 'User' },
>>>>>>> ff2fb420b64ca72d8e2add84d207329a6a7d9db9
	description : String,
	comments: [{
    body: { type : String, default : '' },
    user: { type : Schema.ObjectId, ref : 'User' },
    username: {type: String},
    createdAt: { type : Date, default : Date.now }
  }],
<<<<<<< HEAD
  additions: [{
    sum: { type : String, default : '' },
    user: { type : Schema.ObjectId, ref : 'User' },
    username: {type: String},
    createdAt: { type : Date, default : Date.now }
  }],
	status: {type : String, default : 'Open'},
	link: String,
   totalSum: {type : Number, default : 5}
=======
	status: {type : String},
	link: String,
>>>>>>> ff2fb420b64ca72d8e2add84d207329a6a7d9db9
}); 


var UserSchema = new Schema(
{
	name : String,
	email : String,
	username : String,
<<<<<<< HEAD
	provider : String,
	hashed_password : String,
	// salt : String,
	facebook : {},
	google : {},
        twitter : {}
	// github : {},
	
=======
	//provider : String,
	hashed_password : String,
	// salt : String,
	// facebook : {},
	// twitter : {},
	// github : {},
	// google : {}
>>>>>>> ff2fb420b64ca72d8e2add84d207329a6a7d9db9
});

// var SimpleSchema = new Schema(
// {
// 	text: String
// });

/*Add extra method to BugSchema Models*/
BugSchema.methods.saveone = function () {
	this.save()
	console.log('Document Is Successfully Added')
}

/*Compiling models*/
var Bug = mongoose.model('Bug',BugSchema);
var User = mongoose.model('User',UserSchema);
//var Simple = mongoose.model('Simple',SimpleSchema);


/*Exports model's instances*/
exports.Bug = Bug;
exports.User = User;
//exports.Simple = Simple;

