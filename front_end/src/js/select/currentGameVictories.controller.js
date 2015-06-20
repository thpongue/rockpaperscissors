module.exports = function() {
	'use strict';
	angular
		.module('app')
			.controller('currentGameVictories', currentGameVictories)

	function currentGameVictories($rootScope) {
		console.log("currentGameVictories called");

		// view model
		var vm = this;

		// which position this view holds
		vm.playerIndex = null;
		vm.numberOfVictories = 0;
		vm.initWithGameIndex = registerPlayer;

		// private
		function registerPlayer(playerIndex) {
			vm.playerIndex = playerIndex;
			$rootScope.$on("Victory for player " + vm.playerIndex, function(event, data) {
				console.log("victory lala");
				console.trace();
				vm.numberOfVictories++;
			});
		}

	}

}();
