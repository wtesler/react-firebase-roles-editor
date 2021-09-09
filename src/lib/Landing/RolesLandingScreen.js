import './RolesLandingScreen.css';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ACCESS_DENIED, EDIT_ROLES, FAILED_LOAD_ROLES
} from '../Constants/i18n';
import RolesNavBar from '../NavBar/RolesNavBar';
import {withModule} from 'react-hoc-di';
import {Requests} from '../Requests/Requests';

const RolesLandingScreen = props => {
  const {module, headerClass} = props;
  const {toastRelay, serverClient} = module;

  const [users, setUsers] = useState(null);

  const requestsRef = useRef(new Requests());

  const readUserRoles = useCallback(async () => {
    try {
      const users = await serverClient.readUserRoles(requestsRef.current);
      console.log(users);
      setUsers(users);
    } catch (e) {
      console.error(e);
      let msg = FAILED_LOAD_ROLES;
      if (e.code && e.code === 403) {
        msg = ACCESS_DENIED;
      }
      toastRelay.show(msg, true);
    }
  }, [toastRelay, requestsRef, serverClient]);

  useEffect(() => {
    readUserRoles();
  }, [readUserRoles]);

  useEffect(() => {
    const requests = requestsRef.current;
    return () => {
      requests.unmount();
    }
  }, [requestsRef]);

  const mainContent = useMemo(() => {
    if (!users) {
      return null;
    }

    const userElements = [];
    for (const user of users) {
      userElements.push((
        <div className={'RolesLandingScreenSectionOuter'} key={user.uid}>
          {user.email}
        </div>
      ))
    }

    return (
      <div id='RolesLandingScreenBodyOuter'>
        <div id='RolesLandingScreenBodyHeader' className={headerClass ? headerClass : ''}>{EDIT_ROLES}</div>
        <div id='RolesLandingScreenBody'>
          {userElements}
        </div>
      </div>
    );
  }, [users, headerClass]);

  return (
    <div id='RolesLandingScreen'>
      <RolesNavBar/>
      {mainContent}
    </div>
  );
}

export default withModule(RolesLandingScreen);
