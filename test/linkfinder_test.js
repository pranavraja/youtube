
var linkfinder = require('../lib/linkfinder');

exports['get link'] = function (test) {
    linkfinder.find('sway michael buble', function (error, url) {
        test.ifError(error);
        test.equal(url.indexOf('http://www.youtube-mp3.org/get'), 0);
        test.done();
    });
};
