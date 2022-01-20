import Box from '@mui/material/Box';
import React from 'react';
import { useSelector } from 'react-redux';

import CourseDetailsCard from '../../../CourseDetails/CourseDetailsCard/CourseDetailsCard';
import { InfoBox } from '../../../CourseDetails/CourseDetailsCard/CourseDetailsCard';
import CardSkeleton from './CourseInfoSkeleton';
import useStyles from './CourseInfo.styles';

const CourseInfo = ({}) => {
  const styles = useStyles();
  const { course_succeeded } = useSelector((state) => state.courses);

  if (!course_succeeded) {
    return <CardSkeleton />;
  }

  return (
    <Box className={styles.courseInfo}>
      <div className={styles.leftPanel}>
        <InfoBox isCourseInfo={true} />
      </div>
      <div className={styles.rightPanel}>
        <CourseDetailsCard isCourseInfo={true} />
      </div>
    </Box>
  );
};

export default CourseInfo;
