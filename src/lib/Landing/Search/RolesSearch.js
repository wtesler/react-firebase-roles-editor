import './RolesSearch.css';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {InputDropdown} from "react-forms-input";
import {CLEAR_FILTER, FILTER} from "../../Constants/i18n";
import {Icon} from "react-basic-icon";
import arrow_right_image from "../../Images/arrow_right.svg";

const RolesSearch = props => {
  const {onSubmit} = props;

  const types = ['Email', 'Role'];

  const [value, setValue] = useState('');
  const [dirty, setDirty] = useState(false);

  const typeRef = useRef(types[0]);

  const onInputChange = useCallback((event) => {
    const value = event.target.value;
    setValue(value);
  }, []);

  const onTypeChange = useCallback((type) => {
    typeRef.current = type;
  }, []);

  const onSubmitClick = useCallback(() => {
    const type = typeRef.current;
    if (!value) {
      return;
    }
    const claim = type === 'Role' ? value : null;
    const email = type === 'Email' ? value : null;
    onSubmit(claim, email);
    setDirty(true);
  }, [value, onSubmit]);

  const onClearClick = useCallback(() => {
    onSubmit(null, null);
    setValue('');
    setDirty(false);
  }, [onSubmit]);

  const clearElement = useMemo(() => {
    if (!dirty) {
      return null;
    }
    return (
      <div className={`RolesSearchClear`} onClick={onClearClick}>
        {CLEAR_FILTER}
      </div>
    )
  }, [dirty, onClearClick]);

  return (
    <div className={`RolesSearchOuter`}>
      <div className={`RolesSearchInner`}>
        <div className={`RolesSearchDropdownContainer`}>
          <InputDropdown
            className={`RolesSearchDropdownOuter`}
            titleClass={`RolesSearchDropdownTitle`}
            initialValue={types[0]}
            onChange={onTypeChange}
            options={types}
          />
        </div>
        <div className={`RolesSearchInputContainer`}>
          <input
            value={value}
            className={`RolesSearchInput`}
            placeholder={FILTER}
            onChange={onInputChange}
            spellCheck={false}
            autoComplete={'off'}
          />
        </div>
        <div className={`RolesSearchButtonContainer`}>
          <div className={`RolesSearchButtonOuter`} onClick={onSubmitClick}>
            <Icon className={'RolesSearchButtonIcon'} src={arrow_right_image}/>
          </div>
        </div>
      </div>
      {clearElement}
    </div>
  );
}

export default RolesSearch;
