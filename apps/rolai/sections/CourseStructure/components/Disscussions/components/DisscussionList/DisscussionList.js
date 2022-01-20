import { Box } from '@mui/system';
import { Router, useRouter } from 'next/dist/client/router';
import React, { Component } from 'react';
import { useSelector } from 'react-redux';

import { scrollToId } from '../../../../../../utils/helpers/helperFunctions';
import { getUserIdFromProfile } from '../../../../../../utils/helpers/storage';
import CardSkeleton from '../../../../../Dashboard/CardSkeleton/CardSkeleton';
import { Comments } from '../../../../../Dashboard/Inbox/CommonComponents/CommonComponents';
import useStyles from './DisscussionList.styles';

const DisscussionList = () => {
  const styles = useStyles();
  const { course_discussions, course_discussions_requested } = useSelector(
    (state) => state.discussions
  );
  const user_id = getUserIdFromProfile();

  const myDiscussions = course_discussions.filter(
    (i) => i.author.id == user_id
  );
  return (
    <Box className={styles.parent}>
      <Box>
        <List
          list={course_discussions}
          heading={'Latest Discussions'}
          loading={course_discussions_requested}
        />
      </Box>
      <Box>
        <List
          list={myDiscussions}
          heading={'My Discussions'}
          loading={course_discussions_requested}
        />
      </Box>
    </Box>
  );
};

const List = ({ heading, list, loading }) => {
  const styles = useStyles();
  const router = useRouter();
  return (
    <Box className={styles.list}>
      <Box display="flex" justifyContent="space-between">
        <Box className={styles.heading}>{heading}</Box>
        {list.length > 0 && (
          <Box
            className={styles.link}
            onClick={() => {
              router.push('/dashboard/inbox/discussion-board');
            }}
          >
            View All ({list.length})
          </Box>
        )}
      </Box>
      <Box>
        {loading ? (
          <CardSkeleton cards={3} sx={{ margin: '20px 0' }} height={50} />
        ) : (
          list.slice(0, 5).map((item, k) => <Item key={k} item={item} />)
        )}
      </Box>
    </Box>
  );
};

const Item = ({ item }) => {
  const styles = useStyles();

  return (
    <Box
      className={styles.item}
      onClick={() => scrollToId(getDiscussionID(item.postId))}
    >
      <Box>{item.content}</Box>
      {item.totalCommentsCount !== undefined && (
        <Comments count={item.totalCommentsCount} />
      )}
    </Box>
  );
};
export default DisscussionList;

export const getDiscussionID = (id) => 'discussion-id-' + id;
