import { Button, InputBase, Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import cx from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addIco,
  deletedActiveIco,
  deletedIco,
  messagesActiveIco,
  messagesIco,
  sendIco,
  starredActiveIco,
  starredIco,
} from '../../../../assets/Dashboard/Inbox';
import avatar from '../../../../assets/icons/avatar.svg';
import { capitalize } from '../../../../utils/helpers/helperFunctions';
import { Search } from '../../../Admin/Components/Common/Common';
import useStyles from './MessagesLayout.styles';

const messages = [
  {
    message:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
    time: '2/7/2021 09:27 AM',
    name: 'Leslie Palmer',
  },
  {
    message:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
    time: '2/7/2021 09:27 AM',
    name: 'Leslie Palmer',
  },
  {
    message:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
    time: '2/7/2021 09:27 AM',
    name: 'Leslie Palmer',
  },
  {
    message:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
    time: '2/7/2021 09:27 AM',
    name: 'Leslie Palmer',
  },
  {
    message:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
    time: '2/7/2021 09:27 AM',
    name: 'Leslie Palmer',
  },
];
const tabs = [
  { ico: messagesIco, activeIco: messagesActiveIco, value: 'all' },
  { ico: starredIco, activeIco: starredActiveIco, value: 'starred' },
  { ico: deletedIco, activeIco: deletedActiveIco, value: 'deleted' },
];
const MessagesLayout = () => {
  const styles = useStyles();
  const router = useRouter();
  const [selected, setSelected] = useState(1);
  const routerTab = router.query['tab'];

  const handleChange = (newValue) => {
    router.push(newValue);
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
    <Box className={styles.parent}>
      <Box className={styles.tabs}>
        {tabs.map((tab, k) => (
          <Box
            key={k}
            onClick={() => handleChange(tab.value)}
            className={cx([
              styles.tab,
              routerTab == tab.value && styles.activeTab,
            ])}
          >
            <Box>
              <Image src={routerTab == tab.value ? tab.activeIco : tab.ico} />
            </Box>
            {capitalize(tab.value)}
          </Box>
        ))}
      </Box>
      <Box className={styles.body}>
        <Box className={styles.left}>
          <Box className={styles.header}>
            <Box>{capitalize(routerTab)} Messages (12)</Box>
            <Button>
              <Image src={addIco} />
              <span style={{ marginLeft: '5px' }}> New</span>
            </Button>
          </Box>
          <Search className={styles.search} placeholder="Search Messages" />
          <Box className={styles.leftbody}>
            {[1, 2, 3, 4].map((user, k) => (
              <Box
                key={k}
                onClick={() => setSelected(user)}
                className={cx([
                  styles.user,
                  selected == user && styles.activeUser,
                ])}
              >
                <Box className={styles.avatar}>
                  <Image src={avatar} />
                </Box>
                <Box className={styles.userBody} flex={1}>
                  <Box className={styles.userName}>
                    <Box>Leslie Palmer</Box>
                    <Box>15 mins ago</Box>
                  </Box>
                  <Box className={styles.message}>
                    What is the best way to solve What is the best way to solve
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box className={styles.right}>
          <Box className={styles.topBar}>
            <Box display="flex" alignItems="center">
              <Box className={styles.avatar2}>
                <Image src={avatar} />
              </Box>
              <Box className={styles.name}>Leslie Palmer</Box>
            </Box>
          </Box>
          <Box className={styles.chat}>
            {messages.map((message, k) => (
              <Message key={k} owner={k == 2} />
            ))}
          </Box>
          <MessageInput />
        </Box>
      </Box>
    </Box>
  );
};

export default MessagesLayout;

const MessageInput = () => {
  const styles = useStyles();

  return (
    <Box className={styles.send}>
      <InputBase className={styles.input} placeholder="Type a message here" />
      <Button className={styles.sendBtn} variant="contained">
        <Image src={sendIco} />
      </Button>
    </Box>
  );
};

const Message = ({ owner, message = messages[0] }) => {
  const styles = useStyles();

  return (
    <Box className={cx([styles.allMessage, owner && styles.ownerMessage])}>
      <Box>
        <Box className={styles.avatarBox}>
          <Image src={avatar} />
        </Box>
        <Box>
          <Box className={styles.name2}>{message.name}</Box>

          <Box className={styles.messageText}>{message.message}</Box>
          <Box className={styles.time}>{message.time}</Box>
        </Box>
      </Box>
    </Box>
  );
};
