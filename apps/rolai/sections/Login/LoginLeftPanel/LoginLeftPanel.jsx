import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import React from 'react';

import { LoginImage } from '../../../common/images';
import useStyles from './LoginLeftPanel.styles';

const LoginLeftPanel = ({ props }) => {
  const styles = useStyles();

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      className={styles.loginLeftPanel}
      paddingY={12}
    >
      <Box pb={4} paddingX={5}>
        <Image src={LoginImage} alt="Login" className={styles.loginImage} />
      </Box>
      <Box paddingX={3} display="flex" alignItems="center" flexDirection="column">
        <Typography variant="h6" className={styles.loginContent}>
          Ready To Start Learning Today?
        </Typography>
        <Typography variant="subtitle2" className={styles.loginSubContent}>
          Take the next step in your career with a world class learning
          experience.
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginLeftPanel;
