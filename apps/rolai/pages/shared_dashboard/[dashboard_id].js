import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Insights from '../../sections/ProjectDetails/components/Workspace/Insights/Insights';
import { getSharedDashboard } from '../../store/collaborators/actions';

const SharedDashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (router.query?.dashboard_id) {
      dispatch(getSharedDashboard(router.query.dashboard_id));
    }
  }, [router.query?.dashboard_id]);

  return <Insights is_shared_dashboard />;
};

export default SharedDashboard;
