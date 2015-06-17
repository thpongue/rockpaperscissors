describe('should compare game instances and determine win, lose or draw', function() {

	it('should allow objects to register', function() {
		var mockRockPaperScissors = {};
		sut.registerPlayer(mockRockPaperScissors);
	});

	it('should know that rock beats scissors', function() {
		var mockRockPaperScissors1 = getMockRock();
		var mockRockPaperScissors2 = getMockScissors();
		sut.registerPlayer(mockRockPaperScissors1);
		sut.registerPlayer(mockRockPaperScissors2);
		expect(sut.isWinner(mockRockPaperScissors1)).toBe(true);
		expect(sut.isDraw(mockRockPaperScissors1)).toBe(false);
		expect(sut.isNoResult(mockRockPaperScissors1)).toBe(false);
	});

	it('should know that scissors beats paper', function() {
		var mockRockPaperScissors1 = getMockScissors();
		var mockRockPaperScissors2 = getMockPaper();
		sut.registerPlayer(mockRockPaperScissors1);
		sut.registerPlayer(mockRockPaperScissors2);
		expect(sut.isWinner(mockRockPaperScissors1)).toBe(true);
		expect(sut.isDraw(mockRockPaperScissors1)).toBe(false);
		expect(sut.isNoResult(mockRockPaperScissors1)).toBe(false);
	});
	
	it('should know that paper beats rock', function() {
		var mockRockPaperScissors1 = getMockPaper();
		var mockRockPaperScissors2 = getMockRock();
		sut.registerPlayer(mockRockPaperScissors1);
		sut.registerPlayer(mockRockPaperScissors2);
		expect(sut.isWinner(mockRockPaperScissors1)).toBe(true);
		expect(sut.isDraw(mockRockPaperScissors1)).toBe(false);
		expect(sut.isNoResult(mockRockPaperScissors1)).toBe(false);
	});

	it('should know that both values need to be set to have a result', function() {
		var mockRockPaperScissors1 = getMockUnset();
		var mockRockPaperScissors2 = getMockUnset();
		sut.registerPlayer(mockRockPaperScissors1);
		sut.registerPlayer(mockRockPaperScissors2);
		expect(sut.isWinner(mockRockPaperScissors1)).toBe(false);
		expect(sut.isDraw(mockRockPaperScissors1)).toBe(false);
		expect(sut.isNoResult(mockRockPaperScissors1)).toBe(true);
	});

	it('should know that one player means there is no result', function() {
		var mockRockPaperScissors1 = getMockUnset();
		sut.registerPlayer(mockRockPaperScissors1);
		expect(sut.isWinner(mockRockPaperScissors1)).toBe(false);
		expect(sut.isDraw(mockRockPaperScissors1)).toBe(false);
		expect(sut.isNoResult(mockRockPaperScissors1)).toBe(true);
	});

	it('should know that both values as rock means a draw', function() {
		var mockRockPaperScissors1 = getMockRock();
		var mockRockPaperScissors2 = getMockRock();
		sut.registerPlayer(mockRockPaperScissors1);
		sut.registerPlayer(mockRockPaperScissors2);
		expect(sut.isWinner(mockRockPaperScissors1)).toBe(false);
		expect(sut.isWinner(mockRockPaperScissors2)).toBe(false);
		expect(sut.isDraw(mockRockPaperScissors1)).toBe(true);
		expect(sut.isDraw(mockRockPaperScissors2)).toBe(true);
		expect(sut.isNoResult(mockRockPaperScissors1)).toBe(false);
		expect(sut.isNoResult(mockRockPaperScissors2)).toBe(false);
	});
	
	it('should know that both values as paper means a draw', function() {
		var mockRockPaperScissors1 = getMockPaper();
		var mockRockPaperScissors2 = getMockPaper();
		sut.registerPlayer(mockRockPaperScissors1);
		sut.registerPlayer(mockRockPaperScissors2);
		expect(sut.isWinner(mockRockPaperScissors1)).toBe(false);
		expect(sut.isWinner(mockRockPaperScissors2)).toBe(false);
		expect(sut.isDraw(mockRockPaperScissors1)).toBe(true);
		expect(sut.isDraw(mockRockPaperScissors2)).toBe(true);
		expect(sut.isNoResult(mockRockPaperScissors1)).toBe(false);
		expect(sut.isNoResult(mockRockPaperScissors2)).toBe(false);
	});
	
	it('should know that both values as scissors means a draw', function() {
		var mockRockPaperScissors1 = getMockScissors();
		var mockRockPaperScissors2 = getMockScissors();
		sut.registerPlayer(mockRockPaperScissors1);
		sut.registerPlayer(mockRockPaperScissors2);
		expect(sut.isWinner(mockRockPaperScissors1)).toBe(false);
		expect(sut.isWinner(mockRockPaperScissors2)).toBe(false);
		expect(sut.isDraw(mockRockPaperScissors1)).toBe(true);
		expect(sut.isDraw(mockRockPaperScissors2)).toBe(true);
		expect(sut.isNoResult(mockRockPaperScissors1)).toBe(false);
		expect(sut.isNoResult(mockRockPaperScissors2)).toBe(false);
	});

	it('should know that both values unset means no result', function() {
		var mockRockPaperScissors1 = getMockUnset();
		var mockRockPaperScissors2 = getMockUnset();
		sut.registerPlayer(mockRockPaperScissors1);
		sut.registerPlayer(mockRockPaperScissors2);
		expect(sut.isWinner(mockRockPaperScissors1)).toBe(false);
		expect(sut.isWinner(mockRockPaperScissors2)).toBe(false);
		expect(sut.isDraw(mockRockPaperScissors1)).toBe(false);
		expect(sut.isDraw(mockRockPaperScissors2)).toBe(false);
		expect(sut.isNoResult(mockRockPaperScissors1)).toBe(true);
		expect(sut.isNoResult(mockRockPaperScissors2)).toBe(true);
	});


	// ----------------------------------
	// setup
	// ----------------------------------

	var sut = null;
	
	beforeEach(loadModule);
	beforeEach(initSut);

	function loadModule() {
		module('app');
	}

	function initSut() {
		inject(function (currentGame) {
			sut = currentGame;
		})
	}

	function getMockRock() {
		return getMockRockPaperScissors(true, false, false);
	}

	function getMockPaper() {
		return getMockRockPaperScissors(false, true, false);
	}

	function getMockScissors() {
		return getMockRockPaperScissors(false, false, true);
	}
	
	function getMockUnset() {
		return getMockRockPaperScissors(false, false, false);
	}
	
	function getMockRockPaperScissors(rock, paper, scissors) {
		return {
			isRock: function() {
				return rock;
			},
			isPaper: function() {
				return paper;
			},
			isScissors: function() {
				return scissors;
			},
			isUnset: function() {
				return !rock && !paper && !scissors;
			}
		}
	}
});
