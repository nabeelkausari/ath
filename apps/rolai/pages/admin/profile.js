import Box from '@mui/material/Box';
import React from 'react';

import Layout from '../../components/Layout';
import { useCommonStyles } from '../../sections/Admin/Components/Common/Common.styles';
import OrgProfile from '../../sections/Admin/OrgProfile/OrgProfile';
const Profile = () => {
  const commonStyles = useCommonStyles();
  return (
    <Layout
      title="Admin Home | Rolai"
      container={false}
      admin={true}
      isFooter={false}
    >
      <Box>
        <Box className={commonStyles.heading1}>Organization Profile</Box>
        <OrgProfile />
      </Box>
    </Layout>
  );
};

export default Profile;
