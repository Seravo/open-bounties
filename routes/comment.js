// var models = require('../dbModels');

exports.add = function(req, res){
	var bug = req.bug;
	var user = req.user;
	
	bug.comments.push({  
    	body: req.body.body,
    	user: user._id,
    	username: user.username
    }) 

	bug.save();
	res.redirect('/bug/' + req.bug._id)
}
