import cx from 'classnames';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import
import {
  DigitalVideoIcon,
  FunctionsIcon,
  PinIcon,
} from '../../../../../../common/images/index';
import LightTooltip from '../../../../../../components/LightTooltip/LightTooltip';
import { pinStep } from '../../../../../../store/workspace/insights/actions';
import {
  killExec,
  setCurrentStep,
} from '../../../../../../store/workspace/steps/actions';
import { getPrefix } from '../../../../../../utils/helpers/helperFunctions';
import StepInfo from './StepInfo';
// import Tooltip from '../../../../../components/Tooltip/Tooltip';

const Tooltip = ({ children }) => <>{children}</>;

// Function to get the string of all selected columns
export const getSelectedColumns = (selections) => {
  if (selections !== null) {
    let selected_column_string = [];

    for (let key in selections) {
      selected_column_string.push(
        selections[key].map((column) => ' ' + column.key)
      );
    }

    return selected_column_string.join(',');
  } else {
    return '';
  }
};

export const InProgressStep = ({ step }) => {
  const { steps } = useSelector((state) => state.workspace);
  const { kill_execution_ongoing, killed_step_id } = steps;
  const kill_step_in_progress =
    step._links.self.href === killed_step_id && kill_execution_ongoing;

  const dispatch = useDispatch();

  return (
    <div>
      {/*<div className="step__progress-indicator-wrapper">*/}
      {/*  <span*/}
      {/*    className={cx(*/}
      {/*      'step__progress-indicator ',*/}
      {/*      { 'step__progress-indicator--killed': is_step_killed },*/}
      {/*      { 'step__progress-indicator--ongoing': !is_step_killed }*/}
      {/*    )}*/}
      {/*  ></span>*/}
      {/*</div>*/}
      <LightTooltip title="Kill Step Execution" arrow placement="left">
        <div
          onClick={() =>
            !kill_step_in_progress ? dispatch(killExec(step)) : null
          }
          className={cx('index-no__wrapper index-no__wrapper--in-progress', {
            'index-no__wrapper--killed': kill_step_in_progress,
          })}
        >
          <span className="stop-step" />
        </div>
      </LightTooltip>

      <div
        className={cx('step__main-container', {
          'killed-step--in-progress': kill_step_in_progress,
        })}
      >
        <StepInfo step={step} />
      </div>
      {/*<div className="step__under-execution-main-container">*/}
      {/*  <div className="step__under-execution-info-container">*/}
      {/*    <div className="step__functions-wrapper u-margin-bottom-small">*/}
      {/*      <div className="step__icon-wrapper">*/}
      {/*        /!*<FunctionsIcon className="step__icon step__icon--function"/>*!/*/}
      {/*        /!*<FunctionsIcon className="step__icon step__icon--function " />*!/*/}
      {/*      </div>*/}
      {/*      <div className="step__function-name--in-progress">*/}
      {/*        {step.operation_name}*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  {is_step_killed ? (*/}
      {/*    <div className="step_under_execution step_under_execution--killed">*/}
      {/*      Killing Execution*/}
      {/*    </div>*/}
      {/*  ) : (*/}
      {/*    <div className="step_under_execution" onClick={() => killExec(step)}>*/}
      {/*      <i className="fa fa-stop-circle step_under_execution__stop-icon" />*/}
      {/*      Stop Execution*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</div>*/}
    </div>
  );
};

export const SuccessStep = (props) => {
  const dispatch = useDispatch();
  const {
    step,
    lastChild,
    undo_requested,
    is_step_active,
    is_rollback_step,
    is_dataload_step,
    milestones,
    can_create_reference_steps,
    onMilestoneSelect,
    show_pin,
  } = props;

  const onSelectChange = (e, step_ref) => {
    onMilestoneSelect(step_ref, parseInt(e.target.value));
    e.stopPropagation();
  };

  return (
    <div
      onClick={() => dispatch(setCurrentStep(step))}
      className={cx([lastChild && undo_requested && 'step--is-undo'])}
    >
      <div className="index-no__wrapper">
        <span className="index-no__text">{getPrefix(step.index)}</span>
      </div>
      <div className="step__main-container">
        <StepInfo step={step} />
        {/*{show_pin && (*/}
        {/*  <div onClick={handlePin} className="pin-step">*/}
        {/*    <Image src={PinIcon} height={15} width={15} />*/}
        {/*  </div>*/}
        {/*)}*/}
        {can_create_reference_steps &&
          is_step_active &&
          !is_dataload_step &&
          milestones.length > 1 && (
            <div className="step__milestone-map">
              <p className="step__milestone-map--title">Mapped Milestone</p>
              <select
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => onSelectChange(e, step._links.self.href)}
              >
                {milestones.map((m) => (
                  <option value={m.sequence_number}>{m.sequence_number}</option>
                ))}
              </select>
            </div>
          )}
      </div>
    </div>
  );
};

export const ErrorStep = ({ step, onClick }) => {
  const dispatch = useDispatch();
  return (
    <div className="error" onClick={() => dispatch(setCurrentStep(step))}>
      <div className="index-no__wrapper index-no__wrapper--error">
        <span className="index-no__text--error">{getPrefix(step.index)}</span>
      </div>
      <div className="step__error-main-container">
        <StepInfo step={step} />
        {/*<div className="step_error">*/}
        {/*  <i className="fa fa-warning step_error__icon" />*/}
        {/*  Step Execution Error*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export const InActiveStep = ({ step }) => {
  return (
    <div className="step--rollback">
      <div className="index-no__wrapper">
        <span className="index-no__text">{getPrefix(step.index)}</span>
      </div>
      <div className="step__main-container">
        <StepInfo step={step} />
      </div>
    </div>
  );
};

export const RollBackStep = ({ step }) => {
  return (
    <div className="step__rollback-step">
      {/*<span className="step__rollback-index">{getPrefix(step.sequence_number)}</span>*/}
      <div className="index-no__wrapper">
        <span className="index-no__text">{getPrefix(step.index)}</span>
      </div>
      <div className="step__rollback-desc">{step.description}</div>
    </div>
  );
};
