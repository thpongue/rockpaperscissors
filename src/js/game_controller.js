module.exports = function() {
	'use strict';
	angular
		.module('app')
			.controller('game_controller', game_controller)

	function game_controller() {
		// view model
		var vm = this;

		// constants
		vm.ROCK = 'ROCK';
		vm.PAPER = 'PAPER';
		vm.SCISSORS = 'SCISSORS';

		// in iterable form
		vm.choices = [vm.ROCK, vm.PAPER, vm.SCISSORS];

		// current value
		vm.selection = null;
		
		// allow the user to change the value
		vm.select = select;
		
		// private
		function select(selection) {
			console.log("choice = " + choice);
			vm.selection=selection;
		}
	};

}();
