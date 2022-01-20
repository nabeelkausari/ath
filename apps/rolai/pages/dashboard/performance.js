import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../components/Layout';
import CardSkeleton from '../../sections/Dashboard/CardSkeleton/CardSkeleton';
import LeftSectionLessons from '../../sections/Dashboard/MyLibrary/LeftSectionLessons/LeftSectionLessons';
import LeftSection from '../../sections/Dashboard/MyLibrary/LeftSectionNotes/leftSectionNotes';
import LeftSectionNotes from '../../sections/Dashboard/MyLibrary/LeftSectionNotes/leftSectionNotes';
import RightSectionLessons from '../../sections/Dashboard/MyLibrary/RightSectionLessons/RightSectionLessons';
import RightSection from '../../sections/Dashboard/MyLibrary/RightSectionNotes/rightSectionNotes';
import RightSectionNotes from '../../sections/Dashboard/MyLibrary/RightSectionNotes/rightSectionNotes';
import TabsComponent from '../../sections/Dashboard/MyLibrary/TabsComponent/TabsComponent';
import AnalysisBlock from '../../sections/Dashboard/Performance/AnalysisBlock/AnalysisBlock';
import CourseAccordion from '../../sections/Dashboard/Performance/ProgressBlock/CourseAccordion/CourseAccordion';
import ProgressBlock from '../../sections/Dashboard/Performance/ProgressBlock/ProgressBlock';
import {
  getDashboardAllLessons,
  getDashboardAllNotes,
} from '../../store/dashboard/actions';
import {
  getDashboardPerformanceData,
  getPerformanceMetrics,
} from '../../store/performance/actions';

const classes = makeStyles((theme) => ({
  parent: {
    flex: 1,
  },
  container: {
    padding: 32,
    height: 'calc(100vh - 115px)',
    overflow: 'auto',
  },
}));
const tabs = [
  { label: 'Performance', value: 1 },
  { label: 'Badge', value: 2 },
  { label: 'Skills ', value: 3 },
];
const Performance = () => {
  const styles = classes();
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [moduleView, setModuleView] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState();
  const [selected, setSelected] = useState({});

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const dispatch = useDispatch();
  const { my_profile, my_profile_succeeded } = useSelector(
    (state) => state.auth
  );
  const { dashboard_performance_data, dashboard_performance_data_requested } =
    useSelector((state) => state.performance);

  useEffect(() => {
    // selected &&
    dispatch(getDashboardPerformanceData(selected.metric_key || 'ALL'));
    setSelectedCourse(undefined);
  }, [selected]);

  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getPerformanceMetrics());
    }
  }, [my_profile_succeeded]);
  const courseData = [1, 2, 3];
  const setSelectedMetric = (val) => {
    setSelected(val.metric_key == selected.metric_key ? {} : val);
  };
  return (
    <Layout
      maxWidth={'lg'}
      title="Dashboard Home | Rolai"
      container={false}
      dashboard={true}
      isFooter={false}
    >
      <Box className={styles.parent}>
        <TabsComponent
          selectedTab={selectedTab}
          handleChange={handleChange}
          tabs={tabs}
        />
        {selectedTab.value == 1 && (
          <Box className={styles.container}>
            <ProgressBlock
              selected={selected}
              setSelected={setSelectedMetric}
            />
            <AnalysisBlock
              selected={selected}
              setModuleView={setModuleView}
              moduleView={moduleView}
            />
            {dashboard_performance_data_requested ? (
              <CardSkeleton cards={5} height={60} sx={{ marginTop: '30px' }} />
            ) : (
              dashboard_performance_data.courses &&
              dashboard_performance_data.courses.map((course, k) => (
                <CourseAccordion
                  key={k}
                  course={course}
                  moduleView={moduleView}
                  selectedCourse={selectedCourse == k}
                  setSelectedCourse={() =>
                    setSelectedCourse((old) => (old == k ? undefined : k))
                  }
                />
              ))
            )}
          </Box>
        )}
        {selectedTab.value != 1 && (
          <Box className={styles.container}>work in progress</Box>
        )}
      </Box>
    </Layout>
  );
};

export default Performance;
