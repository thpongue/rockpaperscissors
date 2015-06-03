describe('should store the state of the current game so that the user doesn\'t lose their data if they refresh the page', function() {

	var hardCodedReturnValue = "rockPaperOrScissors";

	it('should pass on set and get to the cookie', function() {
		var anyKey = "i can be anything";
		var anyValue = "i can also be anything";
		sut.set(anyKey, anyValue);
		expect(mockCookies.put).toHaveBeenCalledWith(anyKey, anyValue);
		var ret = sut.get(anyKey);
		expect(mockCookies.get).toHaveBeenCalledWith(anyKey);

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
			put: function(key, anyValue) {
				// do nothing
			},
			get: function(key) {
				return hardCodedReturnValue;
			}
		}

    spyOn(mockCookies, 'put').and.callThrough();	
    spyOn(mockCookies, 'get').and.callThrough();	
		
		// TODO: do I have to use the cookies provider (prob same syntax as the controller provider)
		module(function ($provide) {
			$provide.constant('$cookies', mockCookies);
		});
	}

});
