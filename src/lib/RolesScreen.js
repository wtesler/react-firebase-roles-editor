import './RolesScreen.css';
import React from 'react';
import {withModule} from 'react-hoc-di';
import RolesModule from './Module/RolesModule';
import {RootOverlays} from 'react-root-overlays';
import RolesLandingScreen from './Landing/RolesLandingScreen';
import {withRouter} from 'react-router-dom';
import {LoginPortal} from 'react-firebase-login';

const RolesScreen = props => {
  const {host, module, match} = props;
  const {rolesServerClient} = module;

  if (match.isExact) {
    module.rootPath = match.path;
  }

  if (!host) {
    throw new Error('Must supply host, which is the url to your backend server.');
  }

  rolesServerClient.host = host;

  return (
    <div className={'RolesScreen'}>
      <RootOverlays>
        <LoginPortal>
          <RolesLandingScreen/>
        </LoginPortal>
      </RootOverlays>
    </div>
  );
}

export default withRouter(withModule(RolesScreen, RolesModule));
