
var linkfinder = require('../lib/linkfinder');

if (!module.parent) {
    var query = process.argv[2];
    if (!query) {
        console.warn('Example usage: node ' + __filename + ' "sway michael buble"');
        process.exit();
    }
    linkfinder.find(query, function (error, url) {
        console.log(url);
    });
}
