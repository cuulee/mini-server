
var express = require('express');
var path = require('path');
var fs = require('fs');
var tilelive = require('tilelive');
require("mbtiles").registerProtocols(tilelive);
require('tilelive-bridge').registerProtocols(tilelive);
require('tilelive-vector').registerProtocols(tilelive);
//require('tilelive-file').registerProtocols(tilelive);
//require('tilelive-mapnik').registerProtocols(tilelive);

process.env.UV_THREADPOOL_SIZE = Math.ceil(Math.max(4, require('os').cpus().length * 1.5));

var port = process.env.PORT || 6543;
var app = express();


app.set('port', port);

app.get('/', function (req, res) {
	res.send('TODO list resources. Use http://localhost:' + port + '/tiles/{resource}/{z}/{x}/{y}');
});

function list_data(dir){
	console.log(dir);
	tilelive.list(dir, function(err, sources){
		console.log('err:', err);
		console.log('sources:', sources);
	});
}

app.get('/tiles/:resource/:style/:z/:x/:y', function (req, res) {

	var resource = req.params.resource;
	var style = req.params.style;
	var x = +req.params.x;
	var y = +req.params.y;
	var z = +req.params.z;

	//res.send(resource + '/' + style + '/' +z + '/' + x + '/' + y);

	//tilelive.load('bridge:///path/to/file.xml', function (err, source) {

	var data_dir = '/Users/bergw/_Projekte/MapBox/_Applikationen/mini-server/data/';
	//list_data(data_dir);
	//list_data(data_dir+'wien');
	console.log(Object.keys(tilelive.protocols));

/*	tilelive.list(data_dir, function(err, sources){
		console.log('err:', err);
		console.log('sources:', sources);
	});
*/

	var opts = {
		xml: fs.readFileSync(data_dir + 'wien/mbs-style-color.tm2/project.xml').toString("utf-8"),
		source: 'mbtiles:///Users/bergw/_Projekte/MapBox/_Applikationen/mini-server/data/wien.mbtiles',

	};

	//tilelive.load(opts, function (err, source) {
	tilelive.load(opts.source, function (err, source) {
		if (err) { console.log(err); return res.send(err);}

		// Interface is in XYZ/Google coordinates.
		// Use `y = (1 << z) - 1 - y` to flip TMS coordinates.
		source.getTile(0, 0, 0, function (err, tile, headers) {
			// `err` is an error object when generation failed, otherwise null.
			// `tile` contains the compressed image file as a Buffer
			// `headers` is a hash with HTTP headers for the image.
			if (err) { console.log(err); return res.send(err);}
			console.log(headers);
			res.set(headers);
			return res.send(tile);
		});

		// The `.getGrid` is implemented accordingly.
	});
});


console.log('serving on port: ' + port);
app.listen(port);
