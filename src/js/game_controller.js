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
		vm.selectRock = function() {
			vm.selection=vm.ROCK;
		}
		vm.selectPaper = function() {
			vm.selection=vm.PAPER;
		}
		vm.selectScissors = function() {
			vm.selection=vm.SCISSORS;
		}

		vm.isRock = function() {
			return vm.selection == vm.ROCK;
		}

		vm.isPaper = function() {
			return vm.selection == vm.PAPER;
		}

		vm.isScissors = function() {
			return vm.selection == vm.SCISSORS;
		}
	};

}();
