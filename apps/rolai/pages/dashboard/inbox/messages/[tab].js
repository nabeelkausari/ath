import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardSkeleton from '../../../../sections/Dashboard/CardSkeleton/CardSkeleton';
import { EmptyScreen } from '../../../../sections/Dashboard/Components/DashboardComponents/DashboardComponents';
import InboxLayout from '../../../../sections/Dashboard/Inbox/InboxLayout/InboxLayout';
import MessagesLayout from '../../../../sections/Dashboard/Inbox/MessagesLayout/MessagesLayout';
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
  { label: 'Messages', value: 1, tab: 'messages' },
  { label: 'Discussion Board', value: 2, tab: 'discussion-board' },
];
const MessagesStructure = () => {
  const styles = classes();
  const router = useRouter();

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
    <InboxLayout>
      {false ? (
        <>
          <CardSkeleton cards={5} sx={{ width: '350px', margin: 4 }} />

          <CardSkeleton
            cards={1}
            // width={'70%'}
            height={'580px'}
            sx={{ flex: 1, margin: 4 }}
          />
        </>
      ) : true ? (
        <MessagesLayout></MessagesLayout>
      ) : (
        <EmptyScreen name="LESSONSALL" style={{ height: '500px' }} expand />
      )}
    </InboxLayout>
  );
};

export default MessagesStructure;
