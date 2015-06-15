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

		function isDraw() {
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
