var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(600, {"Content-Type": "text/plain"});
  response.write("Hello World  ! Node.js");
  response.end();
}).listen(8888);
