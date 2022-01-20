import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../components/Layout';
import CodingCourse from '../../sections/CourseStructure/components/CodingCourse/CodingCourse';
import { getLessonNotes } from '../../store/courses/actions';
import {
  getCaseData,
  saveCode,
} from '../../store/courses/coding_course/actions';
import { getCookie } from '../../utils/helpers/storage';

function CodingConsole() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { my_profile_succeeded } = useSelector((state) => state.auth);
  const {
    coding_course: { fetch_case_succeeded, case_name },
  } = useSelector((state) => state.courses);
  const course_id = getCookie('COURSE_ID');
  const seq_id = getCookie('LESSON_ID');

  const isXl = useMediaQuery('(min-width:1920px)');
  const userParams = {
    user_id: router?.query?.user_id || '',
  };
  const headers = {
    'lis-result-sourcedid': router?.query?.['lis-result-sourcedid'] || '',
    'lis-outcome-service-url': router?.query?.['lis-outcome-service-url'] || '',
    token: router?.query?.token || '',
  };
  const case_id = router?.query?.case_id || '';
  const body = { headers: headers, params: userParams };

  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getCaseData(case_id, body, headers));
    }
  }, [my_profile_succeeded]);

  useEffect(() => {
    if (fetch_case_succeeded) {
      dispatch(getLessonNotes(course_id, seq_id));
      const intervalId = setInterval(() => {
        dispatch(saveCode());
      }, 20000);
      return () => clearInterval(intervalId);
    }
  }, [fetch_case_succeeded]);

  return (
    <Layout
      maxWidth={isXl ? 'lg' : 'md'}
      isBanner={true}
      title={case_name ? `${case_name} | Rolai` : 'Coding Course | Rolai'}
    >
      <CodingCourse />
    </Layout>
  );
}

export default CodingConsole;
