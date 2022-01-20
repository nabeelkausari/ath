import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setDashboardDiscussionFilter } from '../../../../store/discussions/actions';
import Disscussion from '../../../CourseStructure/components/Disscussions/components/Disscussion/Disscussion';
import { filterDiscussionData } from '../../../CourseStructure/components/Disscussions/Disscussions';
import CardSkeleton from '../../CardSkeleton/CardSkeleton';
import {
  CourseTitleComponent,
  discussionSortItems,
} from '../CommonComponents/CommonComponents';
import useStyles from './RightSectionDiscussion.styles';

const RightSectionDiscussion = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { my_profile, my_profile_succeeded } = useSelector(
    (state) => state.auth
  );
  const {
    dashboard_filterData,
    dashboard_discussions,
    dashboard_discussions_requested,
  } = useSelector((state) => state.discussions);
  const [filtered, setFiltered] = useState({});

  const setSortBy = (data) => {
    dispatch(setDashboardDiscussionFilter({ sortBy: data }));
  };
  useEffect(() => {
    dashboard_discussions[0] &&
      setFiltered(dashboard_discussions[dashboard_filterData.selected]);
  }, [dashboard_filterData.selected, dashboard_discussions]);

  return (
    filtered &&
    (dashboard_discussions_requested ? (
      <Box className={styles.parent}>
        <CardSkeleton sx={{ marginTop: 5 }} />
        <CardSkeleton height={420} sx={{ marginTop: 5 }} />
      </Box>
    ) : (
      <Box className={styles.parent}>
        <CourseTitleComponent
          type={filtered && filtered.type}
          heading={filtered && filtered?.courseDetails?.courseName}
          // value={lesson_filter.searchValue}
          sort={{ onChange: setSortBy, value: dashboard_filterData.sortBy }}
        />
        <Box className={styles.rightBody}>
          <Box>
            {filterDiscussionData(filtered?.courses, dashboard_filterData).map(
              (item, k) => (
                <Box className={styles.wrapper} key={item.postId}>
                  <Disscussion data={item} />
                </Box>
              )
            )}
          </Box>
        </Box>
      </Box>
    ))
  );
};

export default RightSectionDiscussion;
