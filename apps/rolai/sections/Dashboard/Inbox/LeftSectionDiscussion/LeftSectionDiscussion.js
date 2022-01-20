import Box from '@mui/material/Box';
import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getWhereYouLeft,
  updateDashboardLessonFilter,
} from '../../../../store/dashboard/actions';
import {
  getDashboardDiscussions,
  setDashboardDiscussionFilter,
} from '../../../../store/discussions/actions';
import CardSkeleton from '../../CardSkeleton/CardSkeleton';
import SimpleCard from '../../Components/SimpleCard/simpleCard';
import { FilterBar } from '../../MyLibrary/CommonComponents/CommonComponents';
import useStyles from './LeftSectionDiscussion.styles';

const filterItems = {
  ALL: { name: 'All' },
  LEARNING_TRACK: { name: 'Learning Track' },
  COURSE: { name: 'Courses' },
};

const LeftSectionDiscussion = ({}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { my_profile, my_profile_succeeded } = useSelector(
    (state) => state.auth
  );
  const [filterData, setFilterData] = useState({
    opened: false,
    selected: 'ALL',
    items: [...Object.keys(filterItems)],
  });
  const {
    dashboard_filterData,
    dashboard_discussions,
    dashboard_discussions_requested,
  } = useSelector((state) => state.discussions);
  // const [selected, setselected] = useState(0);

  const onSelect = (index) => {
    dispatch(
      setDashboardDiscussionFilter({ ...dashboard_filterData, selected: index })
    );
  };

  return (
    <Box className={styles.parent}>
      <FilterBar
        heading={'Discussions'}
        filter={false}
        filterData={filterData}
        setFilterData={setFilterData}
        filterItems={filterItems}
      />
      <Box className={styles.container}>
        {dashboard_discussions_requested ? (
          <CardSkeleton cards={5} />
        ) : (
          dashboard_discussions
            .filter(
              (i, k) =>
                i.type == filterData.selected || filterData.selected == 'ALL'
            )
            .map((item, k) => (
              <SimpleCard
                key={k}
                onSelect={() => onSelect(k)}
                selected={dashboard_filterData.selected == k}
                item={{
                  // description: Object.values(item.saved_lessons)[0][0].title,
                  type: 'COURSE',
                  heading: item.courseDetails.courseName,
                }}
              />
            ))
        )}
      </Box>
    </Box>
  );
};

export default LeftSectionDiscussion;
