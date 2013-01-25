//connect http-module
var http = require("http");

//module url
var url = require("url");

//request and responds are obejcts
//we can methods to work with them
function start(route) {
	function onRequest(request, response) {
	  
	  //now we can define different requst based on 
	  //different URLs
	  var pathname = url.parse(request.url).pathname;
      console.log("Request for " + pathname + " received.");
      
      route(pathname);
      
      response.writeHead(200, {"Content-Type": "text/plain"})
	  response.write("Hello World");
	  response.end();
	}

	http.createServer(onRequest).listen(8888);

	console.log("Server has started.");
}


exports.start = start;
