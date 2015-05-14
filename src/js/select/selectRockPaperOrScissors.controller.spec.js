describe('should mediate between the view and the app', function() {

	it('should default to no item selected', function() {
		expect(sut.isRock()).toBe(false);
		expect(sut.isPaper()).toBe(false);
		expect(sut.isScissors()).toBe(false);
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
			sut = $controller('selectRockPaperOrScissors');
		})
	}
});
