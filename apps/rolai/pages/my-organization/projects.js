import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumbs from '../../components/Breadcrumbs';
import Layout from '../../components/Layout';
import Projects from '../../sections/MyOrganisation/Projects/Projects';
import { getMyOrganizationCases } from '../../store/cases/actions';

function MyOrganizationProjects() {
  const dispatch = useDispatch();
  const { my_profile_succeeded } = useSelector((state) => state.auth);

  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getMyOrganizationCases());
    }
  }, [my_profile_succeeded]);
  return (
    <Layout
      maxWidth="lg"
      isBanner={true}
      title="My Organization Projects | Rolai"
    >
      <>
        <Breadcrumbs
          activeTitle="All Projects"
          links={[{ href: '/my-organization', title: 'My Organization' }]}
        />
        <Projects viewAll hideArrows />
        <div style={{ height: '40px' }} />
      </>
    </Layout>
  );
}

export default MyOrganizationProjects;
