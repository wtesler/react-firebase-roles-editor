import './RolesItem.css';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {withModule} from 'react-hoc-di';
import {Requests} from '../../Requests/Requests';
import {ACCESS_DENIED, FAILED_UPDATE_ROLE, SAVING} from "../../Constants/i18n";
import {BasicInput} from "react-forms-input";

const RolesItem = props => {
  const {module, user} = props;
  const {toastRelay, rolesServerClient, rolesLoginManager} = module;

  const [dirty, setDirty] = useState(false);
  const [pendingCustomClaims, setPendingCustomClaims] = useState(false);

  const requestsRef = useRef(new Requests());

  const toActiveClaimsList = useCallback((claims) => {
    const activeClaims = [];
    for (let [key, value] of Object.entries(claims)) {
      if (value) {
        key = key.trim();
        activeClaims.push(key);
      }
    }
    return activeClaims;
  }, []);

  const updateUserRole = useCallback(async () => {
    try {
      const activeClaimsList = toActiveClaimsList(pendingCustomClaims);
      toastRelay.show(SAVING, true);
      await rolesServerClient.updateUserRole(user.uid, activeClaimsList, requestsRef.current);
      toastRelay.show(null);
      user.customClaims = pendingCustomClaims;
      setDirty(false);
      const curUser = await rolesLoginManager.awaitUser();
      if (curUser && curUser.uid === user.uid) {
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
      toastRelay.show(null);
      const msg = e.code && e.code === 403 ? ACCESS_DENIED : FAILED_UPDATE_ROLE;
      toastRelay.show(msg, false, 5000);
    }
  }, [toastRelay, requestsRef, rolesServerClient, user, toActiveClaimsList, rolesLoginManager, pendingCustomClaims]);

  useEffect(() => {
    const requests = requestsRef.current;
    return () => {
      requests.unmount();
    }
  }, [requestsRef]);

  const onClaimsChange = useCallback((claimsString) => {
    let claims = claimsString.split(',');
    const claimsObj = {};
    for (let claim of claims) {
      claim = claim.trim();
      if (!claim) {
        continue;
      }
      claimsObj[claim] = true;
    }
    setPendingCustomClaims(claimsObj);
    setDirty(true);
  }, []);

  const toActiveClaimsString = useCallback((activeClaims) => {
    const activeClaimsStr = activeClaims.join(',');
    let trimmedStr = activeClaimsStr.replace(/(^,)|(,$)/g, '') // Remove leading or trailing commas.
    trimmedStr = trimmedStr.trim();
    return trimmedStr;
  }, []);

  const actionElement = useMemo(() => {
    if (!dirty) {
      return null;
    }
    return (
      <div className={`RolesItemActions`}>
        {/*<div className={`RolesItemActionCancel RolesItemActionItem`}>*/}
        {/*  {'Cancel'}*/}
        {/*</div>*/}
        <div className={`RolesItemActionSave RolesItemActionItem`} onClick={updateUserRole}>
          {'Save'}
        </div>
      </div>
    )
  }, [dirty, updateUserRole]);

  return (
    <div className={`RolesItemOuter`}>
      <div className={`RolesItemInner`}>
        <div className={`RolesItemEmail`}>
          {user.email}
        </div>
        <div className={`RolesItemClaims`}>
          <BasicInput
            className={`RolesItemClaimsInputOuter`}
            textClass={`RolesItemClaimsInput`}
            initialValue={toActiveClaimsString(toActiveClaimsList(user.customClaims))}
            onChange={onClaimsChange}
            maxChars={256}
          />
        </div>
      </div>
      {actionElement}
    </div>
  );
}

export default withModule(RolesItem);
