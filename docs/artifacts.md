- [] a simple, attractive tool for inviting a friend to play rock paper scissors on the internet and then playing them
	- [] mvp: 2 player version
		- [x] background
			- [x] background - red/blue background with white line divider
			- [x] header - 'player1' vs 'player2' hardcoded with 'Vs' in a circle in between
			- [x] footer - placeholder rockpaperscissors.io text until we add a logo
		- [x] basic selection of rock, paper or scissors - store result
			- [x] add "rock", "paper", "scissors" text
			- [x] make "rock", "paper", "scissors" text selectable by higlighting your choice
		- [x] duplicate player1 stuff into player 2 area
			- [x] externalise the game into one place since I'm repeating a lot of stuff
		- [x] basic game
			- [x] once both players have selected:
				- [x] show text showing "winner", "Loser" or "No winner" (for draw)
				- [x] show no text (winner, loser or draw) if there is no result
				- [x] bug: by default we always mark players as winners at the start
			- [x] bug: players on different urls seem to affect each other
			- [x] bug: on connect we need to tell all the clients to re-update the others about their state
			- [x] refreshing loses the current selection - store last selection in a cookie
			- [x] bug: getting the current selection from the cookie should take into account which player - currently any new player who joins also gets this value
			- [x] bug: cookies get overwritten by another game on the same machine. When both players have selected refresh the first one to select and her choice will be gone
		- [-] split into distinct games
			- [x] display a victories count
			- [x] bug: its only updating if the active user wins
			- [] persist victories in cookie to handle reload
				- [] issue: my e2e test isn't failing and it should! manually doing this correctly fails. Wierd :-(
			- [] "i want to play again" button once results are shown - if both players click it then state is reset
		- [] hide the other players choice until you've made yours
		- [] opponent status text
			- [] "you have no opponent - send them this link to start the game"
			- [] "your opponent has not yet chosen"
			- [] "your opponent has chosen"
			- [] "your opponent wants to play again"
		- [] on the side of the other player - when not connected have an overlay saying "no player connected - send them this url"
		- [] on the side of the other player - when they are connected have an overlay saying either "waiting for your opponent to choose" or "your opponent is waiting for you to choose"
		- [] live site
			- [x] domain name
			- [] read http://www.sitepoint.com/deploying-heroku-using-gulp-node-git/
			- [] set up http://rockpaperscissors.io.herokuapp.com/ and point rockpaperscissors.io to it
			- [] work out how I can get my subdirs to run their package.json on heroku
			- [] run a test build from scratch
			- [] point domain name to the heroku servers
			- [] set up MEAN hosting
			- [] set up email from domain
			- [] come up with a seperate production build where we're not using express in debug mode (or anything else)
			- [] error server event might go to all games - test
			- [] invite lu for a game!
	- [] stats
	- [] multi-game
		- [] show wins per player
		- [] the game complete popup should have a best of x option
			- [] best of 3
	- [] multiplayer
		- [] front end can pass the max number of players to the back-end
		- [] produce mocks for multiplayer ux - dealing with small screen and more than 2 users
		- [] if a third player turns up they need to know they're an observer
		- [] add basic overlay to welcome the user and explaining about needing an opponent - tell them to copy the url and send it to their opponent
			- [] have a READY! button which means that no new players are admitted
		- [] show connected / disconnected
		- [] if you're player 2 etc should you go on the RHS? Surely you get called player 2 but still sit in the same place?
		- [] stop invites once the the game is underway
			- [] need an observer status
	- [-] opponent view
		- [-] cta to invite a friend
			- don't let the user select their initial choice until they have an opponent
	- [] multiplayer error handling
	- [] multi game
		- [] for each game store the selection and output
		- [] total wins
	- [] search optimisation
		- decide if I need to avoid redirecting instantly due to googleyness or bad ux
	- [] invitation mechanism
	- [] design improvements
		- [] dotted white line dividing the 2
		- [] logo
		- [] font
		- [] icons for rock, paper and scissors
		- [] editable player names
		- [] choose a web font
	- [] design-complete
		- [] proper graphics
	- [] remote multiplayer
		- [] invitation system for playing across different machines
	- [] best of x
		- [] show history
		- [] show winner over x
	- [] merchandise
	- [] analyse stats and blog about it
	- [] blog on related searches eg
		- [] "rock paper scissors rules"
		- [] "rock paper scissors variations"
		- [] "rock paper scissors dynamite"
		- ... see bottom of search for rock paper scissors
	- [] unsorted
		- have e2e running on watch in phantom
		- sass messing up wrecks watch and js sometimes does it too - dunno why though
		- consider symlinking back end and front end into one location
		- full build isn't closing
		- A/B test whether people will put their friends email addresses in - this gives us the ability to send cool, branded invites
		- is there a better way to make socket.io accesible to Angular than making it global?
		- handle unrecognised game id's
		- my project shouldn't copy into back end but copy into its own folder
		- one-command watch from the root - maybe need to rename watch to front_end_watch and back_end_watch
		- find a unit testing DI syntax that I like and stick to it with all unit tests
		- use sinon? (this would also help the other stuff we're testing) or jasmine.createSpy
		- rename background to player or something - its not a background
		- improve naming in controller - game index and player index is a little unclear. Rename the game index to view index
		- naming is very confusing around registration
		- look at making the e2e tests more readable and with less repeated code
		- move localPersistence to services
		- repetition in unit tests makes them unwieldy - try to refactor them to remove duplication as I go (not as a seperate job at the end)
		- use something like this for the winner: http://photos4.meetupstatic.com/photos/event/e/0/7/b/global_438177467.jpeg
		- isWinner, isNoResult, isDraw could be a single value - this has become complicated
	- [] tech debt
		- back end testing is only covered by e2e tests
		- e2e tests should include testing for the recently fixed bug: have 2 players, both select RP or S, refresh the first player and the cookie hasn't stored the value
