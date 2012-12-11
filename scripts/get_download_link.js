#!/usr/bin/env node
var linkfinder = require('../lib/linkfinder');
var readline = require('readline');
var argv = require('optimist').argv; 

var rl = readline.createInterface(process.stdin, process.stdout);
rl.on('line', function (line) {
    line = line.replace(/\s+$/,'');
    detailsfunc = line.indexOf('http://') == 0 ? linkfinder.getLink : linkfinder.find;
    detailsfunc(line, function (error, details) {
        if (argv.p) {
            // Preserve search as filename
            details.title = line + '.mp3';
        }
        console.log(details.url + '\t' + details.title);
    });
});
