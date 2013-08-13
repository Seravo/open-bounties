var models = require('../dbModels');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var emailer = require('../routes/emailer');
var moment = require('moment');
// var async = require('async');

exports.index = function(req, res) {
/*
   ********DO NOT DELETE THIS!********************

  if (req.bug.bountyStatus === 'IN PROGRESS') {
    var myDeadline = moment(req.bug.deadline);
    var diff = myDeadline.diff(moment(), 'minutes');
    req.diff = diff;

    res.render('bugpage', {
      req: req
    })
  }
  else{
    res.render('bugpage', {
      req: req
    })
  }

*/

  var myDeadline = moment(req.bug.deadline);
  if (myDeadline.diff(moment()) < 0) {
    // console.log('foo')
    // console.log(req.bug.bountyStatus)
    // req.bug.bountyStatus = 'OPEN';

    var bug = models.Bug.findOne({
      _id: req.bug.id,
    }).populate('user');      

    bug.update({
      bountyStatus: 'OPEN',
      deadline: moment().format()
    });
    // console.log(req.bug.bountyStatus)

    res.render('bugpage', {
      req: req
    })

  } else {
    var diff = myDeadline.diff(moment(), 'minutes');
    req.diff = diff;

    res.render('bugpage', {
      req: req
    })

  }
}

/*VERY STRANGE 

  .populate('author', 'username').populate('claimer', 'username') 

  works fine
*/
exports.find = function(req, res, next, id) {
  models.Bug.findOne({
    _id: id
  }).populate('author', 'username').populate('claimer', 'username').exec(function(err, bug) {
    console.log(req.isAuthenticated() + "----> user ")
    if (err) return next(err)
    if (!bug) return next(new Error('Failed to load user ' + id))
    req.bug = bug;
    next()
    console.log(req.isAuthenticated())

  })
}

exports.list = function(req, res, next) {
    var perList = 10;
    var page = req.query.page && parseInt(req.query.page, 10) || 0;
    models.Bug.count(function (err, count){
      if(err){
        return next(err);
      }
         var lastPage = Math.ceil(count/perList)-1
         models.Bug.find({})
        .populate('author', 'username')
        .skip(perList * page)
            .limit(perList)
            .sort({createdAt: 1})
        .exec(function (err, bugs) {
          if (err) res.redirect('/')
          req.bugs = bugs;
                res.render('bugs', {
                  req: req, 
                  page: page, 
                  lastPage: lastPage});
            });
  })
}

//render addBug page
exports.add = function(req, res) {
  res.render('addBug', {
    req: req,
    correct: '1',
    bug: new models.Bug({})
  });
}

//save to bug to db
exports.create = function(req, res) {
  var bug = new models.Bug(req.body);
  console.log(bug);
  bug.author = req.user;
  // preliminary bugzilla scraper
  request(req.body.link, function(err, resp, body) {
    $ = cheerio.load(body);
    var scrapedStatus = $('#static_bug_status'); //use CSS selector here
    var scrapedAssignee = $('.fn');

    if (($(scrapedStatus).text()).substring(0, 3) === 'NEW' 
      && ($(scrapedAssignee).text()).indexOf('Nobody; OK to take') !== -1) {
      bug.bountyStatus = 'OPEN';
      bug.bugStatus = $(scrapedStatus).text();

      bug.save(function(err) {
        if (err) {
          res.render('/addBug');
        } else {
          res.redirect('bugs');
        }
      })
    } else {
      res.render('addBug', {
        req: req,
        correct: '0',
        bug: bug
      });
    }
  });
}


exports.remove = function(req, res) {
  var id = req.body.myId;
  var bug = models.Bug.findOne({
    _id: id
  });
  bug.remove(function(err) {
    //if err  ----do something 
    res.redirect('/bugs');
  });
}

//claim
exports.claim = function(req, res) {

  var myHours = req.body.hours;
  var myClaimer = req.user.id;
  console.log(req.bug.deadline);

  var myDeadline = moment(req.bug.deadline);

  myDeadline.add('seconds', myHours);
  console.log(myDeadline.format());

  var bug = models.Bug.findOne({
    _id: req.bug.id
  });

  bug.update({
    bountyStatus: 'IN PROGRESS',
    claimer: myClaimer,
    deadline: myDeadline.format()
  }, function(err) {
    res.redirect('/bug/' + req.bug.id);
    //send email to the project lead
    // mrprojectlead@gmail.com pass:Leadersh1p, sends to itsself for now
    emailer.sendMail('http://localhost:3000/bug/' + req.bug.id, function(err) {
      if (err) {
        console.log(err)
      }
    })
  })
}