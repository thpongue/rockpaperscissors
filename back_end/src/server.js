var express = require('express');
var path = require('path');
var app = express();
var uuid = require('uuid');
var games = {};


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
	console.log("connection attempt from socket id " + socket.id + " and game id: " + game_id);
	
	if (games[game_id]) {
		console.log("I know this url!");
		var game = games[game_id];
		var players = game.players;
		var maxNumberOfPlayers = 2;

		// tell the new player their state
		for (var i=0; i<maxNumberOfPlayers; i++) {
			if (!players[i]) {
				io.to(socket.id).emit('position update', i); // message to just that socket
				players[i] = socket.id;
				console.log("adding to position " + i);
				break;
			}
		}
	
		// get all other players to rebroadcast their state
		for (var j=0; j<maxNumberOfPlayers; j++) {
			if (j!=i) {
				io.to(players[j]).emit('another player connect'); // message to just that socket
			}
		}


	} else {
		console.log("unrecognised url");
	}
	
  socket.on('game update', function(msg){
		var game_id = /game_id=(.*)/.exec(socket.request.headers.referer)[1];
		console.log("game update from socket id " + socket.id + " and game id: " + game_id);
		var game = games[game_id];
		console.log("game = " + game);
		if (game) {
			var players = game.players;
			var index = players.indexOf(socket.id);
			for(var i=0; i<players.length; i++) {
				if(players[i] != socket.id) {
					console.log("players[i] = " + players[i]);
					io.to(players[i]).emit('game update', {index: index, value: msg});
				}
			}
		} else {
			console.log("server error");
			io.emit("server error");
		}
  });
	
  socket.on('disconnect', function(msg){
		var game_id = /game_id=(.*)/.exec(socket.request.headers.referer)[1];
		console.log("disconnect from socket id " + socket.id + " and game id: " + game_id);
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
