import './RolesNavBar.css';
import React from 'react';
import {EDIT_ROLES} from "../Constants/i18n";

const RolesNavBar = () => {
  return (
    <div className={`RolesNavBarOuter`}>
      <div className={`RolesNavBar`}>
        <div className={'RolesNavBarTitle'}>{EDIT_ROLES}</div>
      </div>
    </div>
  );
}

export default RolesNavBar;
