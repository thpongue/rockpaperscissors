var express = require('express');
var path = require('path');
var app = express();
var uuid = require('uuid');
var games = {};


// notes
// 1st user goes to site
// gets redirected to game id
// connects to our socket server passing this id
// we put it into game.unique_id.players at position 0



// -------------------------------------
// server
// -------------------------------------

// redirect default request to a have a new game id
app.get('/', function(request, response, next) {
	var game_id = request.query.game_id;
	if (!game_id) {
		game_id = uuid.v4();
		games[game_id] = {
			players: []
		};
		response.redirect('?game_id='+game_id);
	} else {
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


// -------------------------------------
// socket io
// -------------------------------------

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
	var game_id = /game_id=(.*)/.exec(socket.request.headers.referer)[1];
	console.log("connection attempt");
	console.log("from socket id" + socket.id);
	console.log("and game_id " + game_id);
	console.log(socket.id);
	
	if (games[game_id]) {
		console.log("I know this url!");
		if (!games[game_id].players[0]) {
			
			io.emit('position update', 0);

			games[game_id].players[0] = socket.id;
			console.log("adding to position 0");
		} else if (!games[game_id].players[1]) {

			io.emit('position update', 1);

			games[game_id].players[1] = socket.id;
			console.log("adding to position 1");
		}
	} else {
		console.log("unrecognised url");
	}
	
  socket.on('game update', function(msg){
		var game_id = /game_id=(.*)/.exec(socket.request.headers.referer)[1];
		console.log("game update");
		console.log("from socket id" + socket.id);
		console.log("and game_id " + game_id);
    io.emit('game update', msg);
  });
	
  socket.on('disconnect', function(msg){
		var game_id = /game_id=(.*)/.exec(socket.request.headers.referer)[1];
		console.log("disconnected");
		console.log("from socket id" + socket.id);
		console.log("and game_id " + game_id);
		console.log(socket.id);

		if (games[game_id]) {
			if (games[game_id].players[0] == socket.id) {
				games[game_id].players[0] = null;
				console.log("remove from position 0");
			} else if (games[game_id].players[1] == socket.id) {
				games[game_id].players[1] = null;
				console.log("remove from position 1");
			}
		}
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
