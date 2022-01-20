import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumbs from '../../components/Breadcrumbs';
import Layout from '../../components/Layout';
import Courses from '../../sections/MyOrganisation/Courses/Courses';
import { getMyOrganizationCourses } from '../../store/courses/actions';

function MyOrganizationCourses() {
  const dispatch = useDispatch();
  const { my_profile_succeeded } = useSelector((state) => state.auth);

  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getMyOrganizationCourses());
    }
  }, [my_profile_succeeded]);
  return (
    <Layout
      maxWidth="lg"
      isBanner={true}
      title="My Organization Courses | Rolai"
    >
      <>
        <Breadcrumbs
          activeTitle="All Courses"
          links={[{ href: '/my-organization', title: 'My Organization' }]}
        />
        <Courses viewAll hideArrows />
        <div style={{ height: '40px' }} />
      </>
    </Layout>
  );
}

export default MyOrganizationCourses;
