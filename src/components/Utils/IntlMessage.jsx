import Nexus from 'react-nexus';
const { React } = Nexus;
import Lifespan from 'lifespan';
import IntlMessageFormat from 'intl-messageformat';

const IntlMessage = React.createClass({
  displayName: 'IntlMessage',

  propTypes: {
    keyMessage: React.PropTypes.string.isRequired,
    objectMessage: React.PropTypes.object,
  },

  mixins: [Nexus.Mixin, Lifespan.Mixin, React.addons.PureRenderMixin],

  statics: {
    styles: process.env.STYLES ? {
    } : null,
  },

  getNexusBindings(props) {
    return {
      locales: [this.getNexus().local, '/locales'],
      intl: [this.getNexus().local, props.intl],
    };
  },

  getLocales(locales) {
    if(locales === void 0 || locales === null) {
      return 'fr';
    }
    return locales.get('locale');
  },

  render() {
    const { locales, intl } = this.state;
    if(locales === null || intl === null || locales.size === 0 || intl.size === 0) {
      return null;
    }
    const { keyMessage, objectMessage } = this.props;
    const computedLocale = this.getLocales(locales);
    const systemMessage = new IntlMessageFormat(
      intl.get('intl')[computedLocale][keyMessage],
      computedLocale
    );
    const formattedMessage = objectMessage ? systemMessage.format(objectMessage) : systemMessage.format();
    return (
      <span>{formattedMessage}</span>
    );
  },
});

export default IntlMessage;
