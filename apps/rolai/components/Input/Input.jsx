import MuiInput from '@mui/material/Input';
import MuiInputLabel from '@mui/material/InputLabel';
import cx from 'classnames';
import React from 'react';

import useStyles from './Input.styles';

const Input = ({ label, ...props }) => {
  const styles = useStyles();

  return (
    <div className={cx([styles.inputContainer, props.className])}>
      <MuiInputLabel htmlFor="input-with-icon-adornment">{label}</MuiInputLabel>
      <MuiInput
        defaultValue=""
        inputProps={{ 'aria-label': 'description' }}
        {...props}
        className={styles.inputField}
      />
    </div>
  );
};

export default Input;
