import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ExpandIcon, ResetIcon } from '../../../../../common/images';
import {
  ResetCode,
  UpdatedMode,
} from '../../../../../store/courses/coding_course/actions';
import { showDialog } from '../../../../../store/global/actions';
import ConsoleActions from '../ConsoleActions/ConsoleActions';
import ConsoleDataTable from '../ConsoleDataTable/ConsoleDataTable';
import CustomAceEditor from '../CustomAceEditor/CustomAceEditor';
import Output from '../Output/Output';
import useStyles from './ConsolePanel.styles';
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

const TabPanelContainer = ({fullScreen=false, ...props}) => {
  const styles = useStyles();
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const { coding_course } = useSelector((state) => state.courses);
  const data = coding_course?.milestone_data;
  const HandleExpandView = () => {
    dispatch(
      showDialog({
        options: {
          hide_header: true,
          maxWidth: true,
          minHeight: true,
          component: TabPanelContainer,
          component_props:{fullScreen:true},
          fullScreen:true,
          no_button: {
            text: 'Close',
          },
        },
      })
    );
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const HandleResetCode = () => {
    dispatch(
      showDialog({
        options: {
          title: 'Confirmation',
          message: 'Are you sure you want to reset the code?',
          yes_button: {
            text: 'Continue',
            onClick: () => {
              dispatch(UpdatedMode('reset'));
              dispatch(ResetCode());
              return true;
            },
          },
          no_button: {
            text: 'Close',
          },
          items_centered: true,
        },
      })
    );
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
            <Tab label="Coding Console" {...a11yProps(0)} />
            {data?.data_dictionary_path && (
              <Tab label="Data Dictionary" {...a11yProps(1)} />
            )}
            {data?.ui_data_path && (
              <Tab label="Data Preview" {...a11yProps(2)} />
            )}
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <CustomAceEditor value={data?.template_code} fullScreen={fullScreen}/>
        </TabPanel>
        <TabPanel value={value} index={1} className={styles.noteSection}>
          <ConsoleDataTable content={coding_course?.data_dictionary_content} fullScreen={fullScreen}/>
        </TabPanel>
        <TabPanel value={value} index={2} className={styles.noteSection}>
          <ConsoleDataTable content={coding_course?.ui_data_content} fullScreen={fullScreen}/>
        </TabPanel>
        <Box id="console-actions">
          <Box className={styles.resetCode} title="Reset Code">
            <Image
              src={ResetIcon}
              width={19}
              height={19}
              onClick={() => HandleResetCode()}
            />
          </Box>
          <Box className={styles.expandConsole} title="Expand">
            <Image
              src={ExpandIcon}
              width={17}
              height={17}
              onClick={() => HandleExpandView()}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

const ConsolePanel = () => {
  const styles = useStyles();

  return (
    <Box className={styles.ConsolePanel}>
      <TabPanelContainer />
      <ConsoleActions />
      <Output />
    </Box>
  );
};

export default ConsolePanel;
