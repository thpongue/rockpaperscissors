module.exports = function() {
	'use strict';
	angular
		.module('app')
			.factory('scorecard', scorecard)

	function scorecard() {
		return {};
	};

}();
