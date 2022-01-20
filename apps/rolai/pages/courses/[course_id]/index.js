import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../../components/Layout';
import CourseDetailsCard from '../../../sections/CourseDetails/CourseDetailsCard/CourseDetailsCard';
import {
  clearCourse,
  getCourse,
  getCourseReviews,
  getCourseSyllabus,
  updateLastAccessTrack,
} from '../../../store/courses/actions';

function CourseDetails() {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { my_profile_succeeded } = useSelector((state) => state.auth);
  const { course, course_succeeded } = useSelector((state) => state.courses);

  useEffect(() => {
    if (my_profile_succeeded && query?.course_id) {
      dispatch(getCourse(query.course_id));
    }
  }, [my_profile_succeeded, query?.course_id]);

  useEffect(() => {
    if (course_succeeded) {
      dispatch(getCourseSyllabus());
      dispatch(getCourseReviews());
    }
  }, [course_succeeded]);

  useEffect(() => {
    return () => dispatch(clearCourse());
  }, []);

  return (
    <>
      <Layout
        isBanner={false}
        container={false}
        title={course.title ? `${course.title} | Rolai` : 'Rolai'}
      >
        <CourseDetailsCard isCourseInfo={false} />
      </Layout>
    </>
  );
}

export default CourseDetails;
