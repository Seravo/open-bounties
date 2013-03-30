var nodemailer = require('nodemailer');
exports.sendMail = function(link, err){
  if(err){
    console.log(err)
  }
  smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",
   auth: {
       user: "mrprojectlead@gmail.com",
       pass: "Leadersh1p"
     }
  });

  smtpTransport.sendMail({
     from: 'Bounty Project Development Team <mrprojectlead@gmail.com>', // sender address
     to: 'Kesha <mrprojectlead@gmail.com>', // comma separated list of receivers
     subject: 'Request for Bug Confirmation', // subject line
     text: 'See the link to the bounty: ' + link// plaintext body for now
  }, function(err, res){
     if(err){
         console.log(err)
     }else{
         console.log('Message sent: ' + res.message)
     }
  });
}
