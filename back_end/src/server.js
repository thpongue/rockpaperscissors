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
	var gameId = request.query.gameId;
	if (!gameId) {
		gameId = uuid.v4();
		games[gameId] = {
			players: []
		};
		response.redirect('?gameId='+gameId);
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
var maxNumberOfPlayers = 2;

io.on('connection', function(socket){
	var gameId = getGameId(socket);
	var game = games[gameId];
	
	logInfo("connection attempt ", socket.id, gameId);

	if (game) {
		console.log("This is a valid url");
		var players = game.players;
		var newPlayerIndex = getIndexForNewPlayer(game.players);
		io.to(socket.id).emit('position update', newPlayerIndex);
		players[newPlayerIndex] = socket.id;

		// get all other players to rebroadcast their state
		for (var j=0; j<maxNumberOfPlayers; j++) {
			if (j!=newPlayerIndex) {
				io.to(players[j]).emit('another player connect'); // message to just that socket
			}
		}
	} else {
		console.log("unrecognised url");
	}
	
  socket.on('game update', function(msg){
		var gameId = getGameId(socket);
		var game = games[gameId];

		logInfo("game update", socket.id, gameId);

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
		var gameId = getGameId(socket);
		var game = games[gameId];

		logInfo("disconnect", socket.id, gameId);

		if (game) {
			var players = game.players;
			var index = players.indexOf(socket.id);
			players[index]=null;
			console.log("remove from position " + index);
		}
  });
});

function getGameId(socket) {
	return /gameId=(.*)/.exec(socket.request.headers.referer)[1];
}

function getIndexForNewPlayer(players) {
	for (var i=0; i<maxNumberOfPlayers; i++) {
		if (!players[i]) {
			return i;
		}
	}
	return null;
}

function logInfo(prefix, socketId, gameId) {
		console.log(prefix + " from socket id " + socketId + " and game id: " + gameId);
}

http.listen(3000, function(){
  console.log('listening on *:3000');
});
