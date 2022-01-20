import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../components/Layout';
import CoursesSection from '../../sections/MyOrganisation/Courses/Courses';
import ProjectsSection from '../../sections/MyOrganisation/Projects/Projects';
import TracksSection from '../../sections/MyOrganisation/Tracks/Tracks';
import { getMyOrganizationCases } from '../../store/cases/actions';
import { getMyOrganizationCourses } from '../../store/courses/actions';
import { getMyOrganizationTracks } from '../../store/tracks/actions';

function MyOrganization() {
  const dispatch = useDispatch();
  const { my_profile_succeeded } = useSelector((state) => state.auth);
  const isXl = useMediaQuery('(min-width:1920px)');

  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getMyOrganizationCourses());
      dispatch(getMyOrganizationCases());
      dispatch(getMyOrganizationTracks());
    }
  }, [my_profile_succeeded]);
  return (
    <>
      <Layout
        maxWidth={isXl ? 'lg' : 'md'}
        isBanner={true}
        title="My Organization | Rolai"
      >
        <>
          <TracksSection />
          <ProjectsSection />
          <CoursesSection />
          <div style={{ height: '40px' }} />
        </>
      </Layout>
    </>
  );
}

export default MyOrganization;
