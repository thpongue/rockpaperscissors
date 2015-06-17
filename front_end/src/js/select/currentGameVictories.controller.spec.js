describe('should allow the selection of rock, paper and scissors', function() {

	it('should register the users position and game id', function() {
		sut.registerPlayer('some gameid', 0);
	});

	// ----------------------------------
	// setup
	// ----------------------------------

	var sut = null;

	beforeEach(loadModule);
	beforeEach(initSut);

	function loadModule() {	
		angular.mock.module('app');
	}

	function initSut() {
		inject(function ($controller) {
			sut = $controller('currentGameVictories');
		})
	}

});
