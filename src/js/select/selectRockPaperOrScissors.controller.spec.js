describe('should mediate between the view and the app', function() {

	it('should default to no item selected', function() {
		expect(sut.selection).toBeNull();
	});
	
	it('should enable the user to select \'rock\'', function() {
		sut.selectRock();
		expect(sut.selection).toBe(sut.ROCK);
	});

	it('should enable the user to select \'paper\'', function() {
		sut.selectPaper();
		expect(sut.selection).toBe(sut.PAPER);
	});

	it('should enable the user to select \'scissors\'', function() {
		sut.selectScissors();
		expect(sut.selection).toBe(sut.SCISSORS);
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
