describe('should store the state of the current game so that the user doesn\'t lose their data if they refresh the page', function() {

	it('should pass on set and get to the cookie', function() {
		var gameId = "1234-5678-1234-5678";
		var value = "rock";
		sut.set(gameId, value);
		expect(mockCookies.put).toHaveBeenCalledWith(gameId, value);
		sut.get(gameId);
		expect(mockCookies.get).toHaveBeenCalledWith(gameId);
	});
	

	// ----------------------------------
	// setup
	// ----------------------------------

	var sut = null;
	var mockCookies;
	
	beforeEach(loadModule);
	beforeEach(setupMocks);
	beforeEach(initSut);

	function loadModule() {
		module('app');
	}

	function setupMocks() {
		setupMockCookies();
	}
	
	function initSut() {
		inject(function (localPersistence) {
			sut = localPersistence;
		})
	}

	function setupMockCookies() {
		mockCookies = {
			put: function(key, value) {
				// do nothing
			},
			get: function(key) {
				// do nothing
			},
		}

    spyOn(mockCookies, 'put').and.callThrough();	
    spyOn(mockCookies, 'get').and.callThrough();	
		
		// TODO: do I have to use the cookies provider (prob same syntax as the controller provider)
		module(function ($provide) {
			$provide.constant('$cookies', mockCookies);
		});
	}

});
