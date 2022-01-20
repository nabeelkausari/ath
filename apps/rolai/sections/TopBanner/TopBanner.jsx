import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

import useStyles from './TopBanner.styles';

const TopBanner = ({ props }) => {
  const styles = useStyles();
  const auth = useSelector((state) => state.auth);

  return (
    <Container
      fixed
      disableGutters={true}
      maxWidth="xl"
      className={styles.bannerContainer}
    >
      <Box className={styles.banner}>
        <Typography component="div" className={styles.bannerImage}>
          {auth?.my_profile?.tenant_organization_logo && (
            <>
              <img
                src={auth?.my_profile?.tenant_organization_logo}
                className={styles.bannerLogo}
                alt="Organization Logo"
              />
            </>
          )}
        </Typography>
        <Typography component="div" className={styles.bannerContent}>
          <Typography variant="h6">
            Welcome to {auth?.my_profile?.tenant_organization_display_name}{' '}
            learning center.
          </Typography>
          <Typography variant="body2">
            You can explore and learn from the variety of courses, learning
            tracks, and projects - prepaid and recommended by your organization.
          </Typography>
        </Typography>
      </Box>
    </Container>
  );
};

export default TopBanner;
