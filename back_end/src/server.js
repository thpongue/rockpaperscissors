var express = require('express');
var path = require('path');
var app = express();
var uuid = require('uuid');
var games = {};

// redirect default request to a have a new game id
app.get('/', function(request, response, next) {
	console.log(request.query);
	var game_id = request.query.game_id;
	if (!game_id) {
		game_id = uuid.v4();
		response.redirect('?game_id='+game_id);
	} else {
		if (!games[game_id]) {
			games[game_id]=1;
		} else {
			games[game_id]++;
		}
		console.log("id = " + game_id);
		console.log("count = " + games[game_id]);
		next();
	}
	
});

// 
app.use(express.static('build/static'));

// 
var server = app.listen(8001, function () {
  var host = server.address().address;
  var port = server.address().port;
});
