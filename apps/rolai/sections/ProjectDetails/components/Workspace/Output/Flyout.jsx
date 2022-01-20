import cx from 'classnames';
import get from 'lodash/get';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  CloseCircle,
  ExpandIcon,
  PinIcon,
  PinIconFilled,
  PrintIcon,
} from '../../../../../common/images';
import { pinStep } from '../../../../../store/workspace/insights/actions';
import {
  hideFlyout,
  setFlyoutFullScreen,
} from '../../../../../store/workspace/steps/actions';
import {
  getPrefix,
  printResult,
} from '../../../../../utils/helpers/helperFunctions';
import StepInfo from '../StepsPanel/Steps/StepInfo';
import useStyles from './Output.styles';

const Tooltip = ({ children }) => <>{children}</>;

const Flyout = ({
  require_pin,
  require_full_screen,
  require_download,
  children,
  print_ref,
  read_only,
  secondary,
}) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const router = useRouter();
  const is_case = router.query?.project_id !== undefined;

  const { steps, solve, insights } = useSelector((state) => state.workspace);

  const { dashboard_items, pin_output_loading } = insights;
  const { primary, secondary: secondaryFlyout } = steps?.flyout;
  const is_secondary_step_set = secondaryFlyout?.is_step_set;
  const is_primary_flyout_full_screen = primary?.is_full_screen;

  const results_primary = primary?.step;
  const results_secondary = secondaryFlyout?.step;

  const sequence_no =
    results_primary && !secondary
      ? results_primary.index
      : results_secondary && is_secondary_step_set && results_secondary.index;

  const step =
    results_primary && !secondary
      ? results_primary
      : results_secondary && is_secondary_step_set && results_secondary;

  const show_pin =
    !!get(solve, '_links.modify_dashboard') && results_primary && !secondary
      ? !results_primary.is_error
      : results_secondary &&
        is_secondary_step_set &&
        !results_secondary.is_error;

  useEffect(() => {
    // trigger window resize to autosize plotly charts
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }, [is_primary_flyout_full_screen]);

  const is_pinned =
    secondary && results_secondary
      ? dashboard_items.some((d) => d.step_id === results_secondary.id)
      : dashboard_items.some((d) => d.step_id === results_primary.id);

  const handlePin = () =>
    dispatch(pinStep(secondary ? results_secondary : results_primary, false));

  return (
    <div
      className={cx([
        styles.flyout,
        !is_case && styles.flyoutNonProject,
        'flyout-container',
        is_primary_flyout_full_screen && 'flyout-container--full-screen',
        secondary ? 'flyout-container--2' : 'flyout-container--1',
      ])}
    >
      <div className="flyout-container__header">
        <div className="flyout-container__index-no-wrapper">
          <span className="flyout-container__index-no">
            {getPrefix(sequence_no)}
          </span>
        </div>
        <div className="flyout-container__title-wrapper">
          <StepInfo step={step} />
        </div>
        <div className="flyout-container__options">
          {is_case && !read_only && require_pin && show_pin && (
            <Tooltip placement={'bottom'} text={is_pinned ? 'Unpin' : 'Pin'}>
              <div
                style={{ opacity: pin_output_loading && '.2' }}
                className="flyout-container__action-wrapper flyout-container__pinIcon"
                onClick={!pin_output_loading ? handlePin : () => {}}
              >
                <Image
                  width={15}
                  height={15}
                  src={is_pinned ? PinIconFilled : PinIcon}
                />
              </div>
            </Tooltip>
          )}
          {require_download && (
            <Tooltip placement={'bottom'} text={'Print'}>
              <div
                onClick={() => printResult(print_ref)}
                className="flyout-container__action-wrapper"
              >
                <Image width={15} height={15} src={PrintIcon} />
                {/*<PrintIcon*/}
                {/*  className="flyout-container__action-icon"*/}
                {/*/>*/}
              </div>
            </Tooltip>
          )}
          {require_full_screen && (
            <Tooltip placement={'bottom'} text={'Full Screen'}>
              <div
                onClick={() =>
                  dispatch(
                    setFlyoutFullScreen(secondary ? 'secondary' : 'primary')
                  )
                }
                className="flyout-container__action-wrapper"
              >
                {/*<img src={full_screen_icon} alt="Pin icon" className="flyout-container__action-icon" onClick={() => OnCLickFullScreen(secondary?'secondary':'primary')}/>*/}
                <Image width={15} height={15} src={ExpandIcon} />
                {/*<FullScreenIcon*/}
                {/*  className={cx('flyout-container__action-icon', {*/}
                {/*    'active--1': is_primary_flyout_full_screen,*/}
                {/*  })}*/}
                {/*/>*/}
              </div>
            </Tooltip>
          )}
          <div
            className="flyout-container__action-wrapper"
            onClick={() => dispatch(hideFlyout(!!secondary))}
          >
            <Image width={15} height={15} src={CloseCircle} />
          </div>
        </div>
      </div>

      <div className="flyout-container__content">{children}</div>
    </div>
  );
};

export default Flyout;
