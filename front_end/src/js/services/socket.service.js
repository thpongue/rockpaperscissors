module.exports = function() {
	'use strict';
	angular
		.module('app')
			.factory('socket', socketService)

	function socketService() {
		var player;
		var position;
		var socket = io('http://localhost:3000');
		socket.on('connect', function () {




			// i don't think this is important - on the client we just need to know which player we are the server manages socket id's
			// use this to know which player we are
			console.log("socket id = " + socket.io.engine.id);





		});
		
		socket.on('game update', function(msg){
			console.log("game update received = " + msg);
		});

		socket.on('position update', function(position_param){
			position = position_param;
			console.log("position update received = " + position_param);
		});

		return {
			registerPlayer: function(player_param) {
				player = player_param;
				console.log("player registered");	
			},
			send: function(value) {

				// here!
				// now we need to send the position and the value + update the front end code to take this into account
				socket.emit('game update', value);
			},
		}
	};

}();
