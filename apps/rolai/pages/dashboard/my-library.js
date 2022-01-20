import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../components/Layout';
import CardSkeleton from '../../sections/Dashboard/CardSkeleton/CardSkeleton';
import { EmptyScreen } from '../../sections/Dashboard/Components/DashboardComponents/DashboardComponents';
import LeftSectionLessons from '../../sections/Dashboard/MyLibrary/LeftSectionLessons/LeftSectionLessons';
import LeftSectionNotes from '../../sections/Dashboard/MyLibrary/LeftSectionNotes/leftSectionNotes';
import RightSectionLessons from '../../sections/Dashboard/MyLibrary/RightSectionLessons/RightSectionLessons';
import RightSectionNotes from '../../sections/Dashboard/MyLibrary/RightSectionNotes/rightSectionNotes';
import TabsComponent from '../../sections/Dashboard/MyLibrary/TabsComponent/TabsComponent';
import {
  getDashboardAllLessons,
  getDashboardAllNotes,
} from '../../store/dashboard/actions';

const classes = makeStyles((theme) => ({
  parent: {
    flex: 1,
  },
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
}));
const tabs = [
  { label: 'Notes', value: 1 },
  { label: 'Saved Lessons', value: 2 },
];
const MyLibrary = () => {
  const styles = classes();
  const [selectedTab, setSelectedTab] = React.useState(tabs[0]);
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const dispatch = useDispatch();
  const { my_profile, my_profile_succeeded } = useSelector(
    (state) => state.auth
  );
  const {
    dashboard_all_lessons,
    dashboard_all_lessons_requested,
    dashboard_all_notes,
    dashboard_all_notes_requested,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getDashboardAllNotes());
      dispatch(getDashboardAllLessons());
    }
  }, [my_profile_succeeded]);

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
        {selectedTab.value === 1 ? (
          <Box className={styles.container}>
            {dashboard_all_notes_requested ? (
              <>
                <CardSkeleton cards={5} sx={{ width: '350px', margin: 4 }} />

                <CardSkeleton
                  cards={1}
                  // width={'70%'}
                  height={'580px'}
                  sx={{ flex: 1, margin: 4 }}
                />
              </>
            ) : dashboard_all_notes[0] ? (
              <>
                <LeftSectionNotes />
                <RightSectionNotes />
              </>
            ) : (
              <EmptyScreen name="NOTESALL" style={{ height: '500px' }} expand />
            )}
          </Box>
        ) : (
          <Box className={styles.container}>
            {dashboard_all_lessons_requested ? (
              <>
                <CardSkeleton cards={5} sx={{ width: '350px', margin: 4 }} />

                <CardSkeleton
                  cards={1}
                  // width={'70%'}
                  height={'580px'}
                  sx={{ flex: 1, margin: 4 }}
                />
              </>
            ) : dashboard_all_lessons[0] ? (
              <>
                <LeftSectionLessons />
                <RightSectionLessons />
              </>
            ) : (
              <EmptyScreen
                name="LESSONSALL"
                style={{ height: '500px' }}
                expand
              />
            )}
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default MyLibrary;
