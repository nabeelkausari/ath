import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../../../components/Button';
import {
  setDialogOptions,
  showDialog,
} from '../../../../../../store/global/actions';
import { compareStepAction } from '../../../../../../store/workspace/steps/compareSteps/actions';
import CompareStepsCompare from './CompareStepsCompare';
import CompareStepsFinal from './CompareStepsFinal';
import CompareStepsMilestone from './CompareStepsMilestone';

const WorkspaceCompareSteps = () => {
  const dispatch = useDispatch();
  const { steps, solve } = useSelector((state) => state.workspace);
  const { reference_steps_succeeded, reference_steps_loading } =
    steps?.compare?.compare_steps || {};
  const { selected_milestone_reference } =
    steps?.compare?.select_milestone || {};

  const can_compare = solve?.milestones?.some((m) => !!m?._links?.compare);

  const [milestone] = (solve.milestones || []).filter(
    (m) => m._links.self.href === selected_milestone_reference
  );

  useEffect(() => {
    if (reference_steps_succeeded) {
      handleCompareFinal();
    }
  }, [reference_steps_succeeded]);

  useEffect(() => {
    if (reference_steps_loading) {
      dispatch(setDialogOptions({ submitting: true }));
    }
  }, [reference_steps_loading]);

  const handleCompareStepMilestone = () => {
    dispatch(
      showDialog({
        options: {
          size: 'large',
          title: 'You can now compare steps',
          component: CompareStepsMilestone,
          yes_button: {
            text: 'Next',
            onClick: () => {
              handleCompareStepCompare();
            },
          },
          no_button: {
            text: 'Cancel',
          },
        },
      })
    );
  };

  const handleCompareStepCompare = () => {
    dispatch(
      showDialog({
        options: {
          size: 'large',
          title: 'Step Comparison',
          component: CompareStepsCompare,
          yes_button: {
            text: 'Compare Steps',
            disabled: true,
            onClick: () => {
              dispatch(compareStepAction());
            },
          },
          no_button: {
            text: 'Cancel',
          },
          no_hide_with_yes: true,
        },
      })
    );
  };

  const handleCompareFinal = () => {
    dispatch(
      showDialog({
        options: {
          size: 'large',
          title: 'Step Comparison',
          // title: `Step Comparison${
          //   milestone ? ` - Milestone ${milestone.sequence_number}` : ''
          // }`,
          component: CompareStepsFinal,
          yes_button: {
            text: 'Back',
            onClick: () => {
              handleCompareStepCompare();
            },
          },
          no_button: {
            text: 'Cancel',
          },
        },
      })
    );
  };

  return (
    <Button
      disabled={!can_compare}
      size="small"
      onClick={handleCompareStepMilestone}
    >
      Compare Steps
    </Button>
  );
};

export default WorkspaceCompareSteps;
