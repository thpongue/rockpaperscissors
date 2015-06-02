module.exports = function() {
	'use strict';
	angular
		.module('app')
			.factory('socket', socketService)

	function socketService(io, $cookies) {
		var players = [];
		var socket = io('http://localhost:3000');

		socket.on('connect', function () {
		});

		socket.on('another player connect', function () {
			console.log('another player connect called');
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
			for (var i=0; i<players.length; i++) {
				players[i].forceDigestHack();
			}
		});

		socket.on('position update', function(position_param){
			for(var i=0; i<players.length; i++) {
				players[i].initWithPlayerIndex(position_param);
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
