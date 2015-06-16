'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _componentsUtilsIntlMessage = require('./components/Utils/IntlMessage');

var _componentsUtilsIntlMessage2 = _interopRequireDefault(_componentsUtilsIntlMessage);

var _fluxIntl = require('./flux/Intl');

var _fluxIntl2 = _interopRequireDefault(_fluxIntl);

var _ = require('lodash');
var should = require('should');
var Promise = (global || window).Promise = require('bluebird');
var __DEV__ = process.env.NODE_ENV !== 'production';
var __PROD__ = !__DEV__;
var __BROWSER__ = typeof window === 'object';
var __NODE__ = !__BROWSER__;
if (__DEV__) {
  Promise.longStackTraces();
  Error.stackTraceLimit = Infinity;
}
exports['default'] = { IntlMessage: _componentsUtilsIntlMessage2['default'], createIntlFlux: _fluxIntl2['default'] };
module.exports = exports['default'];