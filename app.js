var express = require('express'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  db = require('./dbConnection'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  GoogleStrategy = require('passport-google').Strategy,
  TwitterStrategy = require('passport-twitter').Strategy,
  cron = require('./cron')
  passwordHash = require('password-hash');
var FACEBOOK_APP_ID = "449837621775038"
var FACEBOOK_APP_SECRET = "e98541f9a4c1f1e7eee6fe6be81000b9";


var app = express();


app.configure(function() {
  app.set('port', process.env.PORT || 3001);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.cookieParser());
  //app.use(express.session({ secret: 'keyboard cat' }));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());


  app.use(express.session({
    secret: 'keyboard cat'
  }));
  app.use(passport.initialize());
  app.use(passport.session());


  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

/////////////////////////////////
//PASSPORT//////////////////////
passport.serializeUser(function(user, done) {
  console.log(user)
  done(null, user.id);

});

passport.deserializeUser(function(id, done) {
  models.User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(

function(username, password, done) {
  models.User.findOne({
    username: username
  }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {
        message: 'Incorrect username.'
      });
    }
    if (!passwordHash.verify(password, user.hashed_password)) {
      return done(null, false, {
        message: 'Incorrect password.'
      });
    }
    return done(null, user);
  });
}));

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://haaga-helia.seravo.fi:3001/auth/facebook/callback"
},

function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({
    _id: profile.id
  }, function(err, user) {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
}));

passport.use(new GoogleStrategy({
  returnURL: 'http://http://haaga-helia.seravo.fi:3000/auth/google/return',
  realm: 'http://http://haaga-helia.seravo.fi/'
},

function(identifier, profile, done) {
  User.findOrCreate({
    _id: identifier
  }, function(err, user) {
    done(err, user);
  });
}));


/////////////////////////////////////
//Main page

app.get('/', routes.index);

//Users
var user = require('./routes/user');
app.get('/login', user.render);
//app.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), user.session);
app.post('/login', passport.authenticate('local', {
  failureRedirect: '/login'
}), function(req, res) {
  res.redirect('/');
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.post('/signup', user.create);
app.get('/signup', user.signup);
app.get('/users', user.list);
app.get('/user/:userid', user.show);
app.param('userid', user.user);
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
passport.authenticate('facebook', { successRedirect: '/',
  failureRedirect: '/login'
}),

function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
});
app.get('/auth/google', passport.authenticate('google'));
app.get('/auth/google/return',
passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

//Bugs
var bug = require('./routes/bug');
//app.get('/bugs', passport.authenticate('local',{failureRedirect: '/login'}) ,bug.list);
app.get('/bugs', bug.list);
app.get('/addBug', ensureAuthenticated, bug.add);
app.post('/addBug', ensureAuthenticated, bug.create);
app.post('/deleteBug', bug.remove);
app.get('/bug/:bugid', bug.index)
app.post('/bugpage/:bugid/claim', ensureAuthenticated, bug.claim);

app.param('bugid', bug.find);


// //Image
app.post('/uploadImage', user.image);


http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});

//Comments
var comment = require('./routes/comment')
app.post('/bugpage/:bugid/comments', ensureAuthenticated, comment.add);

//Additions
var addition = require('./routes/additions')
app.post('/bugpage/:bugid/additions', ensureAuthenticated, addition.add);


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
}

cron.setTime();
cron.checkBountiesDeadlines();