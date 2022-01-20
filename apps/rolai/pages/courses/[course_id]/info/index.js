import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CourseInfo from '../../../../sections/CourseStructure/components/CourseInfo/CourseInfo';
import StructureLayout from '../../../../sections/CourseStructure/components/StructureLayout/StructureLayout';
import {
  getCourseReviews,
  getCourseSyllabus,
} from '../../../../store/courses/actions';

const useStyles = makeStyles((theme) => ({
  info: {
    background: 'white',
  },
}));

const CourseInfoTab = () => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const { course_succeeded } = useSelector((state) => state.courses);

  useEffect(() => {
    if (course_succeeded) {
      dispatch(getCourseSyllabus());
      dispatch(getCourseReviews());
    }
  }, [course_succeeded]);

  return (
    <StructureLayout className={styles.info}>
      <CourseInfo />
    </StructureLayout>
  );
};

export default CourseInfoTab;
