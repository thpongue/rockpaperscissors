require('angular');
require('angular-cookies');
window.io = require('socket.io-client');
require('./setup');
require('./constants.js');
require('./services/currentGame.service');
require('./services/socket.service');
require('./select/selectRockPaperOrScissors.controller');
require('./select/selectRockPaperOrScissors.directive');
