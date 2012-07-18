
var downloader = require('../lib/downloader');
var linkfinder = require('../lib/linkfinder');
var path = require('path');

var WGET_PROGRESS = /(\d+%).+ (\w+s)/;

var writeProgress = function (match) {
	process.stderr.write(match[1] + ' (' + match[2] + ' remaining)            \r'); 
};

if (!module.parent) {
    var query = process.argv[2];
    var directory = process.argv[3];
    if (!query || !directory) {
        console.warn('Example usage: node ' + __filename + ' "Michael Buble - Sway" ~/Music/download/');
        process.exit();
    }
    linkfinder.find(query, function (error, url) {
        if (error) throw error;
        var filename = path.join(directory, query + '.mp3');
        console.log('downloading to',filename);
        var dload = downloader.download(url, filename, new Function);
        if (!dload) return;
		// wget prints out percentages somewhere in stderr, let's capture those
		dload.stderr.on('data', function (chunk) { 
			var m = chunk.match(WGET_PROGRESS);
			m && writeProgress(m);
		});
    });
}
