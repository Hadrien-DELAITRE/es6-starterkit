import IntlActions from '../actions/Intl';
import LocalFlux from 'nexus-flux/adapters/Local';

const createLocalIntlFlux = ({ req, window }, clientID, lifespan, intl) => {
  const stores = {};
  const fluxLocalServer = new LocalFlux.Server(stores);
  lifespan.onRelease(fluxLocalServer.lifespan.release);
  const localIntl = new LocalFlux.Client(fluxLocalServer, clientID);
  lifespan.onRelease(localIntl.lifespan.release);
  const locale = __NODE__ ?
    req.acceptsLanguages(['en', 'en_US', 'en-US', 'fr', 'fr_FR', 'fr-FR']) || 'en' :
    window.navigator.userLanguage || window.navigator.language || 'en';

  const intlActions = new IntlActions(stores, {}, locale, intl);
  fluxLocalServer.on('action', ({ path, params }) => {
    intlActions.performAction(path, params);
  }, fluxLocalServer.lifespan);

  return localIntl;
};

export default createLocalIntlFlux;
