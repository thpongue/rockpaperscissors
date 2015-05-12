describe('mvp version of rock paper scissors', function() {
	beforeEach(function() {
		browser.get('http://localhost:8001');
	});

	it('should see a choice of Rock, Paper and Scissors x 2', function() {
		expect(element(by.css('#player1 #rock')).isPresent()).toBe(true);
		expect(element(by.css('#player1 #paper')).isPresent()).toBe(true);
		expect(element(by.css('#player1 #scissors')).isPresent()).toBe(true);
		expect(element(by.css('#player2 #rock')).isPresent()).toBe(true);
		expect(element(by.css('#player2 #paper')).isPresent()).toBe(true);
		expect(element(by.css('#player2 #scissors')).isPresent()).toBe(true);
	});
	
	it('Rock should highlight when clicked and all others should be unhighlighted', function() {
		var rockClasses, paperClasses, scissorsClasses;
		element(by.css('#player1 #rock')).click().then(function() {
			element(by.css('#player1 #rock')).getAttribute('class').then(function(classes) {
				rockClasses = classes;
				element(by.css('#player1 #paper')).getAttribute('class').then(function(classes) {
					paperClasses = classes;
					element(by.css('#player1 #scissors')).getAttribute('class').then(function(classes) {
						scissorsClasses = classes;

						expect(rockClasses).toMatch('selected');
						expect(rockClasses).toMatch('unselected');
						expect(rockClasses).toMatch('unselected');
					});
				});
			});
		});
	});
})

