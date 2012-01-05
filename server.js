var http = require("http");
var url  = require("url");
var formidable = require('formidable');

function start(route, handle){
	function onrequest(request,response){
		var pathname = url.parse(request.url).pathname;
		console.log("Request for pathname :" + pathname);
		route(handle,pathname,request,response);
	}
	http.createServer(onrequest).listen(8000);
	console.log("Server listening on port 8000");
}
exports.start = start;