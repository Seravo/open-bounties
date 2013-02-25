var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dburl = 'mongodb://localhost/bountydb'; 

exports.connect = function (callback)
{
	    mongoose.connect(dburl);
	};
	
exports.disconnect = function (callback)
	{
    mongoose.disconnect(callback);
};	

// create a schema

var PostdbSchema = new Schema(
{
	ts : { type: Date, default: Date.now },
	bugName: String,	
	author : String,
	description : String,
	status: String,
	link: String,


	
}); 

var CommentSchema = new Schema(
{
	ts : { type: Date, default: Date.now },
	bugTitle: [{ type: Schema.Types.ObjectId, ref: 'Postdb' }],
	message: String,
	
	});

// register the schema(s)


mongoose.model('Postdb',PostdbSchema);
mongoose.model('PostCommnet',CommentSchema);

//create instance of the model

var Bug = mongoose.model('Postdb');
exports.emptyBug = { "_id": "",  bugName: "", author: "",  description: "", status:"", link:""};
exports.emptyCommnet={ "_id": "",  bugName: "", author: "",  description: "", status:"", link:""};

// define and export the add function to add a new bug
exports.add = function(bugName, author, description, status, link, callback)
{
	var newBug = new Bug();
	newBug.bugName=bugName;
	newBug.author = author;
	newBug.description = description;
	newBug.status=status;
	newBug.link=link;

	
	// to save a new note just call save on it
	newBug.save(function(err)
	{
		if (err)
		{
			util.log('FATAL ' + err);
			callback(err);
		}
		else
		{
			callback(null);
		}
	});
};





// define and export the delete function
exports.delete = function(id,callback)
{
	// find the bug by id then delete it by calling remove
			
	exports.findBugById(id, function(err,doc)
	{
		
	
		if(err)
		{
			callback(err);
		}
		else
		{
			util.log(util.inspect(doc));
			doc.remove();
			callback(null);
		}

	});
	
		
};

// define and export the edit function
exports.edit = function(id, bugName,  author, description, status, link, callback)
{
	// fine the bug by id and edit it then save the changes.
	exports.findBugById(id, function(err, doc)                 //see mongoose model.js
	{
		if (err)
		{
			callback(err);
		}
				else
		{
			doc.bugName= bugName;
			doc.author = author;
			doc.description = description;
			doc.status=status;
			doc.link=link;
	
			
			doc.save(function(err)
			{
				if(err)
				{
					util.log('FATAL ' + err);
					callback(err);
				}
				else
				{	
					callback(null);
				}
			});
		}
	});
};

// define and export allBugs function
exports.allBugs = function(callback)
{
	// we will get all bugs from the db if there is no any conditional expression
	Bug.find({}, callback);
};

// define and export forAll function
exports.forAll = function(doEach, done)
{
	// will get all bugs from the db if we do not give any conditional expression
	// then invoke doEach function on every row
	
	Bug.find({}, function(err, docs)
	{
		if(err)
		{
			util.log('FATAL ' + err);
			done(err,null);
		}
		docs.forEach(function(doc)
		{
			doEach(null,doc);
		});
		done(null);
	});
};

// define findBugById and exports it.
var findBugById = exports.findBugById  = function(id, callback)
{
	Bug.findOne({_id: id} , function(err,doc)
	{
		if (err)
		{
			util.log('FATAL ' + err);
			callback(err,null);
		}
		callback(null,doc);
	});
};

	exports.setup = function(callback)
{	    

	
    callback(null);
	};
	
	
