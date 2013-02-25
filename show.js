

var util = require('util');
var postdb = require('./postdb');
 
postdb.connect(function(error)
{
  if(error) throw error;
	});
 
postdb.forAll(function(error, row)
    {
	        util.log('ROW : ' + util.inspect(row));
   }
   , function(error)
    {
 if (error) throw error;
 util.log('ALL DONE' );
  postdb.disconnect(function(err) { } );
  }
);
