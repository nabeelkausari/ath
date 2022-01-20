import { Card, Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import React, { Component } from 'react';

import { EmptyScreen } from '../../Components/DashboardComponents/DashboardComponents';
import HeaderComponent from '../../Components/Header/header';
import useStyles from './DiscussionComponent.styles';

const DiscussionComponent = () => {
  const styles = useStyles();

  return (
    <Box className={styles.parent}>
      <HeaderComponent title={'DISCUSSIONS'} />
      <Card className={styles.card}>
        {false ? (
          <Box></Box>
        ) : (
          <EmptyScreen
            name="DISCUSSION"
            imgWidth={'20vh'}
            style={{ height: '100%' }}
          />
        )}
      </Card>
    </Box>
  );
};

export default DiscussionComponent;
