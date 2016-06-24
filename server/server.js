/**
 * Created by NathanBriscoe on 6/24/16.
 */
var express = require('express');
var app = express();

app.use(express.static("server/public"));

app.get('/', function(request, response){
    response.sendFile(__dirname + '/public/views/index.html');
});

var server = app.listen(3000, function(request, response){
    var port = server.address().port;
    console.log('Listening to port', port);
});
