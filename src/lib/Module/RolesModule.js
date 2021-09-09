import {ServerClient} from '../Server/ServerClient';

const RolesModule = (rootModule) => {
  const module = {
    match: null,
    serverClient: new ServerClient()
  };

  return [
    module,
    () => {
      module.serverClient.destruct();
    }
  ]
}

export default RolesModule;
