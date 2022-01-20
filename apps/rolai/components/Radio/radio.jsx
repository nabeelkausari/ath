import cx from 'classnames';
import React, { Fragment } from 'react';

import useStyles from './Radio.styles';

const Radio = ({ radio_list, selected_id, onSelect, horizontal }) => {
  const styles = useStyles();
  return (
    <div
      className={cx(
        styles.radio_group,
        horizontal ? styles.radio_group__horizontal : ''
      )}
    >
      {radio_list.map((element, i) => {
        return (
          <Fragment key={i}>
            <RadioItem
              checked={selected_id === element.value}
              handleChange={onSelect}
              element={element}
              text={element.label}
              horizontal={horizontal}
              label_color={element.label_color}
            />
            {element.helper_text && element.helper_text}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Radio;

function RadioItem(props) {
  const {
    element,
    checked,
    handleChange,
    text,
    horizontal,
    config_bar,
    label_color,
  } = props;
  const styles = useStyles();
  return (
    <div
      className={cx([
        styles.radio_group__item,
        element.disabled ? styles.radio_group__item__disabled : '',
        horizontal ? styles.radio_group__item__horizontal : '',
        element.wrong ? styles.radio_group__item__wrong : '',
        element.correct ? styles.radio_group__item__correct : '',
        element.warning ? styles.radio_group__item__warning : '',
        element.match ? styles.radio_group__item__match : '',
        element.user_selected_correct
          ? styles.radio_group__item__user_correct
          : '',
      ])}
    >
      <input
        type="radio"
        checked={checked}
        name={element.value}
        onChange={() => handleChange(element.value)}
        className={styles.radio_group__radio}
        id={element.value}
        disabled={element.disabled}
      />
      <label
        className={cx(
          'radio_group__label',
          checked ? 'radio_group__label__checked' : '',
          config_bar ? 'radio_group__label__1' : '',
          horizontal ? 'radio_group__label__horizontal' : ''
        )}
        htmlFor={element.value}
      >
        <div
          className={cx(
            'radio_group__radio_wrapper',
            checked ? 'radio_group__radio_wrapper__checked' : ''
          )}
        />
        <span className={styles.radio_group__label__text}>{text}</span>
      </label>
    </div>
  );
}
