var models = require('../dbModels')

exports.index = function( req, res, next){ 
	//Можно это проверять тут и передавать как bool авторизацию
	 var pageList = 3;
     var page = req.query.page && parseInt(req.query.page, 3) || 0;
    models.Bug.count(function (err, count){
    	if(err){
    		return next(err);
    	}
         var lastPage = (page+1)*pageList >=count;
         models.Bug.find({})
	 	    .populate('author', 'username')
	 	    .skip(pageList * page)
            .limit(pageList)
            .sort({createdAt: 1})
	 	    .exec(function (err, bugs) {
	 		    req.bugs = bugs;
                res.render('index', {req: req, page: page, lastPage: lastPage});
            });
	 	})
}
 
