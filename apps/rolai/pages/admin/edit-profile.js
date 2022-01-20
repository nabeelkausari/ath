import React from 'react';

import Layout from '../../components/Layout';
import EditProfile from '../../sections/Dashboard/EditProfile/EditProfile';

const EditProfilePage = () => {
  return (
    <Layout
      title="Edit Profile | Rolai"
      container={false}
      admin={true}
      isFooter={false}
    >
      <EditProfile />
    </Layout>
  );
};

export default EditProfilePage;
