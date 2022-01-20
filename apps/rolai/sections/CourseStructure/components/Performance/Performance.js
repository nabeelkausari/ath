import { Card } from '@mui/material';
import Box from '@mui/material/Box';
import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  CourseProgressIcon,
  EstimatedTimeIcon,
} from '../../../../common/images';
import { PALETTE_PRIMARY_MAIN } from '../../../../config/theme';
import { getCoursePerformanceData } from '../../../../store/performance/actions';
import { secondsToString } from '../../../../utils/helpers/helperFunctions';
import CardSkeleton from '../../../Dashboard/CardSkeleton/CardSkeleton';
import BarChart from './Components/BarChart/BarChart';
import { DetailBlock } from './Components/CommonComponents/CommonComponents';
import { PieDetail } from './Components/CommonComponents/CommonComponents';
import ModuleBox from './Components/ModuleBox/ModuleBox';
import ProgressPieChart from './Components/ProgressPieChart/ProgressPieChart';
import useStyles from './Performance.styles';

const data = [
  { color: PALETTE_PRIMARY_MAIN, value: 'overall_score', name: 'Overall' },
  { color: '#D46159', value: 'datacase_score', name: 'Data Cases' },
  { color: '#F68B67', value: 'quiz_score', name: 'Quizzes' },
  { color: '#F6BC2B', value: 'coding_case_score', name: 'Coding' },
];

const Performance = ({ course_id }) => {
  const styles = useStyles();
  const [selected, setSelected] = useState();
  const dispatch = useDispatch();
  const { my_profile, my_profile_succeeded } = useSelector(
    (state) => state.auth
  );
  const { course_performance_data, course_performance_data_requested } =
    useSelector((state) => state.performance);
  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getCoursePerformanceData(course_id));
    }
  }, [my_profile_succeeded]);

  return (
    <Box className={styles.parent}>
      <Box className={styles.heading}>Course Performance</Box>
      {course_performance_data_requested ? (
        <>
          <CardSkeleton cards={3} direction="row" height={300} />
          <CardSkeleton cards={5} height={70} sx={{ marginTop: '30px' }} />
        </>
      ) : (
        <>
          <Card className={styles.topCard}>
            <Box className={styles.first}>
              <DetailBlock
                data={{
                  name: 'Course Progress',
                  value: `${Math.round(
                    (course_performance_data.progress_percent || 0) * 100
                  )}%`,
                }}
                icon={CourseProgressIcon}
              />
              <DetailBlock
                data={{
                  name: 'Estimated Time',
                  value:
                    secondsToString(
                      course_performance_data.estimated_time_in_sec || 0
                    ) || '0 days',
                }}
                icon={EstimatedTimeIcon}
              />
            </Box>
            <Box>
              <Box className={styles.title}>Categories</Box>

              <BarChart
                performance_metrics={
                  course_performance_data?.performance_metrics
                    ?.performance_metrics || []
                }
              />
            </Box>
            <Box className={styles.pie}>
              <Box className={styles.title}>Grades</Box>

              <ProgressPieChart
                data={data.map((i, k) => ({
                  ...i,
                  value: course_performance_data[i.value],
                }))}
              />
              <Box className={styles.pieDetail}>
                {data.map((i, k) => (
                  <PieDetail
                    key={k}
                    data={{ ...i, value: course_performance_data[i.value] }}
                  />
                ))}
              </Box>
            </Box>
          </Card>
          {course_performance_data.modules &&
            course_performance_data.modules.map((module, k) => (
              <ModuleBox
                module={module}
                key={k}
                index={k}
                selected={selected == k}
                setSelected={() =>
                  setSelected((old) => (old == k ? undefined : k))
                }
              />
            ))}
        </>
      )}
    </Box>
  );
};

export default Performance;
