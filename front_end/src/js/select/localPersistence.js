module.exports = function() {
	'use strict';
	angular
		.module('app')
			.factory('localPersistence', localPersistence)

	function localPersistence($cookies) {
		return {
			set: function(key, value) {
				$cookies.putObject(key, value);
			},
			get: function(key) {
				return $cookies.getObject(key);
			}
		}
	}
}();
