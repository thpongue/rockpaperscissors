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
		
		// allow the user to change the value to specific values only
		vm.selectRock = selectRock;
		vm.selectPaper = selectPaper;
		vm.selectScissors = selectScissors;
		
		// private
		function selectRock() {
			vm.selection=vm.ROCK;
		}

		function selectPaper() {
			vm.selection=vm.PAPER;
		}

		function selectScissors() {
			vm.selection=vm.SCISSORS;
		}
	};

}();
