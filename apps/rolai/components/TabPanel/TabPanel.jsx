import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import cx from 'classnames';
import React, { useEffect, useState } from 'react';

import { StyledTabs } from './StyledTabs';
import useStyles from './TabPanel.styles';

const TabBody = ({ children, value, index, className, ...other }) => {
  const styles = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={cx(['tab-panel-wrapper', className])}>{children}</Box>
      )}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
};

const TabPanel = ({
  tabs = [],
  initialIndex = 0,
  currentIndex,
  variant = 'scrollable',
}) => {
  const styles = useStyles();
  const [value, setValue] = useState(initialIndex);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (tabs[newValue] && tabs[newValue].onClick) tabs[newValue].onClick();
  };

  // reset tab index to initialIndex|0 while step results change
  useEffect(() => {
    handleChange(null, initialIndex);
  }, [tabs[0]?.body?.props?.results?.id]);

  useEffect(() => {
    if (currentIndex !== undefined) {
      handleChange(null, currentIndex);
    }
  }, [currentIndex]);
  return (
    <>
      <AppBar
        position="static"
        color="default"
        className={styles.appBarWrapper}
      >
        <StyledTabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant={variant}
          scrollButtons="auto"
          className={styles.tabContainer}
        >
          {tabs.map((tab, i) => (
            <Tab key={i} label={tab.label} {...a11yProps(i)} />
          ))}
        </StyledTabs>
      </AppBar>
      {tabs.map((tab, i) => (
        <TabBody
          key={i}
          value={value}
          index={i}
          className={tab.className || ''}
        >
          {tab.body}
        </TabBody>
      ))}
    </>
  );
};

export default TabPanel;
