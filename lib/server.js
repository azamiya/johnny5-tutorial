function start(app, http, PORT) {

	http.listen(PORT, function(){
	  console.log('Listen on ',PORT);
	});
}

exports.start = start;