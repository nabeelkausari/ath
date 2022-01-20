import { Box } from '@mui/system';
import React, { Component } from 'react';

import InputBase from '@mui/material/InputBase';

import useStyles from './Input.styles';
import { Label } from '../Common/Common';
import cx from 'classnames';
import { DebounceInput } from 'react-debounce-input';

const CustomInput = ({
  label,
  boxStyle,
  boxClass,
  noBorder,
  debounce,
  valueIcon,
  disabled,
  style,
  ...props
}) => {
  const styles = useStyles();
  return (
    <Box style={boxStyle} className={cx([styles.box, boxClass])}>
      <Label label={label} />
      {debounce ? (
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          className={cx([styles.input, noBorder && styles.noBorder])}
          {...props}
        />
      ) : (
        <Box position="relative">
          <InputBase
            rows={3}
            className={cx([
              styles.input,
              noBorder && styles.noBorder,
              disabled && styles.disabled,
            ])}
            disabled={disabled}
            style={{ paddingRight: valueIcon && '40px', ...style }}
            {...props}
          />
          {valueIcon && <Box className={styles.ico}>{valueIcon}</Box>}
        </Box>
      )}
    </Box>
  );
};

export default CustomInput;
