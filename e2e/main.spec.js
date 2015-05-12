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
})

