import React from 'react';

import Layout from '../../components/Layout';
import RosterTable from '../../sections/Admin/Roster/RosterTable/RosterTable';
import LeftSection from '../../sections/Dashboard/Home/LeftSection/leftSection';
import RightSection from '../../sections/Dashboard/Home/RightSection/rightSection';

const Dashboard = () => {
  return (
    <Layout
      title="Admin Home | Rolai"
      container={false}
      admin={true}
      isFooter={false}
    >
      <RosterTable />
    </Layout>
  );
};

export default Dashboard;
