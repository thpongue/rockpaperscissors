module.exports = function() {
	'use strict';
	angular
		.module('app')
			.controller('selectRockPaperOrScissors', selectRockPaperOrScissors)

	function selectRockPaperOrScissors(currentGame, socket) {

		// view model
		var vm = this;
		var playerIndex;

		// constants
		vm.ROCK = 'ROCK';
		vm.PAPER = 'PAPER';
		vm.SCISSORS = 'SCISSORS';

		// in iterable form
		vm.choices = [vm.ROCK, vm.PAPER, vm.SCISSORS];

		// allow the user to change the value to specific values only
		vm.selectRock = function() {
			selection=vm.ROCK;
			socket.send(selection);
		}
		vm.selectPaper = function() {
			selection=vm.PAPER;
			socket.send(selection);
		}
		vm.selectScissors = function() {
			selection=vm.SCISSORS;
			socket.send(selection);
		}
		vm.isWinner = function() {
			return currentGame.isWinner(vm);
		}

		vm.isRock = isRock;
		vm.isPaper = isPaper;
		vm.isScissors = isScissors;
		vm.isUnset = isUnset;
		vm.initWithPlayerIndex = initWithPlayerIndex;
		vm.getPlayerIndex = getPlayerIndex;
		
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

		function initWithPlayerIndex(playerIndexParam) {
			playerIndex = playerIndexParam;

			// register this instance as a participant in the current game
			currentGame.registerPlayer(vm);

			// register this instance with the socket server
			socket.registerPlayer(vm);
		}

		function getPlayerIndex(playerIndex) {
			return playerIndex;
		}
	};

}();
