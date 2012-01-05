var exec = require('child_process').exec
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable")
function start(request,response){
	console.log("In start request handler");
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

	response.writeHeader(200,{"Content-Type":"text/html"});
	response.write(body);
	response.end();

}
function upload(request,response){
	console.log("In upload request handler");
    var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files) {
    	console.log("parsing done:" + "/tmp/"+files.upload.name);
	    fs.renameSync(files.upload.path, "/tmp/"+files.upload.name);
	    fs.unlink("/tmp/test.png");
		fs.link("/tmp/"+files.upload.name, "/tmp/test.png");
	    response.writeHead(200, {"Content-Type": "text/html"});
	    response.write("received image: "+ files.upload.name+"</br>");
	    response.end();
    });
}
function show(request,response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;