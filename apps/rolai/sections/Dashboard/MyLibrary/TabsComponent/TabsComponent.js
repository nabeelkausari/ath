import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import React, { Component } from 'react';

import useStyles from './TabsComponent.styles';

const TabsComponent = ({ selectedTab, handleChange, tabs }) => {
  const styles = useStyles();

  return (
    <Box className={styles.tabsParent}>
      <Tabs
        value={selectedTab.value}
        onChange={(e, value) =>
          handleChange(
            e,
            tabs.find((i) => i.value == value)
          )
        }
        textColor="primary"
        // variant="fullWidth"

        sx={{ minHeight: 'initial' }}
        // indicatorColor="primary"
        classes={{
          root: styles.tabs,
          flexContainer: 'flexContainer',
          indicator: 'indicator',
        }}
        // variant="fullWidth"
        TabIndicatorProps={{ children: <span /> }}
        centered
      >
        {tabs.map((tab, k) => (
          <Tab
            key={k}
            value={tab.value}
            label={tab.label}
            className={styles.tab}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabsComponent;
