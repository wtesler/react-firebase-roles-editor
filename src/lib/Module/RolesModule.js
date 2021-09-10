import {ServerClient} from '../Server/ServerClient';
import {LoginManager} from 'firebase-login-manager';

const RolesModule = (rootModule) => {
  const module = {
    match: null,
    rolesServerClient: new ServerClient(),
    rolesLoginManager: new LoginManager(false),
  };

  return [
    module,
    () => {
      module.rolesServerClient.destruct();
      module.rolesLoginManager.destruct();
    }
  ]
}

export default RolesModule;
