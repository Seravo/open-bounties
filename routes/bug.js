var models = require('../dbModels');
var mongoose = require('mongoose');


exports.index = function(req, res){
  res.render('bugpage', {req:req})
}

exports.find = function(req, res, next , id){
 models.Bug.findOne({_id: id}, function (err, bug){
    console.log(req.isAuthenticated() + "----> user ") 
    if (err) return next(err)
    if (!bug) return next(new Error('Failed to load user ' + id))
    req.bug = bug;
    next() 
 
  })
}



exports.list = function( req, res ){ 
  models.Bug.find({}, function( err, bugs ){   
      req.bugs = bugs;
      res.render('bugs', {req: req});
    }); 
}

//render addBug page
exports.add = function( req, res ){ 
  res.render('addBug', {req: req}); 
}

//save to bug to db
exports.create = function( req, res ){ 
  models.Bug(req.body).save();
  res.redirect('/bugs');
}

exports.remove = function(req, res){
	var id = req.body.myId;
	var bug = models.Bug.findOne({ _id: id});
	bug.remove(function(err){
    	res.redirect('/bugs');
    });
}

