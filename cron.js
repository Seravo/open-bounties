cheerio = require('cheerio'),
request = require('request'),
moment = require('moment'),
models = require('./dbModels'),
exports.setTime = function(){
setInterval(function() {
  models.Bug.find({}).populate('author', 'username').exec(function(err, bugs) {
    bugs.forEach(function(b) {
      request(b.link, function(err, resp, body) {
        $ = cheerio.load(body);
        var scrapedStatus = $('#static_bug_status'); //use CSS selector here
        var scrapedAssignee = $('.fn');
        /*console.log('bugStatus:' + b.bugStatus)
        console.log('scrapedStatus:' + ($(scrapedStatus).text()))*/
        if (($(scrapedStatus).text()) != b.bugStatus) {

          if (($(scrapedStatus).text()).substring(0, 4) === 'ASSI' 
            && ($(scrapedAssignee).text()).indexOf('openbounties.org') !== -1) {
            b.bugStatus = $(scrapedStatus).text()
            b.bountyStatus = 'IN PROGRESS'
          }

          if (($(scrapedStatus).text()).trim().replace(/\s{2,}/g, ' ') === 'RESOLVED FIXED' 
            && ($(scrapedAssignee).text()).indexOf('openbounties.org') !== -1) {
            b.bugStatus = 'RESOLVED FIXED'
            b.bountyStatus = 'FIXED'
          }

          if (($(scrapedStatus).text()).trim().replace(/\s{2,}/g, ' ') === 'VERIFIED FIXED' 
            && ($(scrapedAssignee).text()).indexOf('openbounties.org') !== -1) {
            b.bugStatus = 'VERIFIED FIXED'
            b.bountyStatus = 'RELEASED'
          }
          b.save(function(err) {
            if (err) {
              console.log('statusCheck fail')
            }
          })
        } else {
          console.log('statusCheck complete, no changes made')
        }
      });
    });
  })
  console.log(Date())

}, 43200000)
}


exports.checkBountiesDeadlines = function(){
setInterval(function() {
  models.Bug.find({bountyStatus: "IN PROGRESS"}).exec(function(err, bugs) {
    bugs.forEach(function(b) {

        var myDeadline = moment(b.deadline);
        if (myDeadline.diff(moment()) < 0) {
          console.log("UPDATING!")

          b.bountyStatus = "OPEN";
          b.deadline = moment().format();
          // b.update({
          //   bountyStatus: 'OPEN',
          //   deadline: moment().format()

          // });
          b.save(function(err) {
            if (err) {
              console.log('deadline fails')
            }
          })

          console.log("DONE!")

        }
        else{
          var diff = myDeadline.diff(moment(), 'seconds');
          // console.log(diff);
          // console.log(b.bugName);
          // console.log(b.deadline);
         
        }
    });
  })



 }, 1110)
}



//43200000
