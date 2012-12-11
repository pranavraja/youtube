#!/usr/bin/env node
var linkfinder = require('../lib/linkfinder');
var argv = require('optimist').argv; 
var stdin = require('stdin');

stdin(function (input) {
    input.split('\n').forEach(function (line) {
        line = line.replace(/\s+$/,'');
        if (!line) return;
        detailsfunc = line.search(/https?:\/\//) == 0 ? linkfinder.getLink : linkfinder.find;
        detailsfunc(line, function (error, details) {
            if (error) return;
            if (argv.p) {
                // Preserve search as filename
                details.title = line + '.mp3';
            }
            console.log(details.url + '\t' + details.title);
        });
    });
});

