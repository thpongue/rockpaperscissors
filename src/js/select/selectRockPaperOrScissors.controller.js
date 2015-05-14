module.exports = function() {
	'use strict';
	angular
		.module('app')
			.controller('selectRockPaperOrScissors', selectRockPaperOrScissors)

	function selectRockPaperOrScissors(scorecard) {
		// view model
		var vm = this;

		// constants
		vm.ROCK = 'ROCK';
		vm.PAPER = 'PAPER';
		vm.SCISSORS = 'SCISSORS';

		// in iterable form
		vm.choices = [vm.ROCK, vm.PAPER, vm.SCISSORS];

		// allow the user to change the value to specific values only
		vm.selectRock = function() {
			selection=vm.ROCK;
		}
		vm.selectPaper = function() {
			selection=vm.PAPER;
		}
		vm.selectScissors = function() {
			selection=vm.SCISSORS;
		}

		vm.isRock = isRock;
		vm.isPaper = isPaper;
		vm.isScissors = isScissors;
		
		// private
		var selection = null;
		
		function isRock() {
			return selection == vm.ROCK;
		}

		function isPaper() {
			return selection == vm.PAPER;
		}

		function isScissors() {
			return selection == vm.SCISSORS;
		}
	};

}();
