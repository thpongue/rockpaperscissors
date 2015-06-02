module.exports = function() {
	'use strict';
	angular
		.module('app')
			.factory('localPersistence', localPersistence)

	function localPersistence($cookies) {
		return {
			set: function(key, value) {
				$cookies.put(key, value);
			},
			get: function(key) {
				$cookies.get(key);
			}
		}
	}
}();
