describe('should allow the selection of rock, paper and scissors', function() {

	it('should default to no item selected', function() {
		expect(sut.isRock()).toBe(false);
		expect(sut.isPaper()).toBe(false);
		expect(sut.isScissors()).toBe(false);
		expect(sut.isUnset()).toBe(true);
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

	it('should register with current game', function() {
		expect(mockCurrentGame.registerPlayer).toHaveBeenCalledWith(sut);
	});

	it('should pass on isWinner request to current game', function() {
		sut.isWinner();
		expect(mockCurrentGame.isWinner).toHaveBeenCalledWith(sut);
	});
	
	// ----------------------------------
	// setup
	// ----------------------------------

	var sut = null;
	var mockCurrentGame;
	
	beforeEach(setupMocks);
	beforeEach(initSut);

	function setupMocks() {
		module('app');
		mockCurrentGame = {
			registerPlayer: function(player) {
				// do nothing
			},
			isWinner: function(player) {
				// do nothing
			}
		}
		
    spyOn(mockCurrentGame, 'registerPlayer').and.callThrough();	
    spyOn(mockCurrentGame, 'isWinner').and.callThrough();	

		module(function($provide) {
			$provide.value('currentGame', mockCurrentGame);
		});
	}
	
	function initSut() {
		inject(function ($controller, currentGame) {
			sut = $controller('selectRockPaperOrScissors', currentGame);
		})
	}
});
