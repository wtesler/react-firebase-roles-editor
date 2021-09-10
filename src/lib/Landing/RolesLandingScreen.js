import './RolesLandingScreen.css';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ACCESS_DENIED, EDIT_ROLES, FAILED_LOAD_ROLES
} from '../Constants/i18n';
import RolesNavBar from '../NavBar/RolesNavBar';
import {withModule} from 'react-hoc-di';
import {Requests} from '../Requests/Requests';
import RolesItem from "./Item/RolesItem";

const RolesLandingScreen = props => {
  const {module, headerClass} = props;
  const {toastRelay, rolesServerClient} = module;

  const [users, setUsers] = useState(null);

  const requestsRef = useRef(new Requests());

  const readUserRoles = useCallback(async () => {
    try {
      const users = await rolesServerClient.readUserRoles(requestsRef.current);
      console.log(users);
      setUsers(users);
    } catch (e) {
      console.error(e);
      const msg = e.code && e.code === 403 ? ACCESS_DENIED : FAILED_LOAD_ROLES;
      toastRelay.show(msg, true);
    }
  }, [toastRelay, requestsRef, rolesServerClient]);

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
      userElements.push(<RolesItem user={user} key={user.uid}/>);
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
