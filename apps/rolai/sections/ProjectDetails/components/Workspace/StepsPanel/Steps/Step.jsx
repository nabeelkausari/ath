import cx from 'classnames';
import get from 'lodash/get';
import { useRouter } from 'next/router';
import { pathOr } from 'ramda';
import React, { Component, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getWorkspaceSolveInternal } from '../../../../../../store/workspace/actions';
import { getDatasets } from '../../../../../../store/workspace/datasets/actions';
import {
  getPreviousStep,
  killExec,
  setCurrentStep,
  stepExecutionStatusCheck,
} from '../../../../../../store/workspace/steps/actions';
import usePrevious from '../../../../../../utils/hooks/usePrevious';
import {
  ErrorStep,
  InActiveStep,
  InProgressStep,
  RollBackStep,
  SuccessStep,
} from './StepCards';

const Step = ({ step, lastChild }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { steps, solve } = useSelector((state) => state.workspace);
  const {
    undo_requested,
    kill_execution_ongoing,
    killed_step_id,
    initial_execution_status,
    initial_executed_step,
  } = steps;
  const { dashboard } = useSelector((state) => state.workspace);
  const [executionInProgress, setExecutionInProgress] = useState(null);
  const execution_check_interval = useRef(null);
  const prevStatus = usePrevious(step.status);
  const is_case = router.query?.project_id !== undefined;
  const kill_step_in_progress =
    step._links.self.href === killed_step_id && kill_execution_ongoing;
  const kill_step_complete =
    step._links.self.href === killed_step_id && !kill_execution_ongoing;
  // const rollback_succeeded: state?.cases?.rollback_succeeded;
  const pinned_steps =
    dashboard?.dashboard_items?.filter((item) => item.detail_type === 'STEP') ||
    [];

  useEffect(() => {
    if (step.status === 'INPROGRESS') {
      setExecutionInProgress(true);

      execution_check_interval.current = setInterval(
        () => dispatch(stepExecutionStatusCheck(step)),
        5000
      );
    }

    return () => clearInterval(execution_check_interval.current);
  }, []);

  const onExecutionCompletion = (step) => {
    clearInterval(execution_check_interval.current);
    dispatch(getPreviousStep(step));
    dispatch(getDatasets());
    dispatch(setCurrentStep(step));
    dispatch(getWorkspaceSolveInternal(is_case));
  };

  useEffect(() => {
    if (
      initial_execution_status === 'COMPLETED' &&
      initial_executed_step?.id === step.id
    ) {
      onExecutionCompletion(step);
    }
  }, [initial_execution_status]);

  useEffect(() => {
    if (step.status === 'COMPLETED' && prevStatus === 'INPROGRESS') {
      onExecutionCompletion(step);
    }

    if (step.status === 'KILLED' && prevStatus === 'INPROGRESS') {
      clearInterval(execution_check_interval.current);
    }
  }, [step.status]);

  const handleStepClick = () => {
    // let case_id = this.props.match.params.case_id;
    // this.props.onShowResultClick({ step: this.props.step, case_id: case_id });
  };

  const handleRollback = () => {
    // const { rollback, step } = this.props;
    // rollback(step._links.rollback);
  };

  const confirm_rollback = (e) => {
    // this.props.showDialog({
    //   title: `Do you want to perform rollback upto step ${this.props.step.sequence_number}?`,
    //   yesButton: {
    //     text: 'Yes',
    //     onClick: () => {
    //       this.handleRollback();
    //       return true;
    //     },
    //   },
    //   noButton: {
    //     text: 'No',
    //   },
    //   items_centered: true,
    // });
    // e.stopPropagation();
  };

  const is_rollback_step = step.is_rollback_step;
  const hasRollbackLink =
    pathOr(undefined, ['_links', 'rollback'], step) !== undefined;
  const show_pin = !!get(solve, '_links.modify_dashboard');

  if (kill_step_complete || step.status === 'KILLED') {
    return null;
  }

  return step.active ? (
    <div
      className={cx([
        'step',
        lastChild && undo_requested && 'step--undo',
        kill_step_in_progress && 'is_killing',
        (!is_rollback_step ||
          step.status !== 'INPROGRESS' ||
          step.status !== 'KILLED') &&
          'hover-effect',
      ])}
    >
      {(() => {
        if (is_rollback_step) {
          return <RollBackStep step={step} />;
        } else {
          if (step.status === 'INPROGRESS') {
            return (
              <InProgressStep
                step={step}
                killExec={() => dispatch(killExec(step))}
              />
            );
          } else if (!step.is_error) {
            return (
              <SuccessStep
                onClick={handleStepClick}
                step={step}
                hasRollbackLink={hasRollbackLink}
                confirm_rollback={confirm_rollback}
                lastChild={lastChild}
                undo_requested={undo_requested}
                pinned_steps={pinned_steps}
                show_pin={show_pin}
                // read_only={read_only}
                // scenario_id={scenario_id}
                // is_case={is_case}
              />
            );
          } else if (step.is_error) {
            return <ErrorStep onClick={handleStepClick} step={step} />;
          }
        }
      })()}
    </div>
  ) : (
    <InActiveStep step={step} />
  );
};

export default Step;
