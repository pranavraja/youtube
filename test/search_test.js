
var youtube = require('../lib/youtube');

exports['search videos'] = function (test) {
    youtube.search('sway michael buble', 1, function (error, results) {
        test.equal(results.length, 1, "wrong number of results returned");
        test.ok(results[0].id, "no video id");
        test.ok(results[0].title.toLowerCase().indexOf('sway'), "wrong video feed");
        test.done();
    });
};
