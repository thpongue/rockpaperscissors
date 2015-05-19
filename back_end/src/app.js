var express = require('express');
var app = express();
app.use(express.static('build'));

//app.get('/', function (req, res) {
//	res.sendFile(__dirname+'/index.html');
//});

var server = app.listen(8001, function () {
  var host = server.address().address;
  var port = server.address().port;
});
