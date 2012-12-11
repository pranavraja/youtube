#!/usr/bin/env node
var downloader = require('../lib/downloader');
var linkfinder = require('../lib/linkfinder');
var path = require('path');
var argv = require('optimist').argv;
var stdin = require('stdin');

var WGET_PROGRESS = /(\d+%).+ (\w+s)/;

var writeProgress = function (match) {
	process.stderr.write(match[1] + ' (' + match[2] + ' remaining)            \r'); 
};

stdin(function (line) {
    // line is of the format:
    // http://downloadurl.mp3<TAB>filename.mp3
    var fragments = line.toString().replace(/\n/g,'').split('\t');
    var url = fragments[0];
    var output_file = path.join(argv.d || '.', fragments[1]);
    if (path.existsSync(output_file) && !argv.force) {
        // Don't re-download unless --force is passed
        process.stderr.write('File already exists, use --force to overwrite\n');
        return;
    }
    var dload = downloader.download(url, output_file, new Function);
    process.stderr.write('downloading to ' + output_file + '\n');
    dload.stderr.on('data', function (chunk) { 
        var m = chunk.match(WGET_PROGRESS);
        m && writeProgress(m);
    });
});
