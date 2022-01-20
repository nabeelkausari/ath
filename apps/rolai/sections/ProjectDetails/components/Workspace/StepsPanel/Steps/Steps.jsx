import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import cx from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { redo_icon, undo_icon } from '../../../../../../common/images';
import { hideDialog, showDialog } from '../../../../../../store/global/actions';
import { getWorkspaceSolveInternal } from '../../../../../../store/workspace/actions';
import {
  getSteps,
  redoStep,
  reset,
  undoStep,
} from '../../../../../../store/workspace/steps/actions';
import { isReadOnlyProject } from '../../../../../../utils/helpers/helperFunctions';
import Step from './Step';
import useStyles from './Steps.styles';

const Steps = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const lastStep = useRef(null);
  const { steps: stepsState, solve } = useSelector((state) => state.workspace);
  const { project } = useSelector((state) => state.cases);

  const read_only = isReadOnlyProject(project);
  const is_case = router.query?.project_id !== undefined;
  const {
    list: steps,
    steps_requested,
    previous_step_succeeded,
    undo_succeeded,
    redo_success,
    reset_succeeded,
  } = stepsState;
  const last_step = steps[steps.length - 1];
  const undo_available = !!last_step && !!last_step?._links?.undo;
  const redo_available = !!last_step && !!last_step?._links?.redo;
  const can_reset = solve?._links?.reset && steps.length - 1 !== 0;

  useEffect(() => {
    if (previous_step_succeeded && lastStep.current) {
      lastStep.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'end',
      });
    }
  }, [previous_step_succeeded]);

  useEffect(() => {
    if (undo_succeeded || redo_success || reset_succeeded) {
      dispatch(getSteps());
      dispatch(getWorkspaceSolveInternal(is_case));
    }
  }, [undo_succeeded, redo_success, reset_succeeded]);

  return (
    <Box className={styles.stepsSection}>
      {!read_only && (
        <Box className={styles.stepsAction}>
          {undo_available && (
            <Box
              className={styles.actionItem}
              onClick={() => dispatch(undoStep(last_step?._links?.undo))}
            >
              <div className={styles.actionItemIcon}>
                <Image src={undo_icon} width={13} height={13} />
              </div>
              <Typography className={styles.actionItemText}>Undo</Typography>
            </Box>
          )}
          {can_reset && (
            <Box
              className={styles.actionItem}
              onClick={() =>
                dispatch(
                  showDialog({
                    options: {
                      title: 'Reset Steps',
                      message: 'Do you want to reset the steps?',
                      yes_button: {
                        text: 'Reset',
                        onClick: () => dispatch(reset()),
                      },
                      no_button: {
                        text: 'Cancel',
                        onClick: () => dispatch(hideDialog()),
                      },
                    },
                  })
                )
              }
            >
              <div className={styles.actionItemIcon}>
                <Image src={undo_icon} width={13} height={13} />
              </div>
              <Typography className={styles.actionItemText}>
                Undo All
              </Typography>
            </Box>
          )}
          {redo_available && (
            <Box
              className={styles.actionItem}
              onClick={() => dispatch(redoStep(last_step?._links?.redo))}
            >
              <div className={styles.actionItemIcon}>
                <Image src={redo_icon} width={13} height={13} />
              </div>
              <Typography className={styles.actionItemText}>Redo</Typography>
            </Box>
          )}
        </Box>
      )}
      {!steps_requested && steps.length > 1 && (
        <ul className={cx([styles.steps, 'steps__list', 'jr-steps'])}>
          {/*{dropdown_open && (*/}
          {/*  <div*/}
          {/*    className="steps__backdrop"*/}
          {/*    onClick={this.toggleDropdown}*/}
          {/*  />*/}
          {/*)}*/}
          {steps.slice(1).map((step, index) => (
            <li
              className={cx('steps__item', {
                // "steps__item--active": this.isStepActive(step)
              })}
              key={step.id}
            >
              <Step
                step={{ ...step, index: index + 1 }}
                lastChild={index === steps.slice(1).length - 1}
              />
            </li>
          ))}
          {/*<div ref="last_step_ref">*/}
          {/*  {(redo_requested || function_execution_loading) && (*/}
          {/*    <li className="steps__item">*/}
          {/*      <StepSkeleton />*/}
          {/*    </li>*/}
          {/*  )}*/}
          {/*</div>*/}
          <div ref={lastStep} style={{ height: '1px' }} />
        </ul>
      )}
    </Box>
  );
};

export default Steps;
