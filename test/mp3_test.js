
var youtubemp3 = require('../lib/youtubemp3');

exports['get link'] = function (test) {
    var videoId = 'zmYMkl1Grzc';
    youtubemp3.link(videoId, function (error, url) {
        test.ifError(error);
		test.ok(url.match(/download/));
        test.done();
    });
};
