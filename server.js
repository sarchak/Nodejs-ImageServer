var http = require("http");
var url  = require("url");
var formidable = require('formidable');
var port = process.env.PORT || 8000;
function start(route, handle){
	function onrequest(request,response){
		var pathname = url.parse(request.url).pathname;
		console.log("Request for pathname :" + pathname);
		route(handle,pathname,request,response);
	}
	http.createServer(onrequest).listen(port);
	console.log("Server listening on port "+port);
}
exports.start = start;