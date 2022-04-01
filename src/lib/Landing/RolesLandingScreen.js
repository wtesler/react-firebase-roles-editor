import './RolesLandingScreen.css';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ACCESS_DENIED, LOADING
} from '../Constants/i18n';
import RolesNavBar from '../NavBar/RolesNavBar';
import {withModule} from 'react-hoc-di';
import {Requests} from '../Requests/Requests';
import RolesItem from "./Item/RolesItem";
import RolesSearch from "./Search/RolesSearch";
import RolesPagination from "./Pagination/RolesPagination";

const RolesLandingScreen = props => {
  const {module} = props;
  const {toastRelay, rolesServerClient} = module;

  const [users, setUsers] = useState(null);
  const [pageToken, setPageToken] = useState(undefined);
  const [prevPageToken, setPrevPageToken] = useState(undefined);
  const [pageTokenHistory, setPageTokenHistory] = useState([]);

  const requestsRef = useRef(new Requests());

  const readUserRoles = useCallback(async (token = undefined, claim = null, email = null) => {
    try {
      toastRelay.show(LOADING, true);
      const {users, pageToken} = await rolesServerClient.readUserRoles(token, claim, email, 20, requestsRef.current);
      toastRelay.show(null);
      setUsers(users);
      setPageToken(pageToken);
    } catch (e) {
      console.error(e);
      toastRelay.show(null);
      const accessDenied = e.code === 403;
      const isImproperEmail = e.message && e.message.includes('auth/invalid-email');
      if (accessDenied) {
        toastRelay.show(ACCESS_DENIED, true);
      } else if (isImproperEmail) {
        toastRelay.show('Email not formatted properly', false, 3000);
      } else {
        toastRelay.show('Something went wrong. Try again.', false, 3000);
      }
    }
  }, [toastRelay, rolesServerClient]);

  useEffect(() => {
    readUserRoles(undefined, null, null);
  }, [readUserRoles]);

  useEffect(() => {
    const requests = requestsRef.current;
    return () => {
      requests.unmount();
    }
  }, [requestsRef]);

  const onSearchSubmit = useCallback((claim, email) => {
    setPageTokenHistory([]);
    readUserRoles(undefined, claim, email);
  }, [readUserRoles]);

  const onPage = useCallback(isForward => {
    let token = pageToken;
    if (isForward) {
      pageTokenHistory.push(prevPageToken);
      setPrevPageToken(token);
    } else {
      token = pageTokenHistory.pop();
      setPrevPageToken(token);
    }
    setPageTokenHistory(pageTokenHistory);
    readUserRoles(token, null, null);
  }, [pageToken, pageTokenHistory, readUserRoles, prevPageToken]);

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
            <RolesSearch onSubmit={onSearchSubmit}/>
          </div>
          {userElements}
          <div id='RolesLandingScreenPaginationContainer'>
            <RolesPagination pageToken={pageToken} pageTokenHistory={pageTokenHistory} onPage={onPage}/>
          </div>
        </div>
      </div>
    );
  }, [users, pageToken, pageTokenHistory, onPage, onSearchSubmit]);

  return (
    <div id='RolesLandingScreen'>
      <RolesNavBar/>
      {mainContent}
    </div>
  );
}

export default withModule(RolesLandingScreen);
