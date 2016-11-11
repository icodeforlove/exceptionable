'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _decreator = require('decreator');

var _decreator2 = _interopRequireDefault(_decreator);

var _isAsync = require('./isAsync');

var _isAsync2 = _interopRequireDefault(_isAsync);

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

	if ((0, _isAsync2.default)(method)) {
		(0, _defineProperty2.default)(target, key, {
			value: function () {
				var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
					var _args = arguments;
					return _regenerator2.default.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									_context.prev = 0;
									_context.next = 3;
									return method.apply(undefined, _args);

								case 3:
									return _context.abrupt('return', _context.sent);

								case 6:
									_context.prev = 6;
									_context.t0 = _context['catch'](0);

									if (handler) {
										handler(_context.t0);
									}

								case 9:
								case 'end':
									return _context.stop();
							}
						}
					}, _callee, this, [[0, 6]]);
				}));

				function value() {
					return _ref.apply(this, arguments);
				}

				return value;
			}()
		});
	} else {
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
	}

	return target;
});
module.exports = exports['default'];