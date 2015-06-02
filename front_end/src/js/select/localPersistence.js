module.exports = function() {
	'use strict';
	angular
		.module('app')
			.controller('localPersistence', localPersistence)

	function localPersistence($cookies) {
	}
}();
