var mongoose = require('mongoose');
var Schema = mongoose.Schema
  , authTypes = ['facebook']



/*create 2 schemas*/
var BugSchema = new Schema(
{
	ts : { type: Date, default: Date.now },
	bugName: String,	
	author : { type: String, default: 'EgorDefault' },
	description : String,
	comments: [{
    body: { type : String, default : '' },
    user: { type : Schema.ObjectId, ref : 'User' },
    username: {type: String},
    createdAt: { type : Date, default : Date.now }
  }],
  additions: [{
    sum: { type : String, default : '' },
    user: { type : Schema.ObjectId, ref : 'User' },
    username: {type: String},
    createdAt: { type : Date, default : Date.now }
  }],
	status: {type : String, default : 'Open'},
	link: String,
   totalSum: {type : Number, default : 5}
}); 


var UserSchema = new Schema(
{
	name : String,
	email : String,
	username : String,
	provider : String,
	hashed_password : String,
	// salt : String,
	facebook : {},
	google : {},
        twitter : {}
	// github : {},
	
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

