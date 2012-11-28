
var youtube = require('./youtube');
var youtubemp3 = require('./youtubemp3');
var async = require('async');

var youtubewatch = 'http://youtube.com/watch?v=';
var find = function (query, callback) {
    youtube.search(query.replace(/-/g,''), 5, function (error, videos) {
        if (error) return callback(error);
        var videoDetails = null;
        async.detectSeries(videos, function (video, cb) {
            process.stderr.write('trying ' + youtubewatch + video.id + '\n');
            youtubemp3.link(video.id, function (err, url) {
                if (err) {
                    process.stderr.write('  no links found.\n');
                    return cb(false);
                }
                videoDetails = { url: url, title: video.title };
                cb(true);
            });
        }, function () {
            if (!videoDetails) return callback('could not find any links, the song may be copyright-protected');
            callback(null, videoDetails);
        });
    });
};
exports.find = find;
