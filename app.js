
//app connects all the part of the app

var util = require('util');
var url = require('url');
var express = require('express')
,path = require('path');
var postdb = require('./postdb');
var app = express();
app.use(express.logger());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.engine('.html',require('ejs').renderFile);
app.set('views',__dirname + '/views'); // specify the absolute path, Apply an application level setting name to val
app.set('view engine','ejs');
app.use(express.static((__dirname, 'public')));

var parseUrlParams = function(req,res,next)
{
	req.urlP = url.parse(req.url,true);
	next();
}

var checkAccess = function(req,res,next)
{
	// a logged-in user will have "cookie" set in his cookies
	if (!req.cookies || !req.cookies.rememberMe || req.cookies.rememberMe !== "cookie")
	{
		res.redirect('/login');
	}
	else
	{
		next();
	}
};

postdb.connect(function(error)
{
	if (error) throw error;
});

app.on('close', function(errno)
{
	postdb.disconnect(function(err) {} );
});

app.get('/', function (req,res) { res.redirect('/view'); } );

app.get('/login', function(req,res)
{
	res.render('login.html', { title: "Bugs LOGIN" });
});

app.post('/login', function(req,res)
{
	if (req.body.username== "abc" && req.body.pwd=="123")
	{
		res.cookie('rememberMe','cookie');
		res.redirect('/view');		
	}
	else
	{
		util.log('Cannot match username and password');
	}
});

app.get('/view', parseUrlParams, checkAccess, function (req,res)
{
	postdb.allBugs(function(err, bugs)
	{
		if(err)
		{
			util.log('ERROR ' + err);
			throw err;
		}
		else 
		{
			res.render('viewBugs.html', { title : "Bugs", bugs: bugs });
		}
	});
});

app.get('/add', parseUrlParams, checkAccess, function(req,res) 
{
	res.render('editForm.html', { title : "Bugs", postpath: '/add', bug: postdb.emptyBug});
});

app.post('/add', checkAccess, function(req,res)
{
	postdb.add(req.body.bugName, req.body.author, req.body.description, req.body.status, req.body.link, function(error)
	{
		if (error) throw error;
		res.redirect('/view');
	});
});

app.get('/del', parseUrlParams, checkAccess, function(req,res)
{
	postdb.delete(req.urlP.query.id, function(error) 
	{
		if(error) throw error;
		res.redirect('/view');
	});
});

app.get('/edit', parseUrlParams, checkAccess, function(req,res)
{
	postdb.findBugById(req.urlP.query.id, function(error, bug) 
	{
		if (error) throw error;
		res.render('editForm.html', {title : "Bugs", postpath:'/edit', bug: bug });
	});
});
app.post('/edit', checkAccess, function(req,res)
{
	postdb.edit(req.body.id, req.body.bugName, req.body.author, req.body.description, req.body.status, req.body.link, function(error)
	{
		if (error) throw error;
		res.redirect('/view');
	});
	
});


app.get('/addCom', parseUrlParams, checkAccess, function(req,res)
{
	postdb.findBugById(req.urlP.query.id, function(error, bug) 
	{
		if (error) throw error;
		res.render('commentForm.html', {title : "Bugs",  bug: bug });
	});
});




app.listen(3000);

