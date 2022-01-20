import Box from '@mui/material/Box';
import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getWhereYouLeft,
  updateDashboardLessonFilter,
} from '../../../../store/dashboard/actions';
import CardSkeleton from '../../CardSkeleton/CardSkeleton';
import SimpleCard from '../../Components/SimpleCard/simpleCard';
import {
  BookmarkComponent,
  FilterBar,
} from '../CommonComponents/CommonComponents';
import useStyles from './LeftSectionLessons.styles';

const filterItems = {
  ALL: { name: 'All' },
  LEARNING_TRACK: { name: 'Learning Track' },
  COURSE: { name: 'Courses' },
};

const LeftSectionLessons = ({}) => {
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
    dashboard_all_lessons,
    dashboard_all_lessons_requested,
    lesson_filter,
  } = useSelector((state) => state.dashboard);
  // const [selected, setselected] = useState(0);

  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getWhereYouLeft());
    }
  }, [my_profile_succeeded]);

  const onSelect = (index) => {
    dispatch(
      updateDashboardLessonFilter({ ...lesson_filter, selected: index })
    );
  };

  const getLessonsCount = (arr) => {
    return (
      arr[0] &&
      [
        ...arr.map(
          (item, k) =>
            (item.saved_lessons.PDF ? item.saved_lessons.PDF.length : 0) +
            (item.saved_lessons.VIDEO ? item.saved_lessons.VIDEO.length : 0)
        ),
      ].reduce((a, b) => a + b, 0)
    );
  };

  return (
    <Box className={styles.parent}>
      <FilterBar
        heading={`Saved Lessons (${
          getLessonsCount(
            dashboard_all_lessons.filter(
              (i, k) =>
                i.type == filterData.selected || filterData.selected == 'ALL'
            )
          ) || 0
        })`}
        filterData={filterData}
        setFilterData={setFilterData}
        filterItems={filterItems}
      />
      <Box className={styles.container}>
        {dashboard_all_lessons_requested ? (
          <CardSkeleton cards={5} />
        ) : (
          dashboard_all_lessons
            .filter(
              (i, k) =>
                i.type == filterData.selected || filterData.selected == 'ALL'
            )
            .map(
              (item, k) =>
                (item.saved_lessons.PDF || item.saved_lessons.VIDEO) && (
                  <SimpleCard
                    key={k}
                    onSelect={() => onSelect(k)}
                    selected={lesson_filter.selected == k}
                    item={{
                      // description: Object.values(item.saved_lessons)[0][0].title,
                      type: item.type,
                      heading: item.resource_name,
                    }}
                    RightComponent={() =>
                      BookmarkComponent({
                        count:
                          (item.saved_lessons.PDF
                            ? item.saved_lessons.PDF.length
                            : 0) +
                          (item.saved_lessons.VIDEO
                            ? item.saved_lessons.VIDEO.length
                            : 0),
                      })
                    }
                  />
                )
            )
        )}
      </Box>
    </Box>
  );
};

export default LeftSectionLessons;
