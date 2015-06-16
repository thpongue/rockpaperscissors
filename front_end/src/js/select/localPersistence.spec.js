describe('should store the state of the current game so that the user doesn\'t lose their data if they refresh the page', function() {

	var hardCodedReturnValue = "rockPaperOrScissors";

	it('should pass on set and get to the cookie', function() {
		var anyKey = "i can be anything";
		var anyValue = "i can also be anything";
		sut.set(anyKey, anyValue);
		expect(mockCookies.putObject).toHaveBeenCalledWith(anyKey, anyValue);
		var ret = sut.get(anyKey);
		expect(mockCookies.getObject).toHaveBeenCalledWith(anyKey);

		// there must be a better way than this?
		expect(ret).toBe(hardCodedReturnValue);
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
			putObject: function(key, anyValue) {
				// do nothing
			},
			getObject: function(key) {
				return hardCodedReturnValue;
			}
		}

    spyOn(mockCookies, 'putObject').and.callThrough();	
    spyOn(mockCookies, 'getObject').and.callThrough();	
		
		module(function ($provide) {
			$provide.constant('$cookies', mockCookies);
		});
	}

});
