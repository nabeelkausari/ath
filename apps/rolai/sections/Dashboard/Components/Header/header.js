import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import React from 'react';

import { PALETTE_PRIMARY_MAIN } from '../../../../config/theme';
import useStyles from './header.styles';

const HeaderComponent = ({ title, link, linkText = 'View All' }) => {
  const styles = useStyles();
  const router = useRouter();
  return (
    <Box className={styles.parent}>
      <Box>{title}</Box>
      <Button
        variant="text"
        style={{
          cursor: link ? 'pointer' : 'initial',
          color: link ? PALETTE_PRIMARY_MAIN : '#00000055',
        }}
        onClick={() => link && router.push(link)}
        className={styles.button}
      >
        {linkText}
      </Button>
    </Box>
  );
};

export default HeaderComponent;
