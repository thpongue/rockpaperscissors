describe('should communicate between users', function() {

	it('should connect to the right url', function() {
		expect(mockSocket.url).toBe("http://localhost:3000");
	});

//	it('should register for game update events', function() {
//		expect(mockIo.on).toHaveBeenCalledWith("game update");
//	});
	
	// ----------------------------------
	// setup
	// ----------------------------------

	var sut = null;
	var mockIo;
	var mockSocket;
	
	beforeEach(loadModule);
	beforeEach(setupMocks);
	beforeEach(initSut);

	function loadModule() {
		module('app');
	}

	function setupMocks() {
		setupMockIo();
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
			url: null,
			on: function(eventName, callback) {
			},
			emit: function(eventName) {
			}
		};
		
		module(function ($provide) {
			$provide.constant('io', mockIo);
		});

	}

});
