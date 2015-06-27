module.exports = function() {
	'use strict';
	angular
		.module('app')
			.factory('socket', socketService)

	function socketService(io) {
		var players = [];
		var socket = io('http://localhost:3000');
		var gameId;

		socket.on('connect', function () {
		});

		socket.on('another player connect', function () {
			//console.log('another player connect called');
			for (var i=0; i<players.length; i++) {
				if (players[i].isEnabled()) {
					players[i].socketUpdate();
				}
			}
		});

		socket.on('game update', function(obj){
			console.log('game update called');
			console.log('player ' + obj.index);
			console.log('value ' + obj.value);
			players[obj.index].selection = obj.value;
//			players[obj.index].setSelection(obj.value);
			for (var i=0; i<players.length; i++) {
				players[i].forceDigestHack();
			}
		});

		socket.on('register player', function(gameIdParam, position_param){
			gameId = gameIdParam;
			//console.log("players");
			//console.log(players);
			for(var i=0; i<players.length; i++) {
				//console.log("player");
				//console.log(players[i]);
				players[i].registerPlayer(gameId, position_param);
			}
		});

		socket.on('server error', function () {
			for(var i=0; i<players.length; i++) {
				players[i].serverError();
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
