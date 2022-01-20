import Box from '@mui/material/Box';
import React from 'react';

import { PALETTE_TEXT_MAIN } from '../../../../config/theme';
import useStyles from './Chip.styles';

const mapping = { CASE: 'Project' };

const Chip = ({
  name,
  color = PALETTE_TEXT_MAIN,
  backgroundColor = '#E6E6E6',
}) => {
  const styles = useStyles();
  return (
    <Box className={styles.chip} style={{ color, backgroundColor }}>
      {name && (mapping[name] || name.toLowerCase())}
    </Box>
  );
};

export default Chip;
