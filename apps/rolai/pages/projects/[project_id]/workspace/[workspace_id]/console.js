import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Console from '../../../../../sections/ProjectDetails/components/Workspace/Console/Console';
import Workspace from '../../../../../sections/ProjectDetails/components/Workspace/Workspace';
import { getCase } from '../../../../../store/cases/actions';
import { getWorkspaceSolve } from '../../../../../store/workspace/actions';

const ProjectWorkspace = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isXl = useMediaQuery('(min-width:1920px)');
  const { project_succeeded } = useSelector((state) => state.cases);
  const { my_profile_succeeded } = useSelector((state) => state.auth);

  useEffect(() => {
    if (project_succeeded) {
      dispatch(getWorkspaceSolve(true));
    }
  }, [project_succeeded]);

  // useEffect(() => {
  //   if (workspace_solve_succeeded) {
  //     dispatch(getCategoryAndFunctions());
  //     dispatch(getSteps());
  //     dispatch(getDatasets());
  //   }
  // }, [workspace_solve_succeeded]);

  useEffect(() => {
    if (router?.query?.workspace_id && my_profile_succeeded) {
      dispatch(getCase(router.query.workspace_id));
    }
  }, [router?.query?.workspace_id, my_profile_succeeded]);
  return (
    <Workspace>
      <Console />
    </Workspace>
  );
};

export default ProjectWorkspace;
