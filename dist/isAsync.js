"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (func) {
	var string = func.toString().trim();

	return !!(
	// native
	string.match(/^async /) ||
	// babel
	string.match(/return _ref\.apply/));
};

module.exports = exports["default"];