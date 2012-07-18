
var child_process = require('child_process');
var _ = require('underscore');

// Executes `cmd` on the shell, firing `callback` when done.
var exec = function (cmd, callback) {
	if (_.isArray(cmd)) cmd = cmd.join(' ');
	return child_process.exec(cmd, callback);
};

// Escapes `cmd` using double quotes, for safe usage in the shell
var escapeCmd = function (cmd) {
	return '"' + cmd + '"';
};

exports.exec = exec;
exports.escapeCmd = escapeCmd;
