describe('should mediate between the view and the app', function() {

	it('should default to no item selected', function() {
		expect(sut.selection).toBeNull();
	});
	
	xit('should enable the user to select \'rock\'', function() {
		
	});

	xit('should enable the user to select \'paper\'', function() {
		
	});

	xit('should enable the user to select \'scissors\'', function() {
		
	});

	xit('should not enable the user to select anything expect \'rock\', \'paper\' or  \'scissors\' eg \'earwax\'', function() {
		
	});
	
	// ----------------------------------
	// setup
	// ----------------------------------

	var sut = null;
	
	beforeEach(setupMocks);
	beforeEach(initSut);

	function setupMocks() {
		module('app');
	}
	
	function initSut() {
		inject(function ($controller) {
			sut = $controller('game_controller');
		})
	}
});
