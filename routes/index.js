var models = require('../dbModels')

exports.index = function( req, res ) { 
  models.Bug.find({}, function( err, bugs ){
   // models.Comment.find({}, function( err, albums ){
      res.render('index.html', { listofbugs: bugs });
    });

}