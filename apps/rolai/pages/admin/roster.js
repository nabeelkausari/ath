import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../components/Layout';
import { useCommonStyles } from '../../sections/Admin/Components/Common/Common.styles';
import RosterBar from '../../sections/Admin/Roster/RosterBar/RosterBar';
import RosterTable from '../../sections/Admin/Roster/RosterTable/RosterTable';
import LeftSection from '../../sections/Dashboard/Home/LeftSection/leftSection';
import RightSection from '../../sections/Dashboard/Home/RightSection/rightSection';
import {
  getAccessLevels,
  getDesignations,
  getRosterUsers,
  setRosterPagination,
} from '../../store/admin/roster/actions';

const Roster = () => {
  const commonStyles = useCommonStyles();
  const dispatch = useDispatch();
  const { my_profile, my_profile_succeeded } = useSelector(
    (state) => state.auth
  );
  const { filter, pagination, users } = useSelector(
    (state) => state.admin.roster
  );

  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getRosterUsers({ ...filter, ...pagination }));
    }
  }, [my_profile_succeeded, filter, pagination.rowsPerPage, pagination.page]);

  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getDesignations());
      dispatch(getAccessLevels());
    }
  }, [my_profile_succeeded]);

  return (
    <Layout
      title="Admin Home | Rolai"
      container={false}
      admin={true}
      isFooter={false}
    >
      <Box>
        <Box className={commonStyles.heading1}>Roster</Box>
        <RosterBar />
        <RosterTable />
      </Box>
    </Layout>
  );
};

export default Roster;
