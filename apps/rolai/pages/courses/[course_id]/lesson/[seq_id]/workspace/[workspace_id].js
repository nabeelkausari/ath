import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { getContentData } from '../../../../../../sections/CourseStructure/components/ModuleLessons/ModuleLessons';
import DatasetsPanel from '../../../../../../sections/ProjectDetails/components/Workspace/DatasetsPanel/DatasetsPanel';
import { FLYOUT_TOP_NON_PROJECT } from '../../../../../../sections/ProjectDetails/components/Workspace/FunctionsFlyout/FunctionsFlyout.styles';
import LeftPanel from '../../../../../../sections/ProjectDetails/components/Workspace/LeftPanel/LeftPanel';
import OutputFlyout from '../../../../../../sections/ProjectDetails/components/Workspace/Output/OutputFlyout';
import StepDetailsFlyout from '../../../../../../sections/ProjectDetails/components/Workspace/Output/StepDetailsFlyout';
import StepsPanel from '../../../../../../sections/ProjectDetails/components/Workspace/StepsPanel/StepsPanel';
import Workspace from '../../../../../../sections/ProjectDetails/components/Workspace/Workspace';
import {
  getCourse,
  getCourseSyllabus,
  setCurrentLesson,
} from '../../../../../../store/courses/actions';
import { getWorkspaceSolve } from '../../../../../../store/workspace/actions';
import { getDatasets } from '../../../../../../store/workspace/datasets/actions';
import { getCategoryAndFunctions } from '../../../../../../store/workspace/functions/actions';
import {
  getSolveReferenceSteps,
  getSteps,
} from '../../../../../../store/workspace/steps/actions';

const useStyles = makeStyles((theme) => ({
  panel: {
    display: 'flex !important',
    alignItems: 'flex-start !important',
    justifyContent: 'space-between',
    height: `calc(100vh - ${FLYOUT_TOP_NON_PROJECT}px)`,
  },
}));

const CourseWorkspace = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [stepsOpen, setStepsOpen] = useState(true);
  const styles = useStyles();
  const isXl = useMediaQuery('(min-width:1920px)');
  const {
    course_succeeded,
    course_syllabus_succeeded,
    course_syllabus,
    course,
  } = useSelector((state) => state.courses);
  const { workspace_solve_succeeded, steps } = useSelector(
    (state) => state.workspace
  );
  const { my_profile_succeeded } = useSelector((state) => state.auth);
  const { primary, secondary } = steps?.flyout;

  useEffect(() => {
    if (course_succeeded) {
      dispatch(getCourseSyllabus());
    }
  }, [course_succeeded]);

  useEffect(() => {
    if (course_syllabus_succeeded) {
      const current_lesson = course_syllabus
        .flatMap((c) => c.module_contents)
        .find(
          (lesson) =>
            Number(lesson.module_seq_id) === Number(router.query.seq_id)
        );

      dispatch(setCurrentLesson(getContentData(current_lesson)));

      dispatch(getWorkspaceSolve(false));
    }
  }, [course_syllabus_succeeded]);

  useEffect(() => {
    if (workspace_solve_succeeded) {
      dispatch(getCategoryAndFunctions());
      dispatch(getSteps());
      dispatch(getDatasets());
      dispatch(getSolveReferenceSteps());
    }
  }, [workspace_solve_succeeded]);

  useEffect(() => {
    if (router?.query?.course_id && my_profile_succeeded) {
      dispatch(getCourse(router.query.course_id));
    }
  }, [router?.query?.course_id, my_profile_succeeded]);
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
          <StepDetailsFlyout />
          <StepDetailsFlyout secondary />
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

export default CourseWorkspace;
