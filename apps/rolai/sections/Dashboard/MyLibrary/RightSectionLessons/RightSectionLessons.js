import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getWhereYouLeft,
  updateDashboardLessonFilter,
} from '../../../../store/dashboard/actions';
import { courseType } from '../../../../utils/constants/components';
import CardSkeleton from '../../CardSkeleton/CardSkeleton';
import { NoSearchResult } from '../../Components/DashboardComponents/DashboardComponents';
import {
  CourseTitleComponent,
  HeaderBar,
} from '../CommonComponents/CommonComponents';
import LessonComponent from '../LessonComponent/LessonComponent';
import useStyles from './RightSectionLessons.styles';

const RightSectionLessons = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { my_profile, my_profile_succeeded } = useSelector(
    (state) => state.auth
  );
  const {
    dashboard_all_lessons,
    dashboard_all_lessons_requested,
    lesson_filter,
  } = useSelector((state) => state.dashboard);
  const [filtered, setFiltered] = useState({});
  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getWhereYouLeft());
    }
  }, [my_profile_succeeded]);

  const onChange = (e) => {
    dispatch(
      updateDashboardLessonFilter({
        ...lesson_filter,
        searchValue: e.target.value,
      })
    );
  };
  useEffect(() => {
    dashboard_all_lessons[0] &&
      setFiltered({
        ...dashboard_all_lessons[lesson_filter.selected],
        saved_lessons: {
          ...dashboard_all_lessons[lesson_filter.selected].saved_lessons,
          VIDEO:
            dashboard_all_lessons[lesson_filter.selected].saved_lessons.VIDEO &&
            dashboard_all_lessons[
              lesson_filter.selected
            ].saved_lessons.VIDEO.filter((i, k) =>
              i.title
                .toLowerCase()
                .includes(lesson_filter.searchValue.toLowerCase())
            ),
          PDF:
            dashboard_all_lessons[lesson_filter.selected].saved_lessons.PDF &&
            dashboard_all_lessons[
              lesson_filter.selected
            ].saved_lessons.PDF.filter((i, k) =>
              i.title
                .toLowerCase()
                .includes(lesson_filter.searchValue.toLowerCase())
            ),
        },
      });
  }, [
    lesson_filter.searchValue,
    lesson_filter.selected,
    dashboard_all_lessons.length,
  ]);
  return (
    filtered &&
    (dashboard_all_lessons_requested ? (
      <Box className={styles.parent}>
        <CardSkeleton sx={{ marginTop: 5 }} />
        <CardSkeleton height={420} sx={{ marginTop: 5 }} />
      </Box>
    ) : (
      <Box className={styles.parent}>
        <CourseTitleComponent
          type={filtered && filtered.type}
          heading={filtered && filtered.resource_name}
          value={lesson_filter.searchValue}
          onChange={onChange}
        />
        <Box className={styles.rightBody}>
          {filtered.saved_lessons &&
          (!filtered.saved_lessons.PDF ||
            filtered.saved_lessons.PDF.length == 0) &&
          (!filtered.saved_lessons.VIDEO ||
            filtered.saved_lessons.VIDEO.length == 0) &&
          lesson_filter.searchValue ? (
            <NoSearchResult />
          ) : (
            <>
              {filtered.saved_lessons &&
                filtered.saved_lessons.PDF &&
                filtered.saved_lessons.PDF.length > 0 && (
                  <Box>
                    <HeaderBar
                      heading={'Reading Material'}
                      count={filtered.saved_lessons.PDF.length}
                      icon={courseType.PDF.icon1}
                    />
                    <Box className={styles.boxContainer}>
                      {filtered.saved_lessons.PDF.map((item, k) => (
                        <LessonComponent
                          key={k}
                          course_id={filtered.resource_id}
                          item={{
                            info: '12 mins read',
                            title: item.title,
                            type: 'reading',
                            module_seq_id: item.module_seq_id,
                          }}
                          type="reading"
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              {filtered.saved_lessons &&
                filtered.saved_lessons.VIDEO &&
                filtered.saved_lessons.VIDEO.length > 0 && (
                  <Box>
                    <HeaderBar
                      heading={'Videos'}
                      count={filtered.saved_lessons.VIDEO.length}
                      icon={courseType.VIDEO.icon1}
                    />
                    <Box className={styles.boxContainer}>
                      {filtered.saved_lessons.VIDEO.map((item, k) => (
                        <LessonComponent
                          key={k}
                          course_id={filtered.resource_id}
                          item={{
                            info: '12 mins read',
                            title: item.title,
                            module_seq_id: item.module_seq_id,
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
            </>
          )}
        </Box>
      </Box>
    ))
  );
};

export default RightSectionLessons;
