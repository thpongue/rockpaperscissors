module.exports = function() {
	'use strict';
	angular
		.module('app')
			.directive('selectRockPaperScissorsDirective', selectRockPaperScissors)

	function selectRockPaperScissors() {
		console.log("selectRockPaperScissors called");
		return {
			templateUrl: 'partials/selectRockPaperScissors.html'
		}
	};

}();
