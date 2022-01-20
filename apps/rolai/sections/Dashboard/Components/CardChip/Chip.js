import Box from '@mui/material/Box';
import React, { Component } from 'react';

import { PALETTE_TEXT_MAIN } from '../../../../config/theme';
import useStyles from './Chip.styles';

const mapping = {
  CASE: {
    title: 'My Project',
    style: { backgroundColor: '#E2E6FC', color: '#2D43AA' },
  },
  COURSE: {
    title: 'Course',
    style: { backgroundColor: '#F9F0D1', color: '#AA8713' },
  },
  COLLABORATIVE: {
    title: 'Collabrative',
    style: { backgroundColor: '#D8F9E7', color: '#1F7044' },
  },
};

const CardChip = ({ name = '' }) => {
  console.log(name);
  const styles = useStyles();
  const data = (name && mapping[name]) || {};
  return (
    <Box className={styles.chip} style={data.style}>
      {data.title || name.toLowerCase()}
    </Box>
  );
};

export default CardChip;
