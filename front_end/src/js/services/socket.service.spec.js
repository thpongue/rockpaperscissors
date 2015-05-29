describe('should communicate between users', function() {

	it('should connect to the correct socket url', function() {
		expect(mockSocket.url).toBe("http://localhost:3000");
	});

	it('should send a string on to the socket', function() {
		sut.send(sut.ROCK);
		expect(mockSocket.emit).toHaveBeenCalledWith("game update", sut.ROCK);
	});

	it('should cause an update on all registered views when an game update is received', function() {
		sut.registerPlayer(mockPlayer1);
		sut.registerPlayer(mockPlayer2);

		var updateObj = {index:0, value:sut.ROCK};
		mockSocket.fakeAGameUpdateEmit(updateObj);
		expect(mockPlayer1.forceDigestHack).toHaveBeenCalled();
		expect(mockPlayer2.forceDigestHack).toHaveBeenCalled();
	});

	it('should cause an update on all registered views when a position update is received', function() {
		sut.registerPlayer(mockPlayer1);
		sut.registerPlayer(mockPlayer2);

		var position = 0;
		mockSocket.fakeAPositionUpdateEmit(position);
		expect(mockPlayer1.initWithPlayerIndex).toHaveBeenCalledWith(position);
		expect(mockPlayer2.initWithPlayerIndex).toHaveBeenCalledWith(position);
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
			positionUpdateCallback: null,
			url: null,
			on: function(eventName, callback) {
				if (eventName == "game update") {
					this.gameUpdateCallback = callback;
				} else {
					this.positionUpdateCallback = callback;
				}
			},
			emit: function(eventName, value) {
			},
			fakeAGameUpdateEmit: function(obj) {
				this.gameUpdateCallback(obj);
			},
			fakeAPositionUpdateEmit: function(obj) {
				this.positionUpdateCallback(obj);
			}
		};

    spyOn(mockSocket, 'emit').and.callThrough();	
		
		module(function ($provide) {
			$provide.constant('io', mockIo);
		});
	}

	function setupMockPlayer1() {
		mockPlayer1 = {
			selection: null,
			forceDigestHack: function() {
				// do nothing
			},
			initWithPlayerIndex: function() {
				// do nothing
			}
		}
    spyOn(mockPlayer1, 'forceDigestHack').and.callThrough();	
    spyOn(mockPlayer1, 'initWithPlayerIndex').and.callThrough();	
	}

	function setupMockPlayer2() {
		mockPlayer2 = {
			selection: null,
			forceDigestHack: function() {
				// do nothing
			},
			initWithPlayerIndex: function() {
				// do nothing
			}
		}
    spyOn(mockPlayer2, 'forceDigestHack').and.callThrough();	
    spyOn(mockPlayer2, 'initWithPlayerIndex').and.callThrough();	
	}

});
