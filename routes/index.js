var models = require('../dbModels')

exports.index = function( req, res ){ 
	//Можно это проверять тут и передавать как boll авторизацию
	 	  models.Bug.find({}).populate('author', 'username').exec(function (err, bugs) {
      req.bugs = bugs;
      res.render('index', {req: req});
       });
     
}
 
