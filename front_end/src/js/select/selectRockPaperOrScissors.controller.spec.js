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

	it('should register with socket once registered', function() {
		sut.initWithGameIndex(0);
		expect(mockSocket.registerPlayer).toHaveBeenCalledWith(sut);
	});

	it('should pass on isWinner request to current game', function() {
		sut.isWinner();
		expect(mockCurrentGame.isWinner).toHaveBeenCalledWith(sut);
	});

	it('should pass on selection to the socket when rock is selected if it wasn\'t previously', function() {
		sut.selectRock();
		expect(mockSocket.send).toHaveBeenCalledWith(sut.ROCK);
	});

	it('should pass on selection to the socket when paper is selected if it wasn\'t previously', function() {
		sut.selectPaper();
		expect(mockSocket.send).toHaveBeenCalledWith(sut.PAPER);
	});

	it('should pass on selection to the socket when scissors is selected if it wasn\'t previously', function() {
		sut.selectScissors();
		expect(mockSocket.send).toHaveBeenCalledWith(sut.SCISSORS);
	});
	
	it('should not pass on selection to the socket when rock is selected if it was already set to rock', function() {
		sut.selectRock();
		mockSocket.send.calls.reset();
		sut.selectRock();
		expect(mockSocket.send).not.toHaveBeenCalledWith(sut.ROCK);
	});

	it('should not pass on selection to the socket when paper is selected if it was already set to paper', function() {
		sut.selectPaper();
		mockSocket.send.calls.reset();
		sut.selectPaper();
		expect(mockSocket.send).not.toHaveBeenCalledWith(sut.PAPER);
	});

	it('should not pass on selection to the socket when scissors is selected if it was already set to scissors', function() {
		sut.selectScissors();
		mockSocket.send.calls.reset();
		sut.selectScissors();
		expect(mockSocket.send).not.toHaveBeenCalledWith(sut.SCISSORS);
	});

	it('should be able to force a socket update', function() {
		sut.selectScissors();
		mockSocket.send.calls.reset();
		sut.socketUpdate();
		expect(mockSocket.send).toHaveBeenCalledWith(sut.SCISSORS);
	});

	it('should pass on selection to the local persistence object when rock is selected', function() {
		var gameId = "gameId";
		var playerIndex = 0;
		var gameIndex = 0;
		sut.registerPlayer(gameId, playerIndex);
		sut.initWithGameIndex(gameIndex);
		sut.selectRock();
		expect(mockLocalPersistence.set.calls.argsFor(0)).toEqual(["gameId", gameId]);
		expect(mockLocalPersistence.set.calls.argsFor(1)).toEqual(["gameIndex", gameIndex]);
		expect(mockLocalPersistence.set.calls.argsFor(2)).toEqual(["selection", sut.ROCK]);
	});

	it('should pass on selection to the local persistence object when paper is selected', function() {
		var gameId = "gameId";
		var playerIndex = 0;
		var gameIndex = 0;
		sut.registerPlayer(gameId, playerIndex);
		sut.initWithGameIndex(gameIndex);
		sut.selectPaper();
		expect(mockLocalPersistence.set.calls.argsFor(0)).toEqual(["gameId", gameId]);
		expect(mockLocalPersistence.set.calls.argsFor(1)).toEqual(["gameIndex", gameIndex]);
		expect(mockLocalPersistence.set.calls.argsFor(2)).toEqual(["selection", sut.PAPER]);
	});

	it('should pass on selection to the local persistence object when rock is selected', function() {
		var gameId = "gameId";
		var playerIndex = 0;
		var gameIndex = 0;
		sut.registerPlayer(gameId, playerIndex);
		sut.initWithGameIndex(gameIndex);
		sut.selectScissors();
		expect(mockLocalPersistence.set.calls.argsFor(0)).toEqual(["gameId", gameId]);
		expect(mockLocalPersistence.set.calls.argsFor(1)).toEqual(["gameIndex", gameIndex]);
		expect(mockLocalPersistence.set.calls.argsFor(2)).toEqual(["selection", sut.SCISSORS]);
	});

	it('should look for persisted game state once registered', function() {
		sut.registerPlayer(gameId, "ignored");
		expect(mockLocalPersistence.get).toHaveBeenCalledWith("gameId");
		expect(mockLocalPersistence.get).toHaveBeenCalledWith("gameIndex");
		expect(mockLocalPersistence.get).toHaveBeenCalledWith("selection");
	});

	it('should tell the current game to check if the game is complete once rock has been selected (if not already set to Rock)', function() {
		sut.registerPlayer(gameId, "ignored");
		mockLocalPersistence.setMockedSelection(null);
		sut.selectRock();
		expect(mockCurrentGame.isComplete).toHaveBeenCalled();
	});

	it('should tell the current game to check if the game is complete once paper has been selected (if not already set to Paper)', function() {
		sut.registerPlayer(gameId, "ignored");
		mockLocalPersistence.setMockedSelection(null);
		sut.selectPaper();
		expect(mockCurrentGame.isComplete).toHaveBeenCalled();
	});

	it('should tell the current game to check if the game is complete once scissors has been selected (if not already set to Scissors)', function() {
		sut.registerPlayer(gameId, "ignored");
		mockLocalPersistence.setMockedSelection(null);
		sut.selectScissors();
		expect(mockCurrentGame.isComplete).toHaveBeenCalled();
	});

	it('should not tell the current game to check if the game is complete once rock has been selected if already set to Rock', function() {
		sut.registerPlayer(gameId, "ignored");
		mockLocalPersistence.setMockedSelection(sut.ROCK);
		sut.selectRock();
		expect(mockCurrentGame.isComplete).toHaveBeenCalled();
	});

	it('should not tell the current game to check if the game is complete once paper has been selected if already set to Paper', function() {
		sut.registerPlayer(gameId, "ignored");
		mockLocalPersistence.setMockedSelection(sut.PAPER);
		sut.selectPaper();
		expect(mockCurrentGame.isComplete).toHaveBeenCalled();
	});

	it('should not tell the current game to check if the game is complete once scissors has been selected if already set to Scissors', function() {
		sut.registerPlayer(gameId, "ignored");
		mockLocalPersistence.setMockedSelection(sut.SCISSORS);
		sut.selectScissors();
		expect(mockCurrentGame.isComplete).toHaveBeenCalled();
	});

	it('should not tell the current game to check if the game is complete is nothing has been selected', function() {
		sut.registerPlayer(gameId, "ignored");
		expect(mockCurrentGame.isComplete).not.toHaveBeenCalled();
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
	var gameId = "game id for mock local persistence";
	
	function setupMockCurrentGame() {
		mockCurrentGame = {
			registerPlayer: function(player) {
				// do nothing
			},
			isWinner: function(player) {
				// do nothing
			},
			isComplete: function() {
				// do nothing
			}
		}
		
		// set up spies so we can verify that the methods were called	
    spyOn(mockCurrentGame, 'registerPlayer').and.callThrough();	
    spyOn(mockCurrentGame, 'isWinner').and.callThrough();	
    spyOn(mockCurrentGame, 'isComplete').and.callThrough();	
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
			}
		}

		// set up spies so we can verify that the methods were called	
    spyOn(mockSocket, 'registerPlayer').and.callThrough();	
    spyOn(mockSocket, 'send').and.callThrough();	
	}

	function setupMockLocalPersistence() {
		mockLocalPersistence = {
			mockedSelection: null,
			set: function(key, value) {
				// do nothing
			},
			get: function(key) {
				if (key=="gameId") {
					return gameId;
				} else if (key=="selection") {
					return this.mockedSelection;
				}
			},
			setMockedSelection: function(value) {
				this.mockedSelection = value;
			}
		}
		
		// set up spies so we can verify that the methods were called	
    spyOn(mockLocalPersistence, 'set').and.callThrough();	
    spyOn(mockLocalPersistence, 'get').and.callThrough();	
	}

});
