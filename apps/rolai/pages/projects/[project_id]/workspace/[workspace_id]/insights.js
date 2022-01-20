import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FLYOUT_TOP } from '../../../../../sections/ProjectDetails/components/Workspace/FunctionsFlyout/FunctionsFlyout.styles';
import Insights from '../../../../../sections/ProjectDetails/components/Workspace/Insights/Insights';
import Workspace from '../../../../../sections/ProjectDetails/components/Workspace/Workspace';
import { getCase } from '../../../../../store/cases/actions';
import { getWorkspaceSolve } from '../../../../../store/workspace/actions';

const useStyles = makeStyles((theme) => ({
  panel: {
    height: `calc(100vh - ${FLYOUT_TOP}px)`,
    position: 'relative',
    textAlign: 'center',

    '& .draggable-element': {
      cursor: 'move !important',
    },

    '& .react-grid-placeholder': {
      background: theme.palette.primary.main,
      borderRadius: 15,
    },

    '& .react-resizable-handle': {
      marginRight: 8,
      marginBottom: 8,
    },

    '& .insert-menu': {
      position: 'fixed',
      bottom: 20,
      right: 20,
    },

    '& .empty-dashboard': {
      height: '80%',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
}));

const ProjectWorkspace = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const styles = useStyles();
  const isXl = useMediaQuery('(min-width:1920px)');
  const { project_succeeded } = useSelector((state) => state.cases);
  const { my_profile_succeeded } = useSelector((state) => state.auth);

  useEffect(() => {
    if (project_succeeded) {
      dispatch(getWorkspaceSolve(true));
    }
  }, [project_succeeded]);

  useEffect(() => {
    if (router?.query?.workspace_id && my_profile_succeeded) {
      dispatch(getCase(router.query.workspace_id));
    }
  }, [router?.query?.workspace_id, my_profile_succeeded]);
  return (
    <Workspace>
      <div className={styles.panel}>
        <Insights />
      </div>
    </Workspace>
  );
};

export default ProjectWorkspace;
