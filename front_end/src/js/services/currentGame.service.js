module.exports = function() {
	'use strict';
	angular
		.module('app')
			.factory('currentGame', currentGame)

	function currentGame() {
		var players = [];
		function isWinner(player) {
			if (player.isRock()) {
				return testRock(player);
			}
			else if (player.isScissors()) {
				return testScissors(player);
			}
			else if (player.isPaper()) {
				return testPaper(player);
			}
			else {
				return false;
			}
		}
		function testRock(player) {
			var otherPlayer;
			var key;
			for (key in players) {
				otherPlayer = players[key];
				if (otherPlayer!=player) {
					if (otherPlayer.isUnset() || otherPlayer.isRock() || otherPlayer.isPaper()) {
						return false;
					}
				}
			}
			return true;
		}

		function testScissors(player) {
			var otherPlayer;
			var key;
			for (key in players) {
				otherPlayer = players[key];
				if (otherPlayer!=player) {
					if (otherPlayer.isUnset() || otherPlayer.isScissors() || otherPlayer.isRock()) {
						return false;
					}
				}
			}
			return true;
		}

		function testPaper(player) {
			var otherPlayer;
			var key;
			for (key in players) {
				otherPlayer = players[key];
				if (otherPlayer!=player) {
					if (otherPlayer.isUnset() || otherPlayer.isPaper() || otherPlayer.isScissors()) {
						return false;
					}
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
