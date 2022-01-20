import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getCourseDiscussions,
  getCourseStructure,
} from '../../../../store/discussions/actions';
import CardSkeleton from '../../../Dashboard/CardSkeleton/CardSkeleton';
import { discussionSortItems } from '../../../Dashboard/Inbox/CommonComponents/CommonComponents';
import Disscussion, {
  NewDiscussion,
} from './components/Disscussion/Disscussion';
import TopBar from './components/Disscussion/TopBar/TopBar';
import DisscussionList, {
  getDiscussionID,
} from './components/DisscussionList/DisscussionList';
import useStyles from './Disscussions.styles';

const Disscussions = ({ course_id }) => {
  const styles = useStyles();
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const { my_profile, my_profile_succeeded } = useSelector(
    (state) => state.auth
  );
  const { course_discussions, course_discussions_requested, filterData } =
    useSelector((state) => state.discussions);

  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getCourseStructure(course_id));
      dispatch(getCourseDiscussions(course_id));
    }
  }, [my_profile_succeeded]);

  // useEffect(() => {}, [filterData.sortBy]);

  return (
    <Box className={styles.parent}>
      <Box className={styles.leftWrapper}>
        <Box className={styles.left}>
          <TopBar setOpened={() => setOpened(!opened)} opened={opened} />
          <Box pb={'30px'}>
            {opened && (
              <Box className={styles.wrapper}>
                <NewDiscussion
                  setOpened={() => setOpened(!opened)}
                  course_id={course_id}
                />
              </Box>
            )}
            {course_discussions_requested ? (
              <CardSkeleton cards={3} sx={{ margin: '40px 0' }} height={400} />
            ) : (
              filterDiscussionData(course_discussions, filterData).map(
                (item, k) => (
                  <Box
                    className={styles.wrapper}
                    key={item.postId}
                    id={getDiscussionID(item.postId)}
                  >
                    <Disscussion data={item} />
                  </Box>
                )
              )
            )}
          </Box>
        </Box>
      </Box>
      <DisscussionList />
    </Box>
  );
};

export default Disscussions;

export const filterDiscussionData = (data, filter) => {
  console.log('filtering');
  console.log(data?.map((i) => i.pinned));
  const { side, key } = filter.sortBy || discussionSortItems[0];
  const { lesson, module } = filter;
  console.log(lesson, module);
  return data
    ? data
        .filter((i) => {
          const { moduleSequenceId, moduleId } = i?.courseDetails || {};
          const status = lesson
            ? moduleSequenceId == lesson
            : module
            ? moduleId == module
            : true;

          return status;
        })
        .sort((a, b) => {
          if (a[key] > b[key]) return side * -1;
          else return side * 1;
        })
    : [];
};
