import {ServerClient} from '../Server/ServerClient';
import {LoginManager} from 'firebase-login-manager';

const RolesModule = (rootModule) => {
  const loginManager = new LoginManager(false);

  const module = {
    match: null,
    rolesServerClient: new ServerClient(loginManager),
    rolesLoginManager: loginManager,
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
