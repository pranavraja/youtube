
var linkfinder = require('../lib/linkfinder');

exports['get link'] = function (test) {
    linkfinder.find('Michael Buble Sway', function (error, url) {
        if (error) throw error;
		test.ok(url.match(/download/));
        test.done();
    });
};
