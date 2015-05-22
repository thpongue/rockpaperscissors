module.exports = function() {
	'use strict';
	angular
		.module('app')
			.factory('socket', socketService)

	function socketService() {

		var socket = io('http://localhost:3000');
		
		socket.on('game update', function(msg){
			console.log("game update received = " + msg);
		});

		return {
			send: function(value) {
				socket.emit('game update', value);
			},
		}
	};

}();
