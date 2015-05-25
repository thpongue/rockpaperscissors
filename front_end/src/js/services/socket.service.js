module.exports = function() {
	'use strict';
	angular
		.module('app')
			.factory('socket', socketService)

	function socketService() {
		var players = [];
		var socket = io('http://localhost:3000');
		socket.on('connect', function () {
		});
		
		socket.on('game update', function(obj){
			console.log("game update received = " + obj.index + ", " + obj.value);
			players[obj.index].selection = obj.value;

			for (var i=0; i<players.length; i++) {
				players[i].forceDigestHack();
			}
		});

		socket.on('position update', function(position_param){


		// I'm receiving this whenever all players start - on the server only send this to the appropriate player
		// or have knowledge of my socket id



			for(var i=0; i<players.length; i++) {
				players[i].initWithPlayerIndex(position_param);
			}
		});

		return {
			registerPlayer: function(player_param) {
				players.push(player_param);
			},
			send: function(value) {

				// here!
				// now we need to send the position and the value + update the front end code to take this into account
				socket.emit('game update', value);
			},
		}
	};

}();
