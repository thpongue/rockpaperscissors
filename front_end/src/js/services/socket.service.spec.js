describe('should communicate between users', function() {

	it('should connect to the correct socket url', function() {
		expect(mockSocket.url).toBe('http://localhost:3000');
	});

	it('should pass on the string on to the socket when any data is sent', function() {
		sut.send("ROCK");
		expect(mockSocket.emit).toHaveBeenCalledWith('game update', "ROCK");
	});

	it('should set the selection on the relevant view if an update is received', function() {
		sut.registerPlayer(mockPlayer1);
		sut.registerPlayer(mockPlayer2);

		var updateObj = {index:0, value:"ROCK"};
		mockSocket.fakeAGameUpdateEmit(updateObj); 
		// index 1 means player 1
		expect(mockPlayer1.selection).toBe("ROCK");
	});

	it('should cause an update on all registered views when a game update event is received', function() {
		sut.registerPlayer(mockPlayer1);
		sut.registerPlayer(mockPlayer2);

		var updateObj = {index:0, value:"ROCK"};
		mockSocket.fakeAGameUpdateEmit(updateObj);
		expect(mockPlayer1.forceDigestHack).toHaveBeenCalled();
		expect(mockPlayer2.forceDigestHack).toHaveBeenCalled();
	});

	it('should cause an update on all registered views when a register event is received', function() {
		sut.registerPlayer(mockPlayer1);
		sut.registerPlayer(mockPlayer2);
		
		var gameId = "1234-5678-1234-5678";
		var position = 0;
		mockSocket.fakeARegisterPlayerEmit(gameId, position);
		expect(mockPlayer1.registerPlayer).toHaveBeenCalledWith(gameId, position);
		expect(mockPlayer2.registerPlayer).toHaveBeenCalledWith(gameId, position);
	});

	it('should recognise an error event', function() {
		sut.registerPlayer(mockPlayer1);
		sut.registerPlayer(mockPlayer2);

		mockSocket.fakeAnErrorEmit();
		expect(mockPlayer1.serverError).toHaveBeenCalled();
		expect(mockPlayer2.serverError).toHaveBeenCalled();
	});

	it('should update all players when another player connects', function() {
		sut.registerPlayer(mockPlayer1);
		sut.registerPlayer(mockPlayer2);

		mockSocket.fakeAnotherPlayerConnecting();
		expect(mockPlayer1.socketUpdate).toHaveBeenCalled();
		expect(mockPlayer1.socketUpdate).toHaveBeenCalled();
	});

	
	// ----------------------------------
	// setup
	// ----------------------------------

	var sut = null;
	var mockIo;
	var mockSocket;
	var mockPlayer1;
	var mockPlayer2;
	
	beforeEach(loadModule);
	beforeEach(setupMocks);
	beforeEach(initSut);

	function loadModule() {
		module('app');
	}

	function setupMocks() {
		setupMockIo();
		setupMockPlayer1();
		setupMockPlayer2();
	}
	
	function initSut() {
		inject(function (socket) {
			sut = socket;
		})
	}

	function setupMockIo() {
		mockIo = function(url) {
			mockSocket.url = url;
			return mockSocket;
		}
		mockSocket = {
			gameUpdateCallback: null,
			registerPlayerCallback: null,
			errorCallback: null,
			anotherPlayerConnecting: null,
			url: null,
			on: function(eventName, callback) {
				if (eventName == 'game update') {
					this.gameUpdateCallback = callback;
				} else if (eventName=='register player') {
					this.registerPlayerCallback = callback;
				} else if (eventName=='server error') {
					this.errorCallback = callback;
				} else if (eventName=='another player connect') {
					this.anotherPlayerConnecting = callback;
				}
			},
			emit: function(eventName, value) {
			},
			fakeAGameUpdateEmit: function(obj) {
				this.gameUpdateCallback(obj);
			},
			fakeARegisterPlayerEmit: function(gameId, position) {
				this.registerPlayerCallback(gameId, position);
			},
			fakeAnErrorEmit: function() {
				this.errorCallback();
			},
			fakeAnotherPlayerConnecting: function() {
				this.anotherPlayerConnecting();
			}
		};

    spyOn(mockSocket, 'emit').and.callThrough();	
		
		module(function ($provide) {
			$provide.constant('io', mockIo);
		});
	}

	function MockPlayer(enabled) {
			this.forceDigestHack = function() {
				// do nothing
			};
			this.registerPlayer = function() {
				// do nothing
			};
			this.serverError = function() {
				// do nothing
			};
			this.socketUpdate = function() {
				// do nothing
			},
			this.isEnabled = function() {
				return enabled;
			},
			this.selection = null;
	}

	function setUpSpies(mockPlayer) {
    spyOn(mockPlayer, 'forceDigestHack').and.callThrough();	
    spyOn(mockPlayer, 'registerPlayer').and.callThrough();	
    spyOn(mockPlayer, 'serverError').and.callThrough();	
    spyOn(mockPlayer, 'socketUpdate').and.callThrough();	
    spyOn(mockPlayer, 'isEnabled').and.callThrough();	
	}

	function setupMockPlayer1() {
		mockPlayer1 = new MockPlayer(true);
		setUpSpies(mockPlayer1);
	}

	function setupMockPlayer2() {
		mockPlayer2 = new MockPlayer(false);
		setUpSpies(mockPlayer2);
	}

});
