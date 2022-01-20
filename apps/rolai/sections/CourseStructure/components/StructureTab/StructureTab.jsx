import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import cx from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { StyledTabs } from '../../../../components/TabPanel/StyledTabs';
import useStyles from './StructureTab.styles';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
};

const structurePathNames = {
  '/courses/[course_id]/lesson/[seq_id]': 0,
  '/courses/[course_id]/performance': 1,
  '/courses/[course_id]/my-library': 2,
  '/courses/[course_id]/discussions': 3,
  '/courses/[course_id]/info': 4,
};

const structureRoutes = [
  '/lesson/overview',
  '/performance',
  '/my-library',
  '/discussions',
  '/info',
];

export default function StructureTab({ children, className }) {
  const styles = useStyles();
  const router = useRouter();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    return router.push(
      `/courses/${router?.query?.course_id}${structureRoutes[newValue]}`
    );
  };
  useEffect(() => {
    setValue(structurePathNames[router.pathname]);
  }, [router.pathname]);

  return (
    <div className={styles.root}>
      <AppBar className={styles.tabContainer} position="static" color="default">
        <StyledTabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          className={styles.tabs}
        >
          <Tab label="Course" {...a11yProps(0)} />
          <Tab label="Performance" {...a11yProps(1)} />
          <Tab label="My Library" {...a11yProps(2)} />
          <Tab label="Discussion Board" {...a11yProps(3)} />
          <Tab label="Course Info" {...a11yProps(4)} />
        </StyledTabs>
      </AppBar>
      <TabPanel
        value={value}
        index={structurePathNames[router.pathname]}
        className={cx([styles.panel, className])}
      >
        {children}
      </TabPanel>
    </div>
  );
}
