module.exports = function() {
	'use strict';
	angular
		.module('app')
			.controller('selectRockPaperOrScissors', selectRockPaperOrScissors)

	function selectRockPaperOrScissors(currentGame, socket, $scope) {

		// view model
		var vm = this;

		// TODO : make these private
		// which position this view holds
		vm.gameIndex = null;

		// which position this player is allowed to control
		vm.playerIndex = null;

		// private
		vm.selection = null;

		// constants
		vm.ROCK = 'ROCK';
		vm.PAPER = 'PAPER';
		vm.SCISSORS = 'SCISSORS';

		// in iterable form
		vm.choices = [vm.ROCK, vm.PAPER, vm.SCISSORS];

		// allow the user to change the value to specific values only
		vm.selectRock = selectRock;
		vm.selectPaper = selectPaper;
		vm.selectScissors = selectScissors;
		vm.isWinner = isWinner;
		vm.isRock = isRock;
		vm.isPaper = isPaper;
		vm.isScissors = isScissors;
		vm.isUnset = isUnset;
		vm.initWithGameIndex = initWithGameIndex;
		vm.initWithPlayerIndex = initWithPlayerIndex;
		vm.isEnabled = isEnabled;
		vm.forceDigestHack = forceDigestHack;	
		vm.serverError = serverError;
		vm.socketUpdate = socketUpdate;


		// private

		function selectRock() {
			vm.selection=vm.ROCK;
			socketUpdate();
		}
		function selectPaper() {
			vm.selection=vm.PAPER;
			socketUpdate();
		}
		function selectScissors() {
			vm.selection=vm.SCISSORS;
			socketUpdate();
		}
		function isWinner() {
			console.log("isWinner called");
			return currentGame.isWinner(vm);
		}
		
		function isRock() {
			return vm.selection == vm.ROCK;
		}

		function isPaper() {
			return vm.selection == vm.PAPER;
		}

		function isScissors() {
			return vm.selection == vm.SCISSORS;
		}

		function isUnset() {
			return vm.selection == null;
		}

		function initWithGameIndex(gameIndexParam) {
			vm.gameIndex = gameIndexParam;

			// register this instance with the socket server
			socket.registerPlayer(vm);

			console.log("game index received: " + vm.gameIndex);
		}

		function initWithPlayerIndex(playerIndexParam) {
			vm.playerIndex = playerIndexParam;

			// register this instance as a participant in the current game
			currentGame.registerPlayer(vm);

			console.log("player index received: " + vm.playerIndex);
		}

		function isEnabled() {
			return vm.gameIndex == vm.playerIndex;
		}
		
		function forceDigestHack() {
			$scope.$digest();
		}

		function serverError() {
			console.log("server error");
		}

		function socketUpdate() {
			console.log("sending socket update");
			socket.send(vm.selection);
		}
	};

}();
