describe('should allow the selection of rock, paper and scissors', function() {

	it('should register the users position and game id', function() {
		sut.initWithGameIndex('some gameid', 0);
	});

	it('should update victory count on win', function() {
		sut.initWithGameIndex(0);
		mockScope.$emit("Victory for player 0");
		expect(sut.numberOfVictories).toBe(1);
		mockScope.$emit("Victory for player 0");
		expect(sut.numberOfVictories).toBe(2);
	});

	// ----------------------------------
	// setup
	// ----------------------------------

	var sut = null;
	var mockScope = null;

	beforeEach(loadModule);
	beforeEach(setupMocks);
	beforeEach(initSut);

	function loadModule() {	
		angular.mock.module('app');
	}

	function setupMocks() {
		setupMockScope();
	}

	function setupMockScope() {
		inject(function ($rootScope) {
			mockScope = $rootScope.$new();
		})
	}

	function initSut() {
		inject(function ($controller) {
			sut = $controller('currentGameVictories', {$rootScope: mockScope});
		})
	}

});
