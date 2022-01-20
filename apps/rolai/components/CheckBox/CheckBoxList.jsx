import cx from 'classnames';
import React from 'react';

import useStyles from './CheckBox.styles';

export const CheckBoxList = (props) => {
  const { checkbox_list, selected_options, onSelect, horizontal } = props;
  const handleChange = (e, id) => {
    onSelect(id);
  };

  return (
    <div
      className={cx('radio-group', { 'radio-group--horizontal': horizontal })}
    >
      {checkbox_list.map((element, i) => {
        return (
          <Checkbox
            key={i}
            checked={element.correct}
            handleChange={handleChange}
            label={element.label}
            id={element.value}
            element={element}
            disabled={element.disabled}
          />
        );
      })}
    </div>
  );
};
const Checkbox = ({ id, handleChange, label, checked, disabled, element }) => {
  const styles = useStyles();
  const handleOptionChange = (e) => {
    if (handleChange !== undefined) handleChange(e, id);
  };
  return (
    <div
      className={cx(
        'checkbox-wrapper',
        { 'checkbox-wrapper__item--disabled': element.disabled },
        { 'checkbox-wrapper__item--wrong': element.wrong },
        { 'checkbox-wrapper__item--correct': element.correct },
        {
          'checkbox-wrapper__item--user-correct': element.user_selected_correct,
        }
      )}
    >
      <input
        className="styled-checkbox"
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => handleOptionChange(e)}
        disabled={disabled}
      />
      <label className="checkbox-wrapper__label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
