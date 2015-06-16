
var express = require('express');
var path = require('path');
var fs = require('fs');
var tilelive = require('tilelive');
require("mbtiles").registerProtocols(tilelive);
var Vector = require("tilelive-vector");
Vector.registerProtocols(tilelive);

var port = process.env.PORT || 6543;
process.env.UV_THREADPOOL_SIZE = Math.ceil(Math.max(4, require('os').cpus().length * 1.5));
var data_dir = path.resolve(__dirname, 'data');
console.log('data_dir:',data_dir);

var app = express();
app.set('port', port);

//list registered protocols
console.log(Object.keys(tilelive.protocols));

//HACK: implement dummy list function
Vector.tm2z.list = function(dir, callback){ return callback(null, {});};
Vector.list = function(dir, callback){ return callback(null, {});};

var styles = ['color', 'black'];

tilelive.list(data_dir, function(err, sources){

	if(err) return console.log('list err:', err);

	Object.keys(sources).forEach(function(key, idx){

		var src_name = key;
		var src_data = sources[src_name];
		console.log(src_name, src_data);

		styles.forEach(function(style){
			var xml = fs.readFileSync(path.join(data_dir, 'wien/mbs-style-' + style +'.tm2/project.xml')).toString("utf-8");
			new Vector.Backend({
				uri: src_data
			}, function(err, backend){
				new Vector({
					xml:xml,
					backend:backend
				}, function(err, tile_store){
					console.log('before app.get');
					var url_path = '/tiles/' + src_name + '/'+ style + '/:z/:x/:y';
					console.log('url_path', url_path);
					app.get(url_path, function(req, res){ return getTile(tile_store, req.params.z, req.params.x, req.params.y, res);});
				});
			});
		});
	});
});


function getTile(tilestore, z, x, y, res) {
	console.log(z, x, y);
	tilestore.getTile(z, x, y, function(err, tile, headers) {
		if (err) {
			console.log(err);
			return res.status(404).send("Tile rendering error: " + err + "\n");
		}
		res.set(headers);
		return res.send(tile);
	});
};


console.log('serving on port: ' + port);
app.listen(port);
