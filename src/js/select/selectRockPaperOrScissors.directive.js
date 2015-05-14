module.exports = function() {
	'use strict';
	angular
		.module('app')
			.directive('selectRockPaperOrScissors', select)

	function select() {
		return {
			templateUrl: 'partials/selectRockPaperOrScissors.html',
			controller: 'selectRockPaperOrScissors',
			controllerAs: 'ctrl'
		}
	};

}();
