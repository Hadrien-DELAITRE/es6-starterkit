import { Remutable } from 'nexus-flux';

class Intl {

  constructor(stores = {}, fluxServers = {}, locale, intl) {

    // Defines licensed Actions
    this.licensedActions = this.getLicensedActions();

    // Defines function mapping
    this.actions = this.getActions();

    // Setting stores
    this.stores = stores;
    this.locales = stores['/locales'] = new Remutable({});
    this.intl = stores['/intl'] = new Remutable({});

    // Init system message stores
    this.locales.set('locale', locale).commit();
    this.intl.set('intl', intl).commit();
  }

  performAction(path, params) {
    if(this.isLicensedAction(path)) {
      this.actions[path](params);
    }
  }

  isLicensedAction(path) {
    const matchingLicensedAction = this.licensedActions[path];
    // the action must exist and must be true
    if(matchingLicensedAction !== void 0 && matchingLicensedAction) {
      return true;
    }
    return false;
  }

  getLicensedActions() {
    return {
    };
  }

  getActions() {
    return {
    };
  }

  initBrowserMecanics(window) {
    this.window = window;
  }
}

export default Intl;
