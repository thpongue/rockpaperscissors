require('angular');
// tmp whilst we play with the io object
window.io = require('socket.io-client');
require('./setup');
require('./services/currentGame.service');
require('./services/socket.service');
require('./select/selectRockPaperOrScissors.controller');
require('./select/selectRockPaperOrScissors.directive');