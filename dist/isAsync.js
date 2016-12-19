'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _stringSaw = require('string-saw');

var _stringSaw2 = _interopRequireDefault(_stringSaw);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (func) {
	var $string = (0, _stringSaw2.default)(func.toString()).trim();

	return !!(
	// native
	$string.has(/^async /) ||

	// babel
	$string.has(/return _ref[^\.]*\.apply/) ||

	// mangled
	$string
	// get inner function contents
	.match(/^\s*[^\{]+\{([\s\S]+)\}\s*$/im).first()
	// strip all sub calls
	.replace(/\{[\s\S]+}/g, '')
	// find return
	.split('\n').trim().filter().has(/return .*promise/i));
};

module.exports = exports['default'];