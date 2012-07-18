
var youtube = require('./youtube');
var youtubemp3 = require('./youtubemp3');
var async = require('async');

var find = function (query, callback) {
    youtube.search(query, 5, function (error, videos) {
        if (error) return callback(error);
        var videoUrl;
        async.detectSeries(videos, function (video, callback) {
            youtubemp3.link(video.id, function (err, url) {
                if (err) callback(false);
                else {
                    videoUrl = url;
                    callback(true);
                }
            });
        }, function () {
            if (!videoUrl) return callback('could not find video');
            callback(null, videoUrl);
        });
    });
};
exports.find = find;
