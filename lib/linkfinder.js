
var youtube = require('./youtube');
var youtubemp3 = require('./youtubemp3');
var async = require('async');

var youtubewatch = 'http://youtube.com/watch?v=';

var getLink = function (video, callback) {
    if (video.indexOf('http://') === 0) {
        video = video.match(/\?v=([^&]+)/)[1];
    }
    process.stderr.write('trying ' + youtubewatch + video + '\n');
    youtubemp3.link(video, function (err, url, title) {
        if (err) {
            process.stderr.write('  no links found.\n');
            return callback(new Error('no link found'));
        }
        return callback(null, { url: url, title: title });
    });
}

var getFirstAvailableLink = function (videos, callback) {
    var videoDetails = null;
    async.detectSeries(videos, function (video, cb) {
        getLink(video.id, function (err, details) {
            if (err) return cb(false);
            videoDetails = details;
            return cb(true);
        });
    }, function () {
        if (!videoDetails) return callback('could not find any links, the song may be copyright-protected');
        callback(null, videoDetails);
    });
};

var find = function (query, callback) {
    youtube.search(query.replace(/-/g,''), 5, function (error, videos) {
        if (error) return callback(error);
        return getFirstAvailableLink(videos, callback);
    });
};
exports.find = find;
exports.getLink = getLink;
