import cx from 'classnames';
import React, { Component } from 'react';
import ReactSelect from 'react-select';
import Async from 'react-select/async';

class Select extends Component {
  render() {
    const {
      label,
      options,
      onChange,
      value,
      limit_menu_height,
      max_menu_height,
      className,
      isMulti,
      placeholder,
      async = false,
      loadOptions,
      disabled,
      isLoading,
    } = this.props;
    const customStyles = {
      menuList: (provided) => ({
        ...provided,
        maxHeight: max_menu_height || provided.maxHeight,
      }),
    };
    return (
      <div className={cx(['select-wrapper', disabled && 'disabled'])}>
        {label && <label className="select-wrapper__label">{label}</label>}
        {async ? (
          <Async
            loadOptions={loadOptions}
            onChange={onChange}
            classNamePrefix="ath-select"
            className={cx(
              'ath-select-container',
              {
                'ath-select-container--1': limit_menu_height,
              },
              `${className ? className : ''}`
            )}
            value={value}
            styles={customStyles}
            isMulti={isMulti}
            placeholder={placeholder}
            isDisabled={disabled}
            isLoading={isLoading}
          />
        ) : (
          <ReactSelect
            options={options}
            onChange={onChange}
            classNamePrefix="ath-select"
            className={cx(
              'ath-select-container',
              {
                'ath-select-container--1': limit_menu_height,
              },
              `${className ? className : ''}`
            )}
            value={value}
            styles={customStyles}
            isMulti={isMulti}
            placeholder={placeholder}
            isDisabled={disabled}
            isLoading={isLoading}
          />
        )}
      </div>
    );
  }
}

export default Select;
