module.exports = function() {
	'use strict';
	angular
		.module('app')
			.factory('currentGame', currentGame)

	function currentGame($window) {
		var players = [];
		return {
			registerPlayer: function(player) {
				players.push(player);
			},
			isWinner: function(player) {
				return isWinner(player);
			},
			isDraw: function(player) {
				return isDraw(player);
			},
			isComplete: function() {
				isComplete() && $window.alert("Another game?");
			}
		}


		// private

		function isWinner(player) {
			var otherPlayer;
			var key;
			if (players.length>1) {
				for (key in players) {
					otherPlayer = players[key];
					if (otherPlayer!=player) {
						return player.isRock() ? otherPlayer.isScissors() : player.isPaper() ? otherPlayer.isRock() : player.isScissors() ? otherPlayer.isPaper() : false;
					}
				}
				return true;
			}
			return false;
		}

		// in hypothetical position of more than 2 players we require all to have the same selection to have a draw
		function isDraw(player) {
			var otherPlayer;
			var key;
			if (players.length>1) {
				for (key in players) {
					otherPlayer = players[key];
					if (otherPlayer!=player) {
						if (otherPlayer.isUnset() || player.isRock() && !otherPlayer.isRock() || player.isPaper() && !otherPlayer.isPaper() || player.isScissors() && !otherPlayer.isScissors()) {
							return false
						}
					}
				}
				return true;
			}
			return false;
		}

		function isComplete() {
			var key;
			for (key in players) {
				if (players[key].isUnset()) {
					return false;
				}
			}
			return true;
		}
	};

}();
