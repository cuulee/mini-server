
var express = require('express');
var path = require('path');

var port = process.env.PORT || 6543;
var app = express();


app.set('port', port);

app.get('/', function (req, res) {
	res.send('TODO list resources. Use http://localhost:' + port + '/tiles/{resource}/{z}/{x}/{y}');
});

app.get('/tiles/:resource/:style/:z/:x/:y', function (req, res) {

	var resource = req.params.resource;
	var style = req.params.style;
	var x = +req.params.x;
	var y = +req.params.y;
	var z = +req.params.z;

	res.send(resource + '/' + style + '/' +z + '/' + x + '/' + y);
});


console.log('serving on port: ' + port);
app.listen(port);
