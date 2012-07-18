
var linkfinder = require('../lib/linkfinder');

exports['get link'] = function (test) {
    linkfinder.find('Michael Buble Sway', function (error, url) {
        if (error) throw error;
        test.equal(url.indexOf('http://www.youtube-mp3.org/get'), 0);
        test.done();
    });
};
