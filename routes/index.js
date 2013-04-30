var models = require('../dbModels')

// exports.index = function(req, res, next) {
//     var pageList = 2;
//     var page = req.query.page && parseInt(req.query.page, 10) || 0;
//     models.Bug.count(function(err, count) {
//         if (err) {
//             return next(err);
//         }
//         var lastPage = Math.ceil(count / pageList) - 1;

//         models.Bug.find({ bountyStatus: "OPEN" })
//             .populate('author') //populate everything
//             .skip(pageList * page)
//             .limit(pageList)
//             .sort({totalSum: -1}) //timestamp
//             .exec(function(err, bugs) {
//             req.expbugs = bugs,
//             req.explastpage = lastPage,
//             req.exppage = page,
//             req.count = count
//         });


//         models.Bug.find({})
//             .populate('author') //populate everything
//             .skip(pageList * page)
//             .limit(pageList)
//             .sort({ts: -1}) //timestamp
//             .exec(function(err, bugs) {
//             req.bugs = bugs;
//             page: page,
//             lastPage: lastPage
//         }); 
//     })

//         res.render('index', {
//         req: req,
//       });   
// }

exports.index = function( req, res, next){ 

        models.Bug.find().populate('author').sort({ts: -1}).limit(5).exec(function (err, bugs) {
            req.bugs = bugs;
            models.Bug.find().populate('author').sort({totalSum: -1}).limit(5).exec(function (err, expbugs) {
                req.expbugs = expbugs;
                res.render('index', {req: req});
            });
        });
}