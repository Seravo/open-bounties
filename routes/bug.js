var models = require('../dbModels');
var mongoose = require('mongoose');
<<<<<<< HEAD

=======
var request = require('request')
var cheerio = require('cheerio')
>>>>>>> ff2fb420b64ca72d8e2add84d207329a6a7d9db9

exports.index = function(req, res){
  res.render('bugpage', {req:req})
}

exports.find = function(req, res, next , id){
<<<<<<< HEAD
 models.Bug.findOne({_id: id}, function (err, bug){
=======
 models.Bug.findOne({_id: id}).populate('author', 'username').exec(function (err, bug) {
>>>>>>> ff2fb420b64ca72d8e2add84d207329a6a7d9db9
    console.log(req.isAuthenticated() + "----> user ") 
    if (err) return next(err)
    if (!bug) return next(new Error('Failed to load user ' + id))
    req.bug = bug;
    next() 
 
  })
}

<<<<<<< HEAD


exports.list = function( req, res ){ 
  models.Bug.find({}, function( err, bugs ){   
      req.bugs = bugs;
      res.render('bugs', {req: req});
    }); 
=======
exports.list = function( req, res ){ 
models.Bug.find({}).populate('author', 'username').exec(function (err, bugs) {
if (err) res.redirect('/')
req.bugs = bugs
//console.log('error ' + err, bugs); 
res.render('bugs', {req: req});
 })
>>>>>>> ff2fb420b64ca72d8e2add84d207329a6a7d9db9
}

//render addBug page
exports.add = function( req, res ){ 
  res.render('addBug', {req: req}); 
}

//save to bug to db
exports.create = function( req, res ){ 
<<<<<<< HEAD
  models.Bug(req.body).save();
  res.redirect('/bugs');
}
=======
  var bug = new models.Bug(req.body);
  console.log(bug);
  bug.author = req.user;
// preliminary bugzilla scraper
  request(req.body.link, function(err, resp, body){
    $ = cheerio.load(body);
    scrapedStatus = $('#static_bug_status'); //use CSS selector here
    
    if(scrapedStatus && ($(scrapedStatus).text()).substring(0, 3)==='NEW'){
      bug.status = 'Open';
      bug.save(function (err) {
        if(err){
          res.render('/addBug');
        }
        else{
           res.redirect('bugs');
        }
      })   
   }
    else{
        res.redirect('/addBug');
     }
 });
}
  
>>>>>>> ff2fb420b64ca72d8e2add84d207329a6a7d9db9

exports.remove = function(req, res){
	var id = req.body.myId;
	var bug = models.Bug.findOne({ _id: id});
	bug.remove(function(err){
    	res.redirect('/bugs');
    });
}

