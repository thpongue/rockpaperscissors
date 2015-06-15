describe('mvp version of rock paper scissors', function() {
	var browser2;
	var url = 'http://localhost:8001';
	
	beforeEach(function() {
		browser.get(url);
	});

	describe('should be partially functional when there is only one user', function() {
		it('should show icons for both players', function() {
			shouldSeeRockPaperAndScissorsButtons(browser, '#player1');
			shouldSeeRockPaperAndScissorsButtons(browser, '#player2');
		});

		it('should allow player 1 to select rock', function() {
			var player = '#player1';
			browser.element(by.css(player+' #rock')).click().then(
				shouldHighlightRock(browser, player)
			);
		});

		it('should allow player 1 to select paper', function() {
			var player = '#player1';
			browser.element(by.css(player+' #paper')).click().then(
				shouldHighlightPaper(browser, player)
			);
		});

		it('should allow player 1 to select scissors', function() {
			var player = '#player1';
			browser.element(by.css(player+' #scissors')).click().then(
				shouldHighlightScissors(browser, player)
			);
		});

		it('should not allow player 1 to select rock on behalf of player 2', function() {
			shouldHighlightNothing(browser, '#player1');
		});
	})


	describe('should treat seperate game id\'s as seperate games', function() {
		beforeEach(function() {
			// start a different game - this should not affect the game in the first browser
			browser.get(url).then(function() {
				browser2 = browser.forkNewDriverInstance(true); // true means use same url as browser
				browser2.get(url);
			});
		});

		it('should ignore selections made in other games', function() {
			browser.element(by.css('#player1 #rock')).click().then(function() {
				browser2.element(by.css('#player1 #scissors')).click().then(function() {
					browser.element(by.css('#player1 #rock')).getAttribute('class').then(function(player1Rock) {
						browser.element(by.css('#player1 #scissors')).getAttribute('class').then(function(player1Scissors) {
							expect(player1Rock).toMatch('user_selected');
							expect(player1Scissors).not.toMatch('user_selected');
						});
					});
				});
			});
		});
	});


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

		it('should show Player 1 as the winner and Player 2 as the loser if Player 1 selects "Rock" and Player 2 selects "Scissors"', function() {
			browser.element(by.css('#player1 #rock')).click().then(function() {
				browser2.element(by.css('#player2 #scissors')).click().then(function() {
					closeAllAlerts(function(){
						browser.element(by.css('#player1 #status')).getAttribute('class').then(function(player1Status) {
							browser2.element(by.css('#player2 #status')).getAttribute('class').then(function(player2Status) {
								expect(player1Status).toMatch('winner');
								expect(player2Status).toMatch('loser');
							});
						});
					});
				});
			});
		})

		it('should show Player 2 as the winner if Player 2 selects "Rock" and Player 1 selects "Scissors"', function() {
			browser.element(by.css('#player1 #scissors')).click().then(function() {
				browser2.element(by.css('#player2 #rock')).click().then(function() {
					closeAllAlerts(function() {
						browser.element(by.css('#player1 #status')).getAttribute('class').then(function(player1Status) {
							browser2.element(by.css('#player2 #status')).getAttribute('class').then(function(player2Status) {
								expect(player1Status).not.toMatch('winner');
								expect(player2Status).toMatch('winner');
							});
						});
					});
				});
			});
		})

		it('should show no-one as the winner if Player 1 selects "Rock" and Player 2 also selects "Rock"', function() {
			browser.element(by.css('#player1 #rock')).click().then(function() {
				browser2.element(by.css('#player2 #rock')).click().then(function() {
					closeAllAlerts(function() {
						browser.element(by.css('#player1 #status')).getAttribute('class').then(function(player1Status) {
							browser2.element(by.css('#player2 #status')).getAttribute('class').then(function(player2Status) {
								expect(player1Status).not.toMatch('winner');
								expect(player2Status).not.toMatch('winner');
							});
						});
					});
				});
			});
		});

		it('should show an alert when the user selects their choice after their opponent', function() {
			browser2.element(by.css('#player2 #rock')).click().then(function() {
				browser.element(by.css('#player1 #rock')).click().then(function() {
					browser.switchTo().alert().then(function(alertDialog) {
						expect(alertDialog.getText()).toEqual('Another game?');
						closeAllAlerts();
					});
				});
			});
		});
		
		it('should show an alert when the user selects their choice after their opponent', function() {
			browser2.element(by.css('#player2 #rock')).click().then(function() {
				browser.element(by.css('#player1 #rock')).click().then(function() {
					browser2.switchTo().alert().then(function(alertDialog) {
						expect(alertDialog.getText()).toEqual('Another game?');
						closeAllAlerts();
					});
				});
			});
		});
	});

	describe('should handle a new player joining after the original player has made their selection', function() {
		it('should pass other players selection on connect if already made', function() {
			browser.element(by.css('#player1 #rock')).click().then(function() {
				browser.getCurrentUrl().then(function(url) {
					browser2 = browser.forkNewDriverInstance(false);
					browser2.get(url).then(function() {
						browser2.element(by.css('#player1 #rock')).getAttribute('class').then(function(browser2RockClass) {
							expect(browser2RockClass).toMatch('user_selected');
						});
					});
				});
			});
		});
	});

	describe('should retain state if the user refreshes mid-game', function() {
		it('should remember player 1 state if you are player 1', function() {
			browser.element(by.css('#player1 #rock')).click().then(function() {
				browser.getCurrentUrl().then(function(url) {
					browser.get(url).then(function() {
						browser.element(by.css('#player1 #rock')).getAttribute('class').then(function(player1RockClass) {
							expect(player1RockClass).toMatch('user_selected');
							browser.element(by.css('#player2 #rock')).getAttribute('class').then(function(player2RockClass) {
								expect(player2RockClass).not.toMatch('user_selected');
							});
						});
					});	
				});
			});
		});
	});

	describe('should allow other players to join the game after other participants have selected', function() {
		it('should start with nothing selected (even on the same machine [shared cookies])', function() {
			browser.element(by.css('#player1 #rock')).click().then(function() {
				browser.getCurrentUrl().then(function(url) {
					browser2 = browser.forkNewDriverInstance(false);
					browser2.get(url).then(function() {
						browser2.element(by.css('#player2 #rock')).getAttribute('class').then(function(browser2RockClass) {
							browser2.element(by.css('#player2 #paper')).getAttribute('class').then(function(browser2PaperClass) {
								browser2.element(by.css('#player2 #scissors')).getAttribute('class').then(function(browser2ScissorsClass) {
									expect(browser2RockClass).not.toMatch('user_selected');		
									expect(browser2PaperClass).not.toMatch('user_selected');		
									expect(browser2ScissorsClass).not.toMatch('user_selected');		
								});
							});
						});
					});
				});
			});
		});
	});


	function shouldSeeRockPaperAndScissorsButtons(browser, player) {	
		expect(browser.element(by.css(player+' #rock')).isPresent()).toBe(true);
		expect(browser.element(by.css(player+' #paper')).isPresent()).toBe(true);
		expect(browser.element(by.css(player+' #scissors')).isPresent()).toBe(true);
	}

	function shouldHighlightRock(browser, player) {
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
		browser.element(by.css(player+' #rock')).getAttribute('class').then(function(rockClasses) {
			browser.element(by.css(player+' #paper')).getAttribute('class').then(function(paperClasses) {
				browser.element(by.css(player+' #scissors')).getAttribute('class').then(function(scissorsClasses) {
					shouldRockBeSelected ? expect(rockClasses).toMatch('user_selected') : expect(rockClasses).not.toMatch('user_selected');
					shouldPaperBeSelected ? expect(paperClasses).toMatch('user_selected') : expect(paperClasses).not.toMatch('user_selected');
					shouldScissorsBeSelected ? expect(scissorsClasses).toMatch('user_selected') : expect(scissorsClasses).not.toMatch('user_selected');
				});
			});
		});
	}

	function closeAllAlerts(promise) {
		return closeAlert(browser).then(closeAlert(browser2).then(promise && promise()));
	}

	function closeAlert(browser) {
		var alert;
	 	try {
			alert	= browser.switchTo().alert();
			return alert.accept();
		} catch(error) {
			return browser.sleep(0);
		}
	}

})

