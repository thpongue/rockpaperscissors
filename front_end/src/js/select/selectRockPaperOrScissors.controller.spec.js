describe('should allow the selection of rock, paper and scissors', function() {

	it('should default to no item selected', function() {
		expect(sut.isRock()).toBe(false);
		expect(sut.isPaper()).toBe(false);
		expect(sut.isScissors()).toBe(false);
		expect(sut.isUnset()).toBe(true);
	});
	
	it('should enable the user to select \'rock\'', function() {
		sut.selectRock();
		expect(sut.isRock()).toBe(true);
	});

	it('should enable the user to select \'paper\'', function() {
		sut.selectPaper();
		expect(sut.isPaper()).toBe(true);
	});

	it('should enable the user to select \'scissors\'', function() {
		sut.selectScissors();
		expect(sut.isScissors()).toBe(true);
	});

	it('should register with current game once a player index has been received', function() {
		sut.registerPlayer('gameid', 0);
		expect(mockCurrentGame.registerPlayer).toHaveBeenCalledWith(sut);
	});

	it('should register with socket once a game index has been received', function() {
		sut.initWithGameIndex(0);
		expect(mockSocket.registerPlayer).toHaveBeenCalledWith(sut);
	});

	it('should pass on isWinner request to current game', function() {
		sut.isWinner();
		expect(mockCurrentGame.isWinner).toHaveBeenCalledWith(sut);
	});

	it('should pass on selection to choice to the socket when rock is selected', function() {
		sut.selectRock();
		expect(mockSocket.send).toHaveBeenCalledWith(sut.ROCK);
	});

	it('should pass on selection to choice to the socket when paper is selected', function() {
		sut.selectPaper();
		expect(mockSocket.send).toHaveBeenCalledWith(sut.PAPER);
	});

	it('should pass on selection to choice to the socket when rock is selected', function() {
		sut.selectScissors();
		expect(mockSocket.send).toHaveBeenCalledWith(sut.SCISSORS);
	});

	it('should be able to force a socket update', function() {
		sut.selectScissors();
		mockSocket.send.calls.reset();
		sut.socketUpdate();
		expect(mockSocket.send).toHaveBeenCalledWith(sut.SCISSORS);
	});

	it('should pass on selection to choice to the local persistence object when rock is selected', function() {
		var gameId = "gameId";
		sut.registerPlayer(gameId, 0);
		sut.selectRock();
		expect(mockLocalPersistence.set).toHaveBeenCalledWith(gameId, sut.ROCK);
	});

	it('should pass on selection to choice to the local persistence object when paper is selected', function() {
		var gameId = "gameId";
		sut.registerPlayer(gameId, 0);
		sut.selectPaper();
		expect(mockLocalPersistence.set).toHaveBeenCalledWith(gameId, sut.PAPER);
	});

	it('should pass on selection to choice to the local persistence object when rock is selected', function() {
		var gameId = "gameId";
		sut.registerPlayer(gameId, 0);
		sut.selectScissors();
		expect(mockLocalPersistence.set).toHaveBeenCalledWith(gameId, sut.SCISSORS);
	});

	
	// ----------------------------------
	// setup
	// ----------------------------------

	var sut = null;
	var mockCurrentGame;
	var mockScope;
	var mockSocket;
	var mockLocalPersistence;
	
	beforeEach(loadModule);
	beforeEach(setupMocks);
	beforeEach(initSut);

	function loadModule() {	
		angular.mock.module('app');
	}

	function setupMocks() {
		setupMockCurrentGame();
		setupMockSocket();
		setupMockScope();
		setupMockLocalPersistence();
	}
	
	function initSut() {
		inject(function ($controller) {
			sut = $controller('selectRockPaperOrScissors', {currentGame: mockCurrentGame, socket: mockSocket, localPersistence: mockLocalPersistence, $scope: mockScope});
		})
	}


	// private
	
	function setupMockCurrentGame() {
		mockCurrentGame = {
			registerPlayer: function(player) {
				// do nothing
			},
			isWinner: function(player) {
				// do nothing
			}
		}
		
		// set up spies so we can verify that the methods were called	
    spyOn(mockCurrentGame, 'registerPlayer').and.callThrough();	
    spyOn(mockCurrentGame, 'isWinner').and.callThrough();	
	}

	function setupMockScope() {
		inject(function ($rootScope) {
			mockScope = $rootScope.$new();
		})
	}

	function setupMockSocket() {
		mockSocket = {
			registerPlayer: function(player) {
				// do nothing
			},
			send: function(msg) {
				// do nothing
			},

		}

		// set up spies so we can verify that the methods were called	
    spyOn(mockSocket, 'registerPlayer').and.callThrough();	
    spyOn(mockSocket, 'send').and.callThrough();	
	}

	function setupMockLocalPersistence() {
		mockLocalPersistence = {
			set: function(key, value) {
				// do nothing
			},
			get: function(key) {
				// do nothing
			}
		}
		
		// set up spies so we can verify that the methods were called	
    spyOn(mockLocalPersistence, 'set').and.callThrough();	
    spyOn(mockLocalPersistence, 'get').and.callThrough();	
	}

});
