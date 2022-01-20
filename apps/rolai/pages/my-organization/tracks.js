import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumbs from '../../components/Breadcrumbs';
import Layout from '../../components/Layout';
import TracksSection from '../../sections/MyOrganisation/Tracks/Tracks';
import { getMyOrganizationTracks } from '../../store/tracks/actions';

function MyOrganizationTracks() {
  const dispatch = useDispatch();
  const { my_profile_succeeded } = useSelector((state) => state.auth);

  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getMyOrganizationTracks());
    }
  }, [my_profile_succeeded]);
  return (
    <Layout
      maxWidth="lg"
      isBanner={true}
      title="My Organization Tracks | Rolai"
    >
      <>
        <Breadcrumbs
          activeTitle="All Learning Tracks"
          links={[{ href: '/my-organization', title: 'My Organization' }]}
        />
        <TracksSection viewAll hideArrows />
        <div style={{ height: '40px' }} />
      </>
    </Layout>
  );
}

export default MyOrganizationTracks;
