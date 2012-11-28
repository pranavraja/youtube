#!/usr/bin/env node
var linkfinder = require('../lib/linkfinder');
var readline = require('readline');
var argv = require('optimist').argv; 

var rl = readline.createInterface(process.stdin, process.stdout);
rl.on('line', function (line) {
    linkfinder.find(line, function (error, details) {
        if (argv.p) {
            // Preserve search as filename
            details.title = line;
        }
        console.log(details.url + '\t' + details.title + '.mp3');
    });
});
