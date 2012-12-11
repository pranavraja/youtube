#!/usr/bin/env node
var linkfinder = require('../lib/linkfinder');
var argv = require('optimist').argv; 
var stdin = require('stdin');

stdin(function (line) {
    line = line.replace(/\s+$/,'');
    detailsfunc = line.indexOf('http://') == 0 ? linkfinder.getLink : linkfinder.find;
    detailsfunc(line, function (error, details) {
        if (error) return;
        if (argv.p) {
            // Preserve search as filename
            details.title = line + '.mp3';
        }
        console.log(details.url + '\t' + details.title);
    });
});

