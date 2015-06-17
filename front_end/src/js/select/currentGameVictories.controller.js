module.exports = function() {
	'use strict';
	angular
		.module('app')
			.controller('currentGameVictories', currentGameVictories)

	function currentGameVictories(currentGame) {
		console.log("currentGameVictories called");

		// view model
		var vm = this;

		// TODO : make these private
		// which position this view holds
		vm.gameIndex = null;
		vm.numberOfVictories = 0;

		vm.registerPlayer = registerPlayer;

		// private
		function registerPlayer(gameId, playerIndex) {
			vm.gameId = gameId;
			vm.playerIndex = playerIndex;

			// register this instance as a participant in the current game
			currentGame.registerPlayer(vm);

			// TODO : deal with local persistence
		}
	}

}();
