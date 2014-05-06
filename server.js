var express = require('express');
var reload = require('reload');
var http = require('http');
var app = express();

app.set('port', process.env.PORT || 1337)
app.use(express.static(__dirname + '/public'));

var server = http.createServer(app)
reload(server, app);
server.listen(app.get('port'), function(){
  console.log("Web server listening on port " + app.get('port'));
});