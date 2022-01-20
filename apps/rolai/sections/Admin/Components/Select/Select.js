import { MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import cx from 'classnames';
import Image from 'next/image';
import React, { Component } from 'react';

import { droopdownIcon } from '../../../../assets/Dashboard/Inbox';
import { Label } from '../Common/Common';
import useStyles from './Select.styles';

export const SelectComp = ({
  label,
  items = [],
  onChange,
  value = 'unset',
  placeholder,
  icon,
  boxStyle,
  boxClass,
  noBorder = false,
  all,
}) => {
  const styles = useStyles();

  const IconComponent = ({ className, ...props }) =>
    icon ? (
      <Box
        style={{ width: '14px', minWidth: '14px', marginRight: '5px' }}
        {...props}
      >
        <Image src={icon} width={15} />
      </Box>
    ) : (
      <Box
        style={{
          width: '14px',
          minWidth: '14px',
          marginRight: '5px',
          marginTop: -2,
        }}
        className={className}
        {...props}
      >
        <Image src={droopdownIcon} width={15} />
      </Box>
    );

  if (all) items = [{ label: 'All', value: 'ALL' }, ...items];
  return (
    <Box
      style={{ width: '200px', ...boxStyle }}
      className={cx([boxClass, styles.parent])}
    >
      <Label label={label} />

      <Select
        onOpen={(e) => e.stopPropagation()}
        className={cx([
          styles.input,
          styles.select,
          noBorder && styles.noBorder,
        ])}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        renderValue={(val) =>
          val === 'unset' ? (
            <span style={{ color: '#00000044' }}>{placeholder}</span>
          ) : (
            items.find((i, k) => i.value === val)?.label
          )
        }
        MenuProps={MenuProps}
        IconComponent={IconComponent}
      >
        <option
          value="unset"
          // selected
          disabled
          hidden
          style={{ color: '#00000044' }}
        >
          {placeholder}
        </option>

        {items.map((item, k) => (
          <MenuItem
            className={styles.menuItem}
            key={k}
            value={item.value}
            disabled={item.disabled}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

const MenuProps = {
  PaperProps: {
    style: {
      borderRadius: 10,
      maxHeight: 250,
      // maxWidth: '400px',
      marginTop: 10,
    },
  },
};

export default SelectComp;
