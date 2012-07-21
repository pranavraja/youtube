
var request = require('request');

var youtubemp3hash = 'http://www.youtube-mp3.org/api/itemInfo/?video_id=';
// Gets the hash for a youtube `videoId` that is required for validation against youtube-mp3.org.  
var getVideoHash = function (videoId, callback) {
    var url = youtubemp3hash + videoId;
    request({url: url}, function (error, response, body) {
        try {
            var data = JSON.parse(body.split('info =')[1].replace(/;$/,'')).h;
        }
        catch(e) { 
            return callback(e);
        }
        callback(null, data);
    });
};

var youtubemp3get = 'http://www.youtube-mp3.org/get?video_id={id}&h={h}';
// Gets an mp3 link for a youtube `videoId`.
// Fires `callback` passing through the mp3 link as the `url` parameter.
var link = function (videoId, callback) {
    getVideoHash(videoId, function (error, hash) {
        if (error) return callback(new Error('video not found'));
        var url = youtubemp3get.replace('{id}', videoId).replace('{h}', hash);
        callback(null, url);
    });
};

exports.link = link;
