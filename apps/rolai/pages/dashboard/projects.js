import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CloneProject from '../../components/CloneProject/CloneProject';
import Layout from '../../components/Layout';
import CardSkeleton from '../../sections/Dashboard/CardSkeleton/CardSkeleton';
import {
  EmptyScreen,
  FilterBlock,
} from '../../sections/Dashboard/Components/DashboardComponents/DashboardComponents';
import CourseCard from '../../sections/Dashboard/MyCourses/CourseCard/CourseCard';
import LeftSectionLessons from '../../sections/Dashboard/MyLibrary/LeftSectionLessons/LeftSectionLessons';
import LeftSection from '../../sections/Dashboard/MyLibrary/LeftSectionNotes/leftSectionNotes';
import LeftSectionNotes from '../../sections/Dashboard/MyLibrary/LeftSectionNotes/leftSectionNotes';
import RightSectionLessons from '../../sections/Dashboard/MyLibrary/RightSectionLessons/RightSectionLessons';
import RightSection from '../../sections/Dashboard/MyLibrary/RightSectionNotes/rightSectionNotes';
import RightSectionNotes from '../../sections/Dashboard/MyLibrary/RightSectionNotes/rightSectionNotes';
import TabsComponent from '../../sections/Dashboard/MyLibrary/TabsComponent/TabsComponent';
import ProjectCard from '../../sections/Dashboard/Projects/ProjectCard/ProjectCard';
import {
  getDashboardCases,
  getMyOrganizationCases,
} from '../../store/cases/actions';
import { getWhereYouLeft } from '../../store/dashboard/actions';

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
  overflow: {
    overflow: 'auto',
    height: 'calc(100vh - 190px)',
    paddingBottom: 20,
  },
}));
const tabs = [
  { label: 'My Projects', value: 1, label2: 'Projects' },
  { label: 'Shared With Me', value: 2, label2: 'Shared With Me' },
];
const Projects = () => {
  const styles = classes();
  const [selectedTab, setSelectedTab] = React.useState(tabs[0]);
  const [filterData, setFilterData] = useState({
    opened: false,
    selected: 'ALL',
    items: [],
  });
  const dispatch = useDispatch();
  const { my_profile, my_profile_succeeded } = useSelector(
    (state) => state.auth
  );
  const { my_org_cases_requested, my_org_cases } = useSelector(
    (state) => state.cases
  );

  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getDashboardCases());
    }
  }, [my_profile_succeeded]);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
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
        <Box className={styles.container}>
          <Box className={styles.topBar}>
            <Box className={styles.heading}>{selectedTab.label2}</Box>
            {selectedTab.value == 1 && (
              <CloneProject create_new={my_profile?._links?.create_problem} />
            )}
          </Box>

          <Box className={styles.overflow}>
            {my_org_cases_requested ? (
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
                  my_org_cases.filter((i, k) => !i.shared)[0] ? (
                    <Box className={styles.boxContainer}>
                      {my_org_cases
                        .filter((i, k) => !i.shared)
                        .map((item, k) => (
                          <ProjectCard key={k} item={item} />
                        ))}
                    </Box>
                  ) : (
                    <EmptyScreen
                      name="PROJECTSALL"
                      style={{ height: '500px' }}
                    />
                  )
                ) : my_org_cases.filter((i, k) => i.shared)[0] ? (
                  <Box className={styles.boxContainer}>
                    {my_org_cases
                      .filter((i, k) => i.shared)
                      .map((item, k) => (
                        <ProjectCard key={k} item={item} />
                      ))}
                  </Box>
                ) : (
                  <EmptyScreen name="PROJECTSALL" style={{ height: '500px' }} />
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Projects;
