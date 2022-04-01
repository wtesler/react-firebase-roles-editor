import './RolesScreen.css';
import React from 'react';
import {withModule} from 'react-hoc-di';
import RolesModule from './Module/RolesModule';
import {RootOverlays} from 'react-root-overlays';
import RolesLandingScreen from './Landing/RolesLandingScreen';
import {LoginPortal} from 'react-firebase-login';

const RolesScreen = props => {
  const {host, module} = props;
  const {rolesServerClient} = module;

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

export default withModule(RolesScreen, RolesModule);
