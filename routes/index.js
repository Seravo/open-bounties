var models = require('../dbModels')
exports.index = function( req, res ){ 
	//Можно это проверять тут и передавать как boll авторизацию
<<<<<<< HEAD
	 models.Bug.find({}, function( err, bugs ){   
=======
	 models.Bug.find({}).populate('author', 'username').exec(function (err, bugs) {
>>>>>>> ff2fb420b64ca72d8e2add84d207329a6a7d9db9
      req.bugs = bugs;
      res.render('index', {req: req});
    }); 
}
