import React from 'react';

import Layout from '../../components/Layout';
import LeftSection from '../../sections/Dashboard/Home/LeftSection/leftSection';
import RightSection from '../../sections/Dashboard/Home/RightSection/rightSection';

const Dashboard = () => {
  return (
    <Layout
      title="Dashboard Home | Rolai"
      container={false}
      dashboard={true}
      isFooter={false}
    >
      <LeftSection />
      <RightSection />
    </Layout>
  );
};

export default Dashboard;
