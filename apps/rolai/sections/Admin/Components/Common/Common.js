import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Box } from '@mui/system';
import cx from 'classnames';
import Image from 'next/image';
import React from 'react';

import { searchIcon } from '../../../../common/images';
import Input from '../../Components/Input/Input';
import { useSearchStyles, useStatusBarStyles } from './Common.styles';

export const StatusBar = ({ status, handleChange, boxStyle, boxClass }) => {
  const styles = useStatusBarStyles();
  const items = ['Active', 'InActive'];
  return (
    <Box style={{ ...boxStyle }} className={cx([boxClass, styles.parent])}>
      <Label label={'Status'} />
      <Box className={styles.box}>
        {items.map((i, k) => (
          <Box
            key={k}
            className={status === i && styles.active}
            onClick={() => handleChange(i)}
          >
            {i}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export const Label = ({ label }) => {
  return label ? <Box style={{ marginBottom: '5px' }}>{label}</Box> : null;
};

export const Search = ({ placeholder, value, onChange, className }) => {
  const styles = useSearchStyles();
  return (
    <Box className={cx([styles.search, className])}>
      <Image src={searchIcon} width={14} height={14} />
      <Input
        noBorder
        placeholder={placeholder || 'Search'}
        onChange={onChange}
        value={value}
      />
    </Box>
  );
};
