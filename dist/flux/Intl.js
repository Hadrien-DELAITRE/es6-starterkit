'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _actionsIntl = require('../actions/Intl');

var _actionsIntl2 = _interopRequireDefault(_actionsIntl);

var _nexusFluxAdaptersLocal = require('nexus-flux/adapters/Local');

var _nexusFluxAdaptersLocal2 = _interopRequireDefault(_nexusFluxAdaptersLocal);

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

var createLocalIntlFlux = function createLocalIntlFlux(_ref, clientID, lifespan, intl) {
  var req = _ref.req;
  var window = _ref.window;

  var stores = {};
  var fluxLocalServer = new _nexusFluxAdaptersLocal2['default'].Server(stores);
  lifespan.onRelease(fluxLocalServer.lifespan.release);
  var localIntl = new _nexusFluxAdaptersLocal2['default'].Client(fluxLocalServer, clientID);
  lifespan.onRelease(localIntl.lifespan.release);

  var localeNode = req.acceptsLanguages(['en', 'en_US', 'en-US', 'fr', 'fr_FR', 'fr-FR']) || 'en';
  var localeBrowser = window.navigator.userLanguage || window.navigator.language || 'en';

  var intlActions = new _actionsIntl2['default'](stores, {}, __NODE__ ? localeNode : localeBrowser, intl);
  fluxLocalServer.on('action', function (_ref2) {
    var path = _ref2.path;
    var params = _ref2.params;

    intlActions.performAction(path, params);
  }, fluxLocalServer.lifespan);

  return localIntl;
};

exports['default'] = createLocalIntlFlux;
module.exports = exports['default'];