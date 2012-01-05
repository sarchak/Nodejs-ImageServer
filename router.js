function route(handle,pathname,request,response){
	console.log("Routing : " + pathname );
	if(typeof(handle[pathname]) === 'function'){
		handle[pathname](request,response);
	} else {
		console.log("No request handler for path : " + pathname);
		response.writeHeader(404,{'Content-Type':'text/html'});
		response.write("Not found!!");
		response.end();
	}
}
exports.route = route;