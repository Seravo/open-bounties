var mongoose = require('mongoose')
var Schema = mongoose.Schema
  , authTypes = ['facebook']
var Schema = mongoose.Schema
var cheerio = require('cheerio');

/*create 2 schemas*/
var BugSchema = new Schema(
{
	ts : { type: Date, default: Date.now },
	bugName: String,	

	// author : { type: String, default: 'EgorDefault' },

	author : { type : Schema.ObjectId, ref : 'User' },
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
	bountyStatus:{type : String},
	bugStatus:{type : String},
	link: String,
    totalSum: {type : Number, default : 5},
	status: {type : String, default : 'Open'},
	claimer : { type : Schema.ObjectId, ref : 'User' },
	deadline : { type : Date, default: Date.now}

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
	// github : {},
});

// var SimpleSchema = new Schema(
// {
// 	text: String
// });

/*Add extra method to BugSchema Models*/
BugSchema.methods = {
	saveone: function () {
	this.save()
	console.log('Document Is Successfully Added')
}
}
/*Compiling models*/
var Bug = mongoose.model('Bug',BugSchema);
var User = mongoose.model('User',UserSchema);
//var Simple = mongoose.model('Simple',SimpleSchema);


/*Exports model's instances*/
exports.Bug = Bug;
exports.User = User;
//exports.Simple = Simple;

