var passport = require('passport')
  ,	models = require('../dbModels')
  , passwordHash = require('password-hash');

exports.render = function( req, res ) { 

    //   console.log(req.isAuthenticated())
       res.render('login', {req: req});
}

exports.list = function(req, res, next){
 	  models.User.find({}, function( err, users ){
      if (err) return next(err)
      req.users = users;  
      res.render('users', {req: req});
    }); 
};

exports.signup = function( req, res ) { 
       res.render('signup', {req: req });
}

exports.create = function (req, res){ 
	   var hashedPassword = passwordHash.generate(req.body.hashed_password);
	   models.User({name: req.body.name, email: req.body.email, 
				username: req.body.username, hashed_password: hashedPassword}).save();
	   res.redirect('/');
}

exports.show = function(req, res){
 // console.log(req.isAuthenticated() + "---->show") 
  res.render('userpage', {req: req}); 
}

exports.user = function(req, res, next, id){
  //var user = models.User.findOne({_id: id});

  models.User.findOne({_id: id}, function (err, user){
   // console.log(req.isAuthenticated() + "----> user ") 
    if (err) return next(err)
    if (!user) return next(new Error('Failed to load user ' + id))
    req.user = user;
    next() 
 
  })
}