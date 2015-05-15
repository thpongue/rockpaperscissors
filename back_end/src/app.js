var app = require('express')();

app.get('/', function (req, res) {
  res.send('I don\'t do anything yet!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});
