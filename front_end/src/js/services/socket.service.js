module.exports = function() {
	'use strict';
	angular
		.module('app')
			.factory('socket', socketService)

	function socketService(io) {
		var players = [];

		console.log("about to call io");
		var socket = io('http://localhost:3000');

		socket.on('connect', function () {
			console.log("player connected");
		});
		
		socket.on('game update', function(obj){
			players[obj.index].selection = obj.value;
			for (var i=0; i<players.length; i++) {
				players[i].forceDigestHack();
			}
		});

		socket.on('position update', function(position_param){
			for(var i=0; i<players.length; i++) {
				players[i].initWithPlayerIndex(position_param);
			}
		});

		return {
			registerPlayer: function(player_param) {
				players.push(player_param);
			},
			send: function(value) {
				socket.emit('game update', value);
			}
		}
	};

}();
