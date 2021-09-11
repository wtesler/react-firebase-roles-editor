import './RolesPagination.css';
import React, {useMemo} from 'react';
import arrow_right_image from "../../Images/arrow_right.svg";
import {Icon} from "react-basic-icon";

const RolesPagination = props => {
  const {pageToken, pageTokenHistory, onPage} = props;

  const content = useMemo(() => {
    let backButton;
    if (pageTokenHistory.length > 0) {
      backButton = (
        <div className={'RolesPaginationButton'} onClick={() => onPage(false)}>
          <Icon className={'RolesPaginationButtonIcon RolesPaginationButtonIconBack'} src={arrow_right_image}/>
        </div>
      )
    }

    let forwardButton;
    if (pageToken) {
      forwardButton = (
        <div className={'RolesPaginationButton'} onClick={() => onPage(true)}>
          <Icon className={'RolesPaginationButtonIcon'} src={arrow_right_image}/>
        </div>
      );
    }

    return (
      <div className={`RolesPaginationOuter`}>
        <div className={`RolesPaginationInner`}>
          {backButton}
          {forwardButton}
        </div>
      </div>
    );
  }, [pageToken, pageTokenHistory, onPage]);

  return content;
}

export default RolesPagination;
