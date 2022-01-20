import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import cx from 'classnames';
import get from 'lodash/get';
import Image from 'next/image';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CloseCircle, ExpandIcon } from '../../../../../common/images';
import AccordionPanel from '../../../../../components/AccordionPanel/AccordionPanel';
import {
  hideStepDetails,
  toggleStepDetailsFullscreen,
} from '../../../../../store/workspace/steps/actions';
import { REFERENCE } from '../../../../../utils/constants';
import Flyout from './Flyout';
import useStyles from './Output.styles';
import OutputResult from './OutputResult';
const Tooltip = ({ children }) => <>{children}</>;
const StepDetailsFlyout = ({ secondary }) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const print_ref = useRef();
  const { steps: stepsState } = useSelector((state) => state.workspace);

  const {
    step_detail_flyout,
    step_detail_flyout_secondary,
    list,
    reference_steps,
  } = stepsState;
  const { is_open, is_full_screen, type } = secondary
    ? step_detail_flyout_secondary
    : step_detail_flyout;

  const steps =
    type === REFERENCE
      ? reference_steps.sort((a, b) => a.sequence_number - b.sequence_number)
      : list.filter((s) => s.sequence_number !== 0);
  const title = type === REFERENCE ? 'Reference' : 'User';

  if (!is_open) return null;
  return (
    <div
      className={cx(
        'step-flyout-container',
        styles.flyout,
        styles.flyoutNonProject,
        'flyout-container',
        is_full_screen && 'flyout-container--full-screen',
        secondary ? 'flyout-container--2' : 'flyout-container--1'
      )}
    >
      <div className="flyout-container__header">
        <div className="step-flyout-container__title">
          {title + ' Step Details'}
        </div>
        <div className="flyout-container__options">
          <Tooltip placement={'bottom'} text={'Full Screen'}>
            <div
              onClick={() => dispatch(toggleStepDetailsFullscreen(secondary))}
              className="flyout-container__action-wrapper"
            >
              <Image width={15} height={15} src={ExpandIcon} />
            </div>
          </Tooltip>
          <div
            className="flyout-container__action-wrapper"
            onClick={() => dispatch(hideStepDetails(!!secondary))}
          >
            <Image width={15} height={15} src={CloseCircle} />
          </div>
        </div>
      </div>
      <div className="step-flyout-container__content tab-panel-wrapper tab-panel-wrapper__step-details">
        {steps.map((step) => (
          <Accordion className={styles.flyoutAccordion} key={step.id}>
            <AccordionSummary>
              <Typography>{`${title} Step ${
                step.index_number || step.sequence_number
              } - ${step.operation_name}`}</Typography>
              <KeyboardArrowRightRoundedIcon className="step-flyout-accordion-icon" />
            </AccordionSummary>
            <AccordionDetails>
              <OutputResult
                expanded
                step_details
                secondary={secondary}
                results={step}
                print_ref={print_ref}
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default StepDetailsFlyout;
