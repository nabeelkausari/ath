import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../../components/Layout';
import CardSkeleton from '../../../sections/Dashboard/CardSkeleton/CardSkeleton';
import {
  EmptyScreen,
  FilterBlock,
  MY_COURSE_FILTER,
} from '../../../sections/Dashboard/Components/DashboardComponents/DashboardComponents';
import CourseCard from '../../../sections/Dashboard/MyCourses/CourseCard/CourseCard';
import LeftSectionLessons from '../../../sections/Dashboard/MyLibrary/LeftSectionLessons/LeftSectionLessons';
import LeftSection from '../../../sections/Dashboard/MyLibrary/LeftSectionNotes/leftSectionNotes';
import LeftSectionNotes from '../../../sections/Dashboard/MyLibrary/LeftSectionNotes/leftSectionNotes';
import RightSectionLessons from '../../../sections/Dashboard/MyLibrary/RightSectionLessons/RightSectionLessons';
import RightSection from '../../../sections/Dashboard/MyLibrary/RightSectionNotes/rightSectionNotes';
import RightSectionNotes from '../../../sections/Dashboard/MyLibrary/RightSectionNotes/rightSectionNotes';
import TabsComponent from '../../../sections/Dashboard/MyLibrary/TabsComponent/TabsComponent';
import { getMyOrganizationCourses } from '../../../store/courses/actions';
import { getWhereYouLeft } from '../../../store/dashboard/actions';
import { getMyOrganizationTracks } from '../../../store/tracks/actions';

const classes = makeStyles((theme) => ({
  parent: {
    flex: 1,
  },

  boxContainer: {
    display: 'grid',
    gridGap: '16px',
    gridTemplateColumns: 'repeat(3, 1fr)',
    justifyContent: 'start',
  },
  container: {
    padding: 20,
    paddingBottom: 0,
  },
  overflow: {
    overflow: 'auto',
    height: 'calc(100vh - 180px)',
    paddingBottom: 20,
  },
  heading: {
    fontWeight: 'bold',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0 5px 20px 5px',
  },
  filter: {
    display: 'flex',
    alignItems: 'center',
  },
}));
const tabs = [
  { label: 'Courses', value: 1, tab: 'courses' },
  { label: 'Learning Track', value: 2, tab: 'learning-track' },
];

const MyCourses = () => {
  const styles = classes();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = React.useState({});
  const [_document, set_document] = useState(null);
  const [filterData, setFilterData] = useState({
    opened: false,
    selected: 'ALL',
    items: [...Object.keys(MY_COURSE_FILTER)],
  });
  const dispatch = useDispatch();
  const { my_profile, my_profile_succeeded } = useSelector(
    (state) => state.auth
  );

  const { my_org_courses_requested, my_org_courses } = useSelector(
    (state) => state.courses
  );
  const { my_org_tracks_requested, my_org_tracks } = useSelector(
    (state) => state.tracks
  );
  useEffect(() => set_document(document), []);

  useEffect(() => {
    setSelectedTab(tabs.find((i) => i.tab == router.query.tab) || {});
  }, [router]);

  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getMyOrganizationCourses());
      dispatch(getMyOrganizationTracks());
    }
  }, [my_profile_succeeded]);

  const handleChange = (event, newValue) => {
    router.push(newValue.tab);
  };

  // useEffect(() => {
  //   let filtered =
  //     filterData.selected === 'ALL'
  //       ? course_syllabus
  //       : course_syllabus
  //           .map((i, k) => ({
  //             ...i,
  //             module_contents: i.module_contents.filter(
  //               (m, n) => m.type === filterData.selected
  //             ),
  //           }))
  //           .filter((i, k) => i.module_contents.length > 0);
  //   setCourse_syllabusFiltered(filtered);
  // }, [filterData.selected]);

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
        <Box className={styles.container}>
          <Box className={styles.topBar}>
            <Box className={styles.heading}>{selectedTab.label}</Box>
            <FilterBlock
              onClick={() => {}}
              filterData={filterData}
              setFilterData={setFilterData}
              anchor={_document && _document.getElementById('MY_COURSE_FILTER')}
            />
          </Box>

          <Box className={styles.overflow}>
            {my_org_courses_requested || my_org_tracks_requested ? (
              <>
                <Box margin={3}>
                  <CardSkeleton cards={3} direction="row" height={160} />
                </Box>
                <Box margin={3}>
                  <CardSkeleton cards={3} direction="row" height={160} />
                </Box>
                <Box margin={3}>
                  <CardSkeleton cards={3} direction="row" height={160} />
                </Box>
              </>
            ) : (
              <>
                {selectedTab.value == 1 ? (
                  my_org_courses[0] ? (
                    <Box className={styles.boxContainer}>
                      {my_org_courses
                        .filter((i, k) => !i._links.enroll)
                        .filter(
                          (i, k) =>
                            i.enrolled_status == filterData.selected ||
                            filterData.selected == 'ALL'
                        )
                        .map((item, k) => (
                          <CourseCard item={item} type={'COURSE'} key={k} />
                        ))}
                    </Box>
                  ) : (
                    <EmptyScreen name="COURSES" style={{ height: '500px' }} />
                  )
                ) : my_org_tracks[0] ? (
                  <Box className={styles.boxContainer}>
                    {my_org_tracks
                      .filter((i, k) => i._links.un_enroll)
                      .map((item, k) => (
                        <CourseCard key={k} item={item} type={'TRACK'} />
                      ))}
                  </Box>
                ) : (
                  <EmptyScreen name="TRACKS" style={{ height: '500px' }} />
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default MyCourses;
