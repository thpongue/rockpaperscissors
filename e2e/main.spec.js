describe('mvp version of rock paper scissors', function() {
	var browser2;
	var url = 'http://localhost:8001';
	
	beforeEach(function() {
		browser.get(url);
	});

	describe('should be partially functional when there is only one user', function() {
		it('should show icons for both players', function() {
			shouldSeeRockPaperAndScissorsButtons(browser, "#player1");
			shouldSeeRockPaperAndScissorsButtons(browser, "#player2");
		});

		it('should allow player 1 to select rock', function() {
			var player = "#player1";
			browser.element(by.css(player+' #rock')).click().then(
				shouldHighlightRock(browser, player)
			);
		});

		it('should allow player 1 to select paper', function() {
			var player = "#player1";
			browser.element(by.css(player+' #paper')).click().then(
				shouldHighlightPaper(browser, player)
			);
		});

		it('should allow player 1 to select scissors', function() {
			var player = "#player1";
			browser.element(by.css(player+' #scissors')).click().then(
				shouldHighlightScissors(browser, player)
			);
		});

		it('should not allow player 1 to select rock on behalf of player 2', function() {
			shouldHighlightNothing(browser, "#player1");
		});
	})

	describe('should be fully functional when there are two users', function() {
		beforeEach(function() {
			// deal with the redirect by getting the url and calling it on the other instance
			browser.get(url).then(function() {
				browser.getCurrentUrl().then(function(url) {
					browser2 = browser.forkNewDriverInstance(false);
					browser2.get(url);
				});
			});
		});

		it('should show Player 1 as the winner if Player 1 selects "Rock" and Player 2 selects "Scissors"', function() {
			var player1Status;
			var player2Status;
			browser.element(by.css('#player1 #rock')).click().then(function() {
				browser2.element(by.css('#player2 #scissors')).click().then(function() {
					browser.element(by.css('#player1 #status')).getAttribute('class').then(function(classes) {
						player1Status = classes;
						browser2.element(by.css('#player2 #status')).getAttribute('class').then(function(classes) {
							player2Status = classes;
							expect(player1Status).toMatch('winner');
							expect(player2Status).not.toMatch('winner');
						});
					});
				});
			});
		})

		it('should show Player 2 as the winner if Player 2 selects "Rock" and Player 1 selects "Scissors"', function() {
			var player1Status;
			var player2Status;
			browser.element(by.css('#player1 #scissors')).click().then(function() {
				browser2.element(by.css('#player2 #rock')).click().then(function() {
					browser.element(by.css('#player1 #status')).getAttribute('class').then(function(classes) {
						player1Status = classes;
						browser2.element(by.css('#player2 #status')).getAttribute('class').then(function(classes) {
							player2Status = classes;
							expect(player1Status).not.toMatch('winner');
							expect(player2Status).toMatch('winner');
						});
					});
				});
			});
		})

		it('should show no-one as the winner if Player 1 selects "Rock" and Player 2 also selects "Rock"', function() {
			var player1Status;
			var player2Status;
			browser.element(by.css('#player1 #rock')).click().then(function() {
				browser2.element(by.css('#player2 #rock')).click().then(function() {
					browser.element(by.css('#player1 #status')).getAttribute('class').then(function(classes) {
						player1Status = classes;
						browser2.element(by.css('#player2 #status')).getAttribute('class').then(function(classes) {
							player2Status = classes;
							expect(player1Status).not.toMatch('winner');
							expect(player2Status).not.toMatch('winner');
						});
					});
				});
			});
		})

	});

	function shouldSeeRockPaperAndScissorsButtons(browser, player) {	
		expect(browser.element(by.css(player+' #rock')).isPresent()).toBe(true);
		expect(browser.element(by.css(player+' #paper')).isPresent()).toBe(true);
		expect(browser.element(by.css(player+' #scissors')).isPresent()).toBe(true);
	}

	function shouldHighlightRock(browser, player) {
		console.log("shouldHighlightRock = " + shouldHighlightRock);
		console.log("browser = " + browser);
		console.log("player = " + player);
		shouldHighlightExpectedButton(browser, player, true, false, false);
	}

	function shouldHighlightPaper(browser, player) {
		shouldHighlightExpectedButton(browser, player, false, true, false);
	}

	function shouldHighlightScissors(browser, player) {
		shouldHighlightExpectedButton(browser, player, false, false, true);
	}

	function shouldHighlightNothing(browser, player) {
		shouldHighlightExpectedButton(browser, player, false, false, false);
	}

	function shouldHighlightExpectedButton(browser, player, shouldRockBeSelected, shouldPaperBeSelected, shouldScissorsBeSelected) {
		var rockClasses, paperClasses, scissorsClasses;
		browser.element(by.css(player+' #rock')).getAttribute('class').then(function(classes) {
			rockClasses = classes;
			browser.element(by.css(player+' #paper')).getAttribute('class').then(function(classes) {
				paperClasses = classes;
				browser.element(by.css(player+' #scissors')).getAttribute('class').then(function(classes) {
					scissorsClasses = classes;

					shouldRockBeSelected ? expect(rockClasses).toMatch('user_selected') : expect(rockClasses).not.toMatch('user_selected');
					shouldPaperBeSelected ? expect(paperClasses).toMatch('user_selected') : expect(paperClasses).not.toMatch('user_selected');
					shouldScissorsBeSelected ? expect(scissorsClasses).toMatch('user_selected') : expect(scissorsClasses).not.toMatch('user_selected');
				});
			});
		});
	}

})

