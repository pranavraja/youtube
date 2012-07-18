
var shell = require('../lib/shell');

exports['exec'] = function (test) {
	test.expect(1);
	shell.exec('ls ' +  __filename, function (err, stdout) {
		test.ok(~stdout.indexOf(__filename), 'shell.js not found');
		test.done();
	});
};

exports['exec with args'] = function (test) {
	test.expect(2);
	shell.exec([ 'ls', '-l', __filename ], function (err, stdout) {
		test.ok(~stdout.indexOf(__filename), 'shell.js not found');
		test.equal(true, stdout.indexOf('-r') === 0, 'extra arguments not passed to ls');
		test.done();
	});
};
