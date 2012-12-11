
var request = require('request');

var conversioncloud = 'http://www.vidtomp3.com/cc/conversioncloud.php';
var youtubewatchurl = 'http://youtube.com/watch?v=';
var link = function (videoId, callback) {
	request({ url: conversioncloud, method: 'POST', form: { 'mediaurl': youtubewatchurl + videoId }}, function (err, response, body) {
		if (err) return callback(err);
		var deets = JSON.parse(body.slice(1, body.length-1));
		var statusurl = deets.statusurl+'&json';
		request({ url: statusurl }, function (err, response, body) {
			if (err) return callback(err);
			body = body.replace(/^\s+|\s+$/g, '');
			var deets = JSON.parse(body.slice(1, body.length-1));
			var downloadurl = deets.downloadurl;
			callback(null, downloadurl, deets.file);
		});
	});
};
exports.link = link;
