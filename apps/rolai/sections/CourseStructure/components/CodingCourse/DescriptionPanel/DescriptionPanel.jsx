import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Popup from '../../Popup/Popup';
import Instructions from '../Instructions/Instructions';
import useStyles from './DescriptionPanel.styles';

const TabPanel = (props) => {
  const styles = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={styles.tabPanelWrapper}>{children}</Box>
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

const DescriptionPanel = ({}) => {
  const styles = useStyles();
  const [value, setValue] = useState(0);
  const { lesson_notes } = useSelector((state) => state.courses);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const labelNote = (
    <Box display="flex" alignItems="center">
      <Typography> Notes </Typography>
      {lesson_notes?.general_notes && lesson_notes?.general_notes?.length > 0 && (
        <Typography className={styles.notesCount} ml={0.5}>
          {lesson_notes?.general_notes?.length}
        </Typography>
      )}
    </Box>
  );
  return (
    <Box className={styles.DescriptionWrapper}>
      <AppBar
        position="static"
        color="default"
        className={styles.appBarWrapper}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          className={styles.tabContainer}
        >
          <Tab label="Overview" {...a11yProps(0)} />
          {/* <Tab label={labelNote} {...a11yProps(1)} /> */}
          <Tab label='Notes' {...a11yProps(1)} />

        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Instructions />
      </TabPanel>
      <TabPanel value={value} index={1} className={styles.noteSection}>
        <Popup />
      </TabPanel>
    </Box>
  );
};

export default DescriptionPanel;
