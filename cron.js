cheerio = require('cheerio'),
request = require('request'),
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

}, 5000)
}
//43200000
