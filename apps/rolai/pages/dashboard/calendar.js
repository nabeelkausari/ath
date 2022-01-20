import Box from '@mui/material/Box';
import Image from 'next/image';
import React, { Component } from 'react';

import Layout from '../../components/Layout';
import LeftSectionCalendar from '../../sections/Dashboard/Calendar/LeftSectionCalendar/LeftSectionCalendar';
import RightSectionCalendar from '../../sections/Dashboard/Calendar/RightSectionCalendar/RightSectionCalendar';
import LeftSection from '../../sections/Dashboard/Home/LeftSection/leftSection';
import RightSection from '../../sections/Dashboard/Home/RightSection/rightSection';

const Calendar = () => {
  return (
    <Layout
      maxWidth={'lg'}
      title="Dashboard Home | Rolai"
      container={false}
      dashboard={true}
      isFooter={false}
    >
      <LeftSectionCalendar />
      <RightSectionCalendar />
    </Layout>
  );
};
export default Calendar;
