module.exports = function() {
	'use strict';
	angular
		.module('app')
			.controller('selectRockPaperOrScissors', selectRockPaperOrScissors)

	function selectRockPaperOrScissors() {
		console.log("selectRockPaperOrScissors controller called");
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
		vm.selectRock = function() {
			vm.selection=vm.ROCK;
		}
		vm.selectPaper = function() {
			vm.selection=vm.PAPER;
		}
		vm.selectScissors = function() {
			vm.selection=vm.SCISSORS;
		}

		vm.isRock = isRock;
		vm.isPaper = isPaper;
		vm.isScissors = isScissors;
		
		// private
		function isRock() {
			return vm.selection == vm.ROCK;
		}

		function isPaper() {
			return vm.selection == vm.PAPER;
		}

		function isScissors() {
			return vm.selection == vm.SCISSORS;
		}
	};

}();
