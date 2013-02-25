var util = require('util');
var async = require('async');
var postdb = require('./postdb');

postdb.connect(function(error)
{
   if (error) throw error;
});
 
postdb.setup(function(error)
{
    if (error)
    {
       util.log('ERROR ' + error);
       throw error;
   }
  async.series([
    function(cb)
       {
		postdb.add( 'wifi', 'pups',
		'finally works', 'done', 'google.com',
	                function(error)
                {
                    if (error) util.log('ERROR '+ error);
	                    cb(error);
	                });
	        }
	        ],
	        function(error, results)
	        {
	            if (error) util.log('ERROR ' + error);
	            postdb.disconnect(function(err) {} );
	        }
      );
});

 
