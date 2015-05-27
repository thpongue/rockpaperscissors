describe('mvp version of rock paper scissors', function() {
	var browser2;
	
	beforeEach(function() {
		browser.get('http://localhost:8001');
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

//	it('should be fully functional when there are two users', function() {
//		beforeEach(function() {
//			// deal with the redirect by getting the url and calling it on the other instance
//
//			browser.get('http://localhost:8001').then(function() {
//				browser.getCurrentUrl().then(function(url) {
//					browser2 = browser.forkNewDriverInstance(false);
//					browser2.get(url);
//				});
//			});
//
//		});
//
//		it('should show icons for both players', function() {
//			shouldSeeRockPaperAndScissorsButtons(browser2, "#player1");
//			shouldSeeRockPaperAndScissorsButtons(browser2, "#player2");
//		});
//
//
//		it('should allow player 1 to select rock', function() {
//		});
//
//		it('should not allow player 1 to select rock on behalf of player 2', function() {
//		});
//
//		it('should allow player 2 to select paper', function() {
//		});
//
//		it('should not allow player 2 to select paper on behalf of player 1', function() {
//		});
//	})

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

//	beforeEach(function() {
//		browser.get('http://localhost:8001');
//
//		// get redirected url
//		browser.getCurrentUrl().then(function(url) {
//			console.log("--------------------");
//			console.log("url = " + url);	
//			console.log("--------------------");
//			browser2 = browser.forkNewDriverInstance();
//			browser2.get(url);
//		});
//
//	});
//
//	it('should have 2 browsers', function() {
//		console.log("/nbrowser");
//		console.log(browser);
//		console.log("/nbrowser2");
//		console.log(browser2);
//		expect(browser2.not.toBeNull());
//		expect(browser.not.toBeNull());
//
//		element(browser2.by.css(player+' #rock')).click().then(function() {
//			console.log("clicked");
//		});
//	});
//	describe('should work for player 1', function() {
//		choices("#player1");
//		highlight("#player1");
//	});
//
//	describe('should work for player 2', function() {
//		choices("#player2");
//		highlight("#player2");
//	});
//
//	function choices(player) {	
//		it('should see a choice of Rock, Paper and Scissors', function() {
//			expect(element(by.css(player+' #rock')).isPresent()).toBe(true);
//			expect(element(by.css(player+' #paper')).isPresent()).toBe(true);
//			expect(element(by.css(player+' #scissors')).isPresent()).toBe(true);
//		});
//	}
//
//	function highlight(player) {	
//		it('should highlight Rock when it is clicked and all others should be unhighlighted', function() {
//			var rockClasses, paperClasses, scissorsClasses;
//			element(by.css(player+' #rock')).click().then(function() {
//				element(by.css(player+' #rock')).getAttribute('class').then(function(classes) {
//					rockClasses = classes;
//					element(by.css(player+' #paper')).getAttribute('class').then(function(classes) {
//						paperClasses = classes;
//						element(by.css(player+' #scissors')).getAttribute('class').then(function(classes) {
//							scissorsClasses = classes;
//
//							expect(rockClasses).toMatch('user_selected');
//							expect(paperClasses).not.toMatch('user_selected');
//							expect(scissorsClasses).not.toMatch('user_selected');
//						});
//					});
//				});
//			});
//		});
//	}
//
//	it('should show Player 1 as the winner if Player 1 selects "Rock" and Player 2 selects "Scissors"', function() {
//		var player1Status;
//		element(by.css('#player1 #rock')).click().then(function() {
//			element(by.css('#player2 #scissors')).click().then(function() {
//				element(by.css('#player1 #status')).getAttribute('class').then(function(classes) {
//					player1Status = classes;
//					expect(player1Status).toMatch('winner');
//				});
//			});
//		});
//	})
//
//	it('should not show Player 1 as the winner if Player 1 selects "Rock" and Player 2 hasn\'t selected yet', function() {
//		var player1Status;
//		element(by.css('#player1 #rock')).click().then(function() {
//			element(by.css('#player1 #status')).getAttribute('class').then(function(classes) {
//				player1Status = classes;
//				expect(player1Status).not.toMatch('winner');
//			});
//		});
//	})
//
//	it('should show Player 1 as the winner if Player 1 selects "Rock" and Player 2 also selects "Rock"', function() {
//		var player1Status;
//		element(by.css('#player1 #rock')).click().then(function() {
//			element(by.css('#player2 #rock')).click().then(function() {
//				element(by.css('#player1 #status')).getAttribute('class').then(function(classes) {
//					player1Status = classes;
//					expect(player1Status).not.toMatch('winner');
//				});
//			});
//		});
//	})

})

