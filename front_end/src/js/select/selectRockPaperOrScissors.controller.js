module.exports = function() {
	'use strict';
	angular
		.module('app')
			.controller('selectRockPaperOrScissors', selectRockPaperOrScissors)

	function selectRockPaperOrScissors(currentGame, socket, localPersistence, $scope) {

		// view model
		var vm = this;

		// TODO : make these private
		// which position this view holds
		vm.gameIndex = null;

		// which position this player is allowed to control
		vm.playerIndex = null;

		// unique key assigned to this game (yes it clashes with gameIndex...)
		vm.gameId = null;

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
		vm.setSelection = setSelection;
		vm.isWinner = isWinner;
		vm.isDraw = isDraw;
		vm.isNoResult = isNoResult;
		vm.isRock = isRock;
		vm.isPaper = isPaper;
		vm.isScissors = isScissors;
		vm.isUnset = isUnset;
		vm.initWithGameIndex = initWithGameIndex;
		vm.registerPlayer = registerPlayer;
		vm.isEnabled = isEnabled;
		vm.forceDigestHack = forceDigestHack;	
		vm.serverError = serverError;
		vm.socketUpdate = socketUpdate;


		// private

		function selectRock() {
			setSelection(vm.ROCK);
		}

		function selectPaper() {
			setSelection(vm.PAPER);
		}

		function selectScissors() {
			setSelection(vm.SCISSORS);
		}

		function setSelection(selection) {
			if (vm.selection!=selection) {
				vm.selection=selection;

				// this is some pretty bad code - basically the user or the socket can call setSelection but we only want to so these things if the user has done it. This needs to be changed
				if (isEnabled()) {
					socketUpdate();
					localPersistenceUpdate();
				}

				currentGame.isComplete();
			}
		}
		
		function isNoResult() {
			return currentGame.isNoResult(vm);
		}

		function isWinner() {
			return currentGame.isWinner(vm);
		}

		function isDraw() {
			return currentGame.isDraw(vm);
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
		}

		function registerPlayer(gameId, playerIndex) {
			vm.gameId = gameId;
			vm.playerIndex = playerIndex;

			// register this instance as a participant in the current game
			currentGame.registerPlayer(vm);

			localPersistenceRetrieve();
		}

		function isEnabled() {
			return vm.gameIndex == vm.playerIndex;
		}
		
		function forceDigestHack() {
			$scope.$digest();
		}

		function serverError() {
			console.log('server error');
		}

		function socketUpdate() {
			socket.send(vm.selection);
		}

		function localPersistenceRetrieve() {
			var gameId = localPersistence.get("gameId");
			var gameIndex = localPersistence.get("gameIndex");
			var selection = localPersistence.get("selection");
			console.log("this controller - " + vm.gameId + " " + vm.gameIndex + " " + vm.selection);
			console.log("from cookie - " + gameId + " " + gameIndex + " " + selection);
			if (gameId && selection && gameId==vm.gameId && gameIndex==vm.gameIndex) {
				console.log("setting value!");
				vm.selection = selection;
				forceDigestHack();
			}
		}

		function localPersistenceUpdate() {
			localPersistence.set("gameId", vm.gameId);
			localPersistence.set("gameIndex", vm.gameIndex);
			localPersistence.set("selection", vm.selection);
		}
	};

}();
