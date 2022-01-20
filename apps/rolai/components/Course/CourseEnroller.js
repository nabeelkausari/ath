import LoadingButton from '@mui/lab/LoadingButton';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RightArrow } from '../../common/images';
import { enrollCourse, startCourse } from '../../store/courses/actions';
import Button from '../Button';

const CourseEnroller = ({ course, page }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [enrolling, setEnrolling] = useState(null);
  const courses = useSelector((state) => state.courses);
  const enrolled = course?._links?.resume || course?._links?.start;

  const handleClick = () => {
    setEnrolling(true);
    dispatch(enrollCourse(course?._links?.enroll, course.code));
  };

  useEffect(() => {
    if (courses?.enroll_course_failed || courses?.enroll_course_succeeded) {
      setEnrolling(false);
    }
  }, [courses?.enroll_course_failed, courses?.enroll_course_succeeded]);

  const handleResume = () => {
    if (course?._links?.start) {
      dispatch(startCourse(course._links.start));
    } else if (course?._links?.resume) {
      dispatch(startCourse(course._links.resume));
    }
    return router.push(`/courses/${course.course_id}/lesson/overview`);
  };

  return enrolled ? (
    <Button onClick={handleResume} variant="contained">
      {course?._links?.resume ? 'Resume' : 'Start'}
    </Button>
  ) : (
    <LoadingButton
      loading={enrolling}
      variant="contained"
      onClick={handleClick}
      endIcon={<Image src={RightArrow} width={12} height={9} />}
    >
      Enroll Now
    </LoadingButton>
  );
};

export default CourseEnroller;
