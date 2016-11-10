'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _decreator = require('decreator');

var _decreator2 = _interopRequireDefault(_decreator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _decreator2.default)(function (target, key, descriptor, options) {
	var _options$handler = options.handler,
	    handler = _options$handler === undefined ? console.error : _options$handler,
	    _options$verbose = options.verbose,
	    verbose = _options$verbose === undefined ? true : _options$verbose;


	if (!verbose && handler == console.error) {
		handler = null;
	}

	var method = target[key];

	(0, _defineProperty2.default)(target, key, {
		value: function value() {
			try {
				return method.apply(undefined, arguments);
			} catch (error) {
				if (handler) {
					handler(error);
				}
			}
		}
	});

	return target;
});
module.exports = exports['default'];