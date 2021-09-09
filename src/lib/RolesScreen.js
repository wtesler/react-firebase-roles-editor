import './RolesScreen.css';
import React from 'react';
import {withModule} from 'react-hoc-di';
import RolesModule from './Module/RolesModule';
import {RootOverlays} from 'react-root-overlays';
import RolesLandingScreen from './Landing/RolesLandingScreen';
import {withRouter} from 'react-router-dom';

const RolesScreen = props => {
  const {host, module, match} = props;
  const {serverClient} = module;

  if (match.isExact) {
    module.rootPath = match.path;
  }

  if (!host) {
    throw new Error('Must supply host, which is the url to your backend server.');
  }

  serverClient.host = host;

  return (
    <div className={'RolesScreen'}>
      <RootOverlays>
        <RolesLandingScreen/>
      </RootOverlays>
    </div>
  );
}

export default withRouter(withModule(RolesScreen, RolesModule));
