
var youtube = require('./youtube');
var youtubemp3 = require('./youtubemp3');
var async = require('async');

var youtubewatch = 'http://youtube.com/watch?v=';
var find = function (query, callback) {
    youtube.search(query.replace(/-/g,''), 15, function (error, videos) {
        if (error) return callback(error);
        var videoUrl = null;
        async.detectSeries(videos, function (video, cb) {
            console.log('trying', youtubewatch + video.id);
            youtubemp3.link(video.id, function (err, url) {
                if (err) {
                    console.log('  no links found.');
                    return cb(false);
                }
                videoUrl = url;
                cb(true);
            });
        }, function (video) {
            if (!videoUrl) return callback('could not find any links, the song may be copyright-protected');
            callback(null, videoUrl);
        });
    });
};
exports.find = find;
