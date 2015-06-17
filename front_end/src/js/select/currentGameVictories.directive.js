module.exports = function() {
	'use strict';
	angular
		.module('app')
			.directive('currentGameVictories', select)

	function select() {
		return {
			templateUrl: 'partials/currentGameVictories.html',
			controller: 'currentGameVictories',
			controllerAs: 'ctrl',
			bindToController: true,
			scope: {player_index:'@'},
			link: function(scope, element, attrs) {
				scope.ctrl.initWithGameIndex(attrs.playerIndex);
			}
		}
	};

}();
