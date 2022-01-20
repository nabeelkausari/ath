import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

import useStyles from './CompareSteps.styles';
import CustomAceEditor from '../CustomAceEditor/CustomAceEditor';
import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useState } from 'react';
import { Tooltip, Typography } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyRounded from '@mui/icons-material/FileCopyRounded';

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

const TabPanelContainer = ({ refValue, label }) => {
  const styles = useStyles();
  const [value, setValue] = useState(0);
  const { coding_course } = useSelector((state) => state.courses);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box className={styles.consoleAppBarWrapper}>
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
            <Tab label={label} {...a11yProps(0)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <CustomAceEditor value={refValue} readOnly={true} fullScreen={true} />
        </TabPanel>
      </Box>
    </>
  );
};
const CompareSteps = ({}) => {
  const styles = useStyles();
  const { coding_course } = useSelector((state) => state.courses);
  const compare_steps_data = coding_course?.compare_steps_data;
  return (
    <Box className={styles.compareSteps}>
      <TabPanelContainer
        label="My Code"
        refValue={compare_steps_data?.answer_step}
      />
      <Typography className={styles.divider}></Typography>
      <TabPanelContainer
        label="Reference Code"
        refValue={compare_steps_data?.user_code}
      />
      <CopyToClipboard text={compare_steps_data?.answer_step}>
        <Tooltip title="Copy Code" placement="top">
          <Box className={styles.copyCode}>
            <FileCopyRounded />
          </Box>
        </Tooltip>
      </CopyToClipboard>
    </Box>
  );
};

export default CompareSteps;
