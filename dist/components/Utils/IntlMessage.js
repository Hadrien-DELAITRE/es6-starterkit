'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _reactNexus = require('react-nexus');

var _reactNexus2 = _interopRequireDefault(_reactNexus);

var _lifespan = require('lifespan');

var _lifespan2 = _interopRequireDefault(_lifespan);

var _intlMessageformat = require('intl-messageformat');

var _intlMessageformat2 = _interopRequireDefault(_intlMessageformat);

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
var React = _reactNexus2['default'].React;

var IntlMessage = React.createClass({
  displayName: 'IntlMessage',

  propTypes: {
    keyMessage: React.PropTypes.string.isRequired,
    objectMessage: React.PropTypes.object },

  mixins: [_reactNexus2['default'].Mixin, _lifespan2['default'].Mixin, React.addons.PureRenderMixin],

  statics: {
    styles: process.env.STYLES ? {} : null },

  getNexusBindings: function getNexusBindings(props) {
    return {
      locales: [props.intl, '/locales'],
      intl: [props.intl, '/intl'] };
  },

  getLocales: function getLocales(locales) {
    if (locales === void 0 || locales === null) {
      return 'fr';
    }
    return locales.get('locale');
  },

  render: function render() {
    var _state = this.state;
    var locales = _state.locales;
    var intl = _state.intl;

    if (locales === null || intl === null || locales.size === 0 || intl.size === 0) {
      return null;
    }
    var _props = this.props;
    var keyMessage = _props.keyMessage;
    var objectMessage = _props.objectMessage;

    var computedLocale = this.getLocales(locales);
    var systemMessage = new _intlMessageformat2['default'](intl.get('intl')[computedLocale][keyMessage], computedLocale);
    var formattedMessage = objectMessage ? systemMessage.format(objectMessage) : systemMessage.format();
    return React.createElement(
      'span',
      null,
      formattedMessage
    );
  } });

exports['default'] = IntlMessage;
module.exports = exports['default'];