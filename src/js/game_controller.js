module.exports = function() {
	'use strict';
	angular
		.module('app')
			.controller('game_controller', game_controller)

	function game_controller() {
		// view model
		var vm = this;
		vm.choices = ['ROCK', 'PAPER', 'SCISSORS'];
		vm.select = select;
		
		// private
		function select(choice) {
			console.log("choice = " + choice);
			vm.choice=choice;
		}
	};

}();
