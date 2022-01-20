import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../../components/Layout';
import CardSkeleton from '../../../sections/Dashboard/CardSkeleton/CardSkeleton';
import { EmptyScreen } from '../../../sections/Dashboard/Components/DashboardComponents/DashboardComponents';
import InboxLayout from '../../../sections/Dashboard/Inbox/InboxLayout/InboxLayout';
import LeftSectionDiscussion from '../../../sections/Dashboard/Inbox/LeftSectionDiscussion/LeftSectionDiscussion';
import RightSectionDiscussion from '../../../sections/Dashboard/Inbox/RightSectionDiscussion/RightSectionDiscussion';
import LeftSectionLessons from '../../../sections/Dashboard/MyLibrary/LeftSectionLessons/LeftSectionLessons';
import LeftSection from '../../../sections/Dashboard/MyLibrary/LeftSectionNotes/leftSectionNotes';
import LeftSectionNotes from '../../../sections/Dashboard/MyLibrary/LeftSectionNotes/leftSectionNotes';
import RightSectionLessons from '../../../sections/Dashboard/MyLibrary/RightSectionLessons/RightSectionLessons';
import RightSection from '../../../sections/Dashboard/MyLibrary/RightSectionNotes/rightSectionNotes';
import RightSectionNotes from '../../../sections/Dashboard/MyLibrary/RightSectionNotes/rightSectionNotes';
import TabsComponent from '../../../sections/Dashboard/MyLibrary/TabsComponent/TabsComponent';
import {
  getDashboardAllLessons,
  getDashboardAllNotes,
} from '../../../store/dashboard/actions';
import { getDashboardDiscussions } from '../../../store/discussions/actions';

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
  { label: 'Messages', value: 1, tab: 'messages' },
  { label: 'Discussion Board', value: 2, tab: 'discussion-board' },
];
const Inbox = () => {
  const styles = classes();
  const router = useRouter();
  const selectedTab = tabs.find((i) => i.tab == router.query.tab) || {};
  const subTab = router.query['sub-tab'] || 'starred';

  const handleChange = (event, newValue) => {
    router.push(newValue.tab);
  };

  const dispatch = useDispatch();
  const { my_profile, my_profile_succeeded } = useSelector(
    (state) => state.auth
  );
  const {
    dashboard_filterData,
    dashboard_discussions,
    dashboard_discussions_requested,
  } = useSelector((state) => state.discussions);
  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getDashboardDiscussions());
    }
  }, [my_profile_succeeded]);
  console.log(dashboard_discussions);
  return (
    <InboxLayout>
      <Box className={styles.container}>
        {dashboard_discussions_requested ? (
          <>
            <CardSkeleton cards={5} sx={{ width: '350px', margin: 4 }} />

            <CardSkeleton
              cards={1}
              // width={'70%'}
              height={'580px'}
              sx={{ flex: 1, margin: 4 }}
            />
          </>
        ) : dashboard_discussions[0] ? (
          <>
            <LeftSectionDiscussion />
            <RightSectionDiscussion />
          </>
        ) : (
          <EmptyScreen name="LESSONSALL" style={{ height: '500px' }} expand />
        )}
      </Box>
    </InboxLayout>
  );
};

export default Inbox;
