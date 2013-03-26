// var models = require('../dbModels');

exports.add = function(req, res){
	var bug = req.bug;
	var user = req.user;
	
	bug.additions.push({  
    	sum: req.body.sum,
    	user: user._id,
    	username: user.username
    }) 
    bug.totalSum=(bug.totalSum*1) + (req.body.sum*1)
	bug.save();
	res.redirect('/bug/' + req.bug._id)
}
