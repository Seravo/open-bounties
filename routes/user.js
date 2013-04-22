var passport = require('passport'),
  models = require('../dbModels'),
  passwordHash = require('password-hash'),
  fs = require('fs');

exports.render = function(req, res) {

  //   console.log(req.isAuthenticated())
  res.render('login', {
    req: req
  });
}

exports.list = function(req, res, next) {
  models.User.find({}, function(err, users) {
    if (err) return next(err)
    req.users = users;
    res.render('users', {
      req: req
    });
  });
};

exports.signup = function(req, res) {
  res.render('signup', {
    req: req,
    user: new models.User({})
  });
}

exports.create = function(req, res) {
  var user = new models.User(req.body)
  , nameerr = ''
  , emailerr = ''
  , usernameerr = ''
  validateName(req.body.name, function(err, name){
  if(err){
    nameerr = err
  }
  validateMail(req.body.email, function(err, email){
    if(err){
      emailerr = err
    }
    validateUsername(req.body.username, function(err, username){
      if(err){
        usernameerr = err
      }
      console.log(usernameerr + 'usernameerr')
      if(typeof(name) === 'undefined' || 
        typeof(username) === 'undefined' || 
        typeof(email) === 'undefined'){
        var errors = new Array(nameerr, emailerr, usernameerr)
      console.log(errors)
        res.render('signup', {
        req: req,
        user: user,
        errors:errors
      });
      }
      else{
      var hashedPassword = passwordHash.generate(req.body.hashed_password);
      models.User({
      name: name,
      email: email,
      username: username,
      hashed_password: hashedPassword
      }).save();
      res.redirect('/');
    }
    })
  })
  })
}

function validateName(name, callback){
  if(name.length === 0){
    var err = new Error("Name can not be blank");
    return callback(err);
    }
    else
    return callback(null, name)
}
function validateMail(mail, callback){
  if(mail.length === 0){
    var err = new Error("E-mail can not be blank");
    return callback(err);
    }
    else if(!mail.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)){
      var err = new Error("Invalid e-mail address");
    return callback(err);
    }
    else
    return callback(null, mail)
}

function validateUsername(username, callback){
  if(username.length === 0){
    var err = new Error("Username can not be blank");
    return callback(err);
    }
  /*else{
      models.User.findOne({
      username: username
      }), function(err, user) {
     if{
      (err) return callback(err);
    }
     else if(user){
      var err = new Error("Someone has that username, try another one");
      return callback(err);
     }*/
     else{
      return callback(null, username);
     }
  //}
  //}
}

exports.show = function(req, res) {
  // console.log(req.isAuthenticated() + "---->show") 
  res.render('userpage', {
    req: req
  });
}

exports.user = function(req, res, next, id) {
  //var user = models.User.findOne({_id: id});

  models.User.findOne({
    _id: id
  }, function(err, user) {
    // console.log(req.isAuthenticated() + "----> user ") 
    if (err) return next(err)
    if (!user) return next(new Error('Failed to load user ' + id))
    req.user = user;
    next()

  })
}

exports.image = function(req, res) {

  var tmp_path = req.files.thumbnail.path;

  target_path = 'public/images/' + req.files.thumbnail.name;

  fs.rename(tmp_path, target_path, function(err) {
    if (err) throw err;
    // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
    fs.unlink(tmp_path, function() {
      if (err) throw err;

    });
  });

  var user = models.User.findOne({
    _id: req.user.id,
  })

  user.update({
    $set: {
      imagePath: '/images/' + req.files.thumbnail.name
    }
  });
  console.log(target_path);



  res.redirect('/user/' + req.user.id);
}