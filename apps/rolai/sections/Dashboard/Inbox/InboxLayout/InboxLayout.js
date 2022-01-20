import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../../../components/Layout';
import TabsComponent from '../../../../sections/Dashboard/MyLibrary/TabsComponent/TabsComponent';
import {
  getDashboardAllLessons,
  getDashboardAllNotes,
} from '../../../../store/dashboard/actions';

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
  {
    label: 'Messages',
    value: 1,
    tab: 'messages',
    link: '/dashboard/inbox/messages/all',
  },
  {
    label: 'Discussion Board',
    value: 2,
    tab: 'discussion-board',
    link: '/dashboard/inbox/discussion-board',
  },
];
const InboxLayout = ({ children }) => {
  const styles = classes();
  const router = useRouter();
  console.log(router);
  const selectedTab =
    tabs.find((i) => i.tab == router.asPath.split('/')[3]) || {};
  console.log(selectedTab, router.asPath.split('/'));
  const handleChange = (event, newValue) => {
    router.push(newValue.link);
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
        {children}
      </Box>
    </Layout>
  );
};

export default InboxLayout;
