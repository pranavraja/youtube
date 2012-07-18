
var shell = require('./shell');
var path = require('path');

// Starts wget `url` -O `path`, to save the resource at `url` to `path`.
var download = function (url, filePath, callback) {
	return path.existsSync(filePath) ? callback() : shell.exec(['wget', shell.escapeCmd(url), '-O', shell.escapeCmd(filePath)], callback);
};

exports.download = download;
