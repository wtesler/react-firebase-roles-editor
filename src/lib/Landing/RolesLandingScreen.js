import './RolesLandingScreen.css';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ACCESS_DENIED, FAILED_LOAD_ROLES, LOADING
} from '../Constants/i18n';
import RolesNavBar from '../NavBar/RolesNavBar';
import {withModule} from 'react-hoc-di';
import {Requests} from '../Requests/Requests';
import RolesItem from "./Item/RolesItem";
import RolesSearch from "./Search/RolesSearch";

const RolesLandingScreen = props => {
  const {module} = props;
  const {toastRelay, rolesServerClient} = module;

  const [users, setUsers] = useState(null);

  const requestsRef = useRef(new Requests());

  const readUserRoles = useCallback(async (pageToken = undefined, claim = null, email = null) => {
    try {
      toastRelay.show(LOADING, true);
      const users = await rolesServerClient.readUserRoles(pageToken, claim, email, requestsRef.current);
      toastRelay.show(null);
      setUsers(users);
    } catch (e) {
      console.error(e);
      toastRelay.show(null);
      const msg = e.code && e.code === 403 ? ACCESS_DENIED : FAILED_LOAD_ROLES;
      toastRelay.show(msg, true);
    }
  }, [toastRelay, requestsRef, rolesServerClient]);

  useEffect(() => {
    readUserRoles(undefined, null, null);
  }, [readUserRoles]);

  useEffect(() => {
    const requests = requestsRef.current;
    return () => {
      requests.unmount();
    }
  }, [requestsRef]);

  const onSubmit = useCallback((claim, email) => {
    readUserRoles(undefined, claim, email);
  }, [readUserRoles]);

  const mainContent = useMemo(() => {
    if (!users) {
      return null;
    }

    const userElements = [];
    for (const user of users) {
      userElements.push(<RolesItem user={user} key={user.uid}/>);
    }

    return (
      <div id='RolesLandingScreenBodyOuter'>
        <div id='RolesLandingScreenBody'>
          <div id='RolesLandingScreenSearchContainer'>
            <RolesSearch onSubmit={onSubmit}/>
          </div>
          {userElements}
        </div>
      </div>
    );
  }, [users, onSubmit]);

  return (
    <div id='RolesLandingScreen'>
      <RolesNavBar/>
      {mainContent}
    </div>
  );
}

export default withModule(RolesLandingScreen);
