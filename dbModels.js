var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*create 2 schemas*/
var BugSchema = new Schema(
{
	ts : { type: Date, default: Date.now },
	bugName: String,	
	author : String,
	description : String,
	status: String,
	link: String
}); 

var CommentSchema = new Schema(
{
	ts : { type: Date, default: Date.now },
	bugTitle: [{ type: Schema.Types.ObjectId, ref: 'Postdb' }],
	message: String

});

// var SimpleSchema = new Schema(
// {
// 	text: String
// });

/*Add extra method to BugSchema Models*/
BugSchema.methods.savetest = function () {
	this.save()
	console.log('Document Is Successfully Added')
}

/*Compiling models*/
var Bug = mongoose.model('Bug',BugSchema);
var Comment = mongoose.model('Comment',CommentSchema);
//var Simple = mongoose.model('Simple',SimpleSchema);


/*Exports model's instances*/
exports.Bug = Bug;
exports.Comment = Comment;
//exports.Simple = Simple;

