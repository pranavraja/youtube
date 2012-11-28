
var linkfinder = require('../lib/linkfinder');

exports['get link'] = function (test) {
    linkfinder.find('Michael Buble Sway', function (error, details) {
        if (error) throw error;
		test.ok(details.url.match(/download/));
        test.ok(details.title.match(/michael/i));
        test.done();
    });
};
