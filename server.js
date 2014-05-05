var express = require('express');
var http = require('http');
var path = require('path');
var reload = require('reload');
var morgan  = require('morgan');
var app = express();
var publicDir = path.join(__dirname, 'public');
var bodyParser = require("body-parser");

app.set('port', process.env.PORT || 3000)
app.use(morgan());
app.use(bodyParser());

app.get('/', function(req, res) {
  res.sendfile(path.join(publicDir, 'index.html'))
})

var server = http.createServer(app)
reload(server, app);
server.listen(app.get('port'), function(){
  console.log("Web server listening on port " + app.get('port'));
});