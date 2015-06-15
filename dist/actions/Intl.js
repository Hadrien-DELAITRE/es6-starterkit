'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _nexusFlux = require('nexus-flux');

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

var Intl = (function () {
  function Intl(_x, _x2, locale, intl) {
    var stores = arguments[0] === undefined ? {} : arguments[0];
    var fluxServers = arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Intl);

    // Defines licensed Actions
    this.licensedActions = this.getLicensedActions();

    // Defines function mapping
    this.actions = this.getActions();

    // Setting stores
    this.stores = stores;
    this.locales = stores['/locales'] = new _nexusFlux.Remutable({});
    this.intl = stores['/intl'] = new _nexusFlux.Remutable({});

    // Init system message stores
    this.locales.set('locale', locale).commit();
    this.intl.set('intl', intl).commit();
  }

  _createClass(Intl, [{
    key: 'performAction',
    value: function performAction(path, params) {
      if (this.isLicensedAction(path)) {
        this.actions[path](params);
      }
    }
  }, {
    key: 'isLicensedAction',
    value: function isLicensedAction(path) {
      var matchingLicensedAction = this.licensedActions[path];
      // the action must exist and must be true
      if (matchingLicensedAction !== void 0 && matchingLicensedAction) {
        return true;
      }
      return false;
    }
  }, {
    key: 'getLicensedActions',
    value: function getLicensedActions() {
      return {};
    }
  }, {
    key: 'getActions',
    value: function getActions() {
      return {};
    }
  }, {
    key: 'initBrowserMecanics',
    value: function initBrowserMecanics(window) {
      this.window = window;
    }
  }]);

  return Intl;
})();

exports['default'] = Intl;
module.exports = exports['default'];