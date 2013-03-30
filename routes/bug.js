var models = require('../dbModels');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var emailer = require ('../routes/emailer');
// var async = require('async');

exports.index = function(req, res) {
  res.render('bugpage', {
    req: req
  })
}

exports.find = function(req, res, next, id) {
  models.Bug.findOne({
    _id: id
  }).populate('author', 'username').exec(function(err, bug) {
    console.log(req.isAuthenticated() + "----> user ")
    if (err) return next(err)
    if (!bug) return next(new Error('Failed to load user ' + id))
    req.bug = bug;
    next()

  })
}

exports.list = function(req, res) {
  models.Bug.find({}).populate('author', 'username').exec(function(err, bugs) {
    if (err) res.redirect('/')
    req.bugs = bugs
    //console.log('error ' + err, bugs); 
    res.render('bugs', {
      req: req
    });
  })
}

//render addBug page
exports.add = function(req, res) {
  res.render('addBug', {
    req: req
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
    scrapedStatus = $('#static_bug_status'); //use CSS selector here

    if (scrapedStatus && ($(scrapedStatus).text()).substring(0, 3) === 'NEW') {
      bug.status = 'Open';
      bug.save(function(err) {
        if (err) {
          res.render('/addBug');
        } else {
          res.redirect('bugs');
          //send email to the project lead, will be replaced later
          // mrprojectlead@gmail.com pass:Leadersh1p, sends to itsself
          emailer.sendMail('http://localhost:3000/bug/' + bug._id, function(err) {
        if (err) {
          console.log(err)
        }
      })
        }
      })
    } else {
      res.redirect('/addBug');
    }
  });
}


exports.remove = function(req, res) {
  var id = req.body.myId;
  var bug = models.Bug.findOne({
    _id: id
  });
  bug.remove(function(err) {
    res.redirect('/bugs');
  });
}