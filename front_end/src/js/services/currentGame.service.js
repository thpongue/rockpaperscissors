module.exports = function() {
	'use strict';
	angular
		.module('app')
			.factory('currentGame', currentGame)

	function currentGame() {
		var players = [];
		function isWinner(player) {
			var otherPlayer;
			var key;
			for (key in players) {
				otherPlayer = players[key];
				if (otherPlayer!=player) {
					return player.isRock() ? otherPlayer.isScissors() : player.isPaper() ? otherPlayer.isRock() : player.isScissors() ? otherPlayer.isPaper() : false;
				}
			}
			return true;
		}

		return {
			registerPlayer: function(player) {
				players.push(player);
			},
			isWinner: function(player) {
				return isWinner(player);
			}
		}
	};

}();
