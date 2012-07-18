
var youtube = require('./youtube');
var youtubemp3 = require('./youtubemp3');
var async = require('async');

var find = function (query, callback) {
    youtube.search(query.replace(/-/g,''), 5, function (error, videos) {
        if (error) return callback(error);
        var videoUrl = null;
        async.detectSeries(videos, function (video, cb) {
            youtubemp3.link(video.id, function (err, url) {
                if (err) return cb(false);
                videoUrl = url;
                cb(true);
            });
        }, function (video) {
            if (!videoUrl) return callback('could not find video');
            callback(null, videoUrl);
        });
    });
};
exports.find = find;
