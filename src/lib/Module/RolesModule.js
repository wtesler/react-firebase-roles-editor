import {ServerClient} from '../Server/ServerClient';

const RolesModule = (rootModule) => {
  const module = {
    match: null,
    rolesServerClient: new ServerClient()
  };

  return [
    module,
    () => {
      module.rolesServerClient.destruct();
    }
  ]
}

export default RolesModule;
