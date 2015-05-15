module.exports = function() {
	'use strict';
	angular
		.module('app')
			.controller('selectRockPaperOrScissors', selectRockPaperOrScissors)

	function selectRockPaperOrScissors(currentGame) {
		// view model
		var vm = this;

		// register this instance as a participant in the current game
		currentGame.registerPlayer(vm);

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
		vm.isWinner = function() {
			return currentGame.isWinner(vm);
		}

		vm.isRock = isRock;
		vm.isPaper = isPaper;
		vm.isScissors = isScissors;
		vm.isUnset = isUnset;
		
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

		function isUnset() {
			return selection == null;
		}
	};

}();
