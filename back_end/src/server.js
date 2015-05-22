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
		response.redirect('?game_id='+game_id);
	} else {
		if (!games[game_id]) {
			games[game_id]=1;
		} else {
			games[game_id]++;
		}
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
	console.log("connection made");
  socket.on('game update', function(msg){
		console.log("game update");
    io.emit('game update', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
