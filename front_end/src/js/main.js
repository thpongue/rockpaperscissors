require('angular');
// hack to make this accessible to angular - fix
window.io = require('socket.io-client');
require('./setup');
require('./services/currentGame.service');
require('./services/socket.service');
require('./select/selectRockPaperOrScissors.controller');
require('./select/selectRockPaperOrScissors.directive');
