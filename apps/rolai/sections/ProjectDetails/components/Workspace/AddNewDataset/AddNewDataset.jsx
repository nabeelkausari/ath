import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getUploadLink } from '../../../../../store/workspace/datasets/actions';
import useStyles from './AddNewDataset.styles';
import ConnectToDataBase from './ConnectToDataBase/ConnectToDataBase';
import PreloadedDataset from './PreloadedDataset/PreloadedDataset';
import UploadDataSet from './UploadDataSet/UploadDataSet';

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
      {value === index && <Box>{children}</Box>}
    </div>
  );
};
const a11yProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
};

const AddNewDataset = ({}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getUploadLink());
  }, []);

  return (
    <Box>
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
        >
          <Tab label="Upload Dataset" {...a11yProps(0)} />
          <Tab label="Connect to Database" {...a11yProps(1)} />
          <Tab label="Use Preloaded Dataset" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <UploadDataSet />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ConnectToDataBase />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PreloadedDataset />
      </TabPanel>
    </Box>
  );
};

export default AddNewDataset;
