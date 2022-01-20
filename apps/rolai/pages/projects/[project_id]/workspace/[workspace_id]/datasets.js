import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import DatasetsPanel from '../../../../../sections/ProjectDetails/components/Workspace/DatasetsPanel/DatasetsPanel';
import { FLYOUT_TOP } from '../../../../../sections/ProjectDetails/components/Workspace/FunctionsFlyout/FunctionsFlyout.styles';
import LeftPanel from '../../../../../sections/ProjectDetails/components/Workspace/LeftPanel/LeftPanel';
import OutputFlyout from '../../../../../sections/ProjectDetails/components/Workspace/Output/OutputFlyout';
import StepsPanel from '../../../../../sections/ProjectDetails/components/Workspace/StepsPanel/StepsPanel';
import Workspace from '../../../../../sections/ProjectDetails/components/Workspace/Workspace';
import { getCase } from '../../../../../store/cases/actions';
import { getWorkspaceSolve } from '../../../../../store/workspace/actions';
import { getDatasets } from '../../../../../store/workspace/datasets/actions';
import { getCategoryAndFunctions } from '../../../../../store/workspace/functions/actions';
import { getSteps } from '../../../../../store/workspace/steps/actions';

const useStyles = makeStyles((theme) => ({
  panel: {
    display: 'flex !important',
    alignItems: 'flex-start !important',
    justifyContent: 'space-between',
    height: `calc(100vh - ${FLYOUT_TOP}px)`,
  },
}));

const ProjectWorkspace = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [stepsOpen, setStepsOpen] = useState(true);
  const styles = useStyles();
  const isXl = useMediaQuery('(min-width:1920px)');
  const { project_succeeded } = useSelector((state) => state.cases);
  const { workspace_solve_succeeded, steps } = useSelector(
    (state) => state.workspace
  );
  const { my_profile_succeeded } = useSelector((state) => state.auth);

  const { primary, secondary } = steps?.flyout;

  useEffect(() => {
    if (project_succeeded) {
      dispatch(getWorkspaceSolve(true));
    }
  }, [project_succeeded]);

  useEffect(() => {
    if (workspace_solve_succeeded) {
      dispatch(getCategoryAndFunctions());
      dispatch(getSteps());
      dispatch(getDatasets());
    }
  }, [workspace_solve_succeeded]);

  useEffect(() => {
    if (router?.query?.workspace_id && my_profile_succeeded) {
      dispatch(getCase(router.query.workspace_id));
    }
  }, [router?.query?.workspace_id, my_profile_succeeded]);
  return (
    <Workspace>
      <Container
        disableGutters={true}
        maxWidth={false}
        className={styles.panel}
      >
        <LeftPanel />
        <DatasetsPanel stepsOpen={stepsOpen} />
        <StepsPanel stepsOpen={stepsOpen} setStepsOpen={setStepsOpen} />
        <div className="scenario__flyout-container">
          {primary?.is_open && (
            <OutputFlyout is_case={true} is_steps_open={true} />
          )}
          {secondary?.is_open && (
            <OutputFlyout
              is_case={true}
              is_steps_open={true}
              secondary={true}
            />
          )}
        </div>
      </Container>
    </Workspace>
  );
};

export default ProjectWorkspace;
