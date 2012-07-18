var request = require('request');

var videoBaseUrl = 'http://youtube.com/watch?v=';

var Video = function (id, title) {
    this.id = id;
    this.title = title;
};
Video.prototype.url = function () {
    return videoBaseUrl + this.id;
};
exports.Video = Video;

var searchBaseUrl = 'https://gdata.youtube.com/feeds/api/videos?q={query}&alt=jsonc&v=2&max-results={results}';
exports.search = function (query, results, callback) {
    var url = searchBaseUrl.replace('{query}', encodeURIComponent(query.replace(/ /g,'+'))).replace('{results}', results);
    request({ url: url }, function (error, response, body) {
        if (error) return callback(error);
        var feed = JSON.parse(body);
        callback(null, feed.data.items.map(function (item) {
            return new Video(item.id, item.title);
        }));
    });
};
