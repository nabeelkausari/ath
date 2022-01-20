import { groupBy, map } from 'ramda';

import { solves as solves_api } from '../../../../utils/api/solve';
import { notify } from '../../../../utils/helpers/notification';
import * as types from './types';

export const byUserStepUri = (items) =>
  map(
    (items) => items.shift(),
    groupBy(
      (item) => item._links.user_step.href,
      items.filter((item) => !!item._links.user_step)
    )
  );

export const selectMilestone =
  (selected_milestone_reference) => (dispatch, getState) => {
    dispatch({
      type: types.SELECT_MILESTONE,
      payload: selected_milestone_reference,
    });
  };
export const resetSelectedMilestoneReference = () => (dispatch, getState) => {
  dispatch({
    type: types.RESET_SELECT_MILESTONE,
  });
};

export const compareStepAction = () => (dispatch, getState) => {
  const {
    workspace: {
      steps: {
        compare: {
          compare_steps: { user_step_reference, reference_step_reference },
        },
      },
    },
  } = getState();
  if (!user_step_reference || !reference_step_reference) {
    notify.error(
      'Cannot compare steps, You need to select a user step and a reference step in order to compare.'
    );
    return false;
  }
  dispatch(fetchReferenceStep());
};

export const openSelectSteps = () => (dispatch, getState) => {
  const {
    workspace: {
      solve,
      steps: {
        compare: {
          select_milestone: { selected_milestone_reference },
        },
      },
    },
  } = getState();
  if (!!solve.milestones && solve.milestones.length <= 0) return;
  let milestone = (solve.milestones || [])
    .filter(
      (milestone) => milestone._links.self.href === selected_milestone_reference
    )
    .shift();
  if (milestone === undefined) {
    const defaultMilestone = solve.milestones
      .map((milestone) => milestone)
      .shift();
    dispatch(selectMilestone(defaultMilestone._links.self.href));
  }
  // dispatch(resetCompareSteps());
  // dispatch(openSelectStepsInternal());
  dispatch(fetchComparison());
  // dispatch(
  //   dialogs.show({
  //     title: !!milestone
  //       ? 'Step Comparison - Milestone ' + milestone.sequence_number
  //       : 'Step Comparison ',
  //     size: 'lg',
  //     yesButton: {
  //       text: 'Compare Steps',
  //       onClick: () => {
  //         dispatch(compareStepAction());
  //         return false;
  //       },
  //     },
  //     noButton: {
  //       text: 'Cancel',
  //     },
  //     Component: SelectSteps,
  //     className: 'select-steps',
  //   })
  // );
};

export const fetchComparison = () => (dispatch, getState) => {
  const {
    workspace: {
      solve,
      steps: {
        compare: {
          select_milestone: { selected_milestone_reference },
        },
      },
    },
  } = getState();
  const milestone = solve.milestones
    .filter(
      (milestone) => milestone._links.self.href === selected_milestone_reference
    )
    .shift();
  dispatch({ type: types.FETCH_COMPARE_REQUESTED });
  return solves_api
    .getComparison(milestone)
    .then((comparison) =>
      dispatch({ type: types.FETCH_COMPARE_SUCCEEDED, payload: comparison })
    )
    .catch((reason) => {
      notify.error('Unable to fetch step comparison', reason.message);
      dispatch({ type: types.FETCH_COMPARE_FAILED });
    });
};

export const fetchReferenceStep = () => (dispatch, getState) => {
  const {
    workspace: {
      steps: {
        compare: {
          compare_steps: { reference_step_reference },
          select_steps: {
            reference_steps: { by_uri },
          },
        },
      },
    },
  } = getState();
  const step = by_uri[reference_step_reference];
  dispatch({ type: types.FETCH_REFERENCE_STEP_REQUESTED });
  return solves_api
    .getReferenceStep(step)
    .then((step) =>
      dispatch({ type: types.FETCH_REFERENCE_STEP_SUCCEEDED, payload: step })
    )
    .catch((reason) => {
      dispatch({ type: types.FETCH_REFERENCE_STEP_FAILED });
      notify.error('Unable to fetch reference step', reason.message);
    });
};

export const selectReferenceStep =
  (reference_step_reference) => (dispatch, getState) => {
    dispatch({
      type: types.SELECT_REFERENCE_STEP,
      payload: reference_step_reference,
    });
  };

export const selectUserStep = (user_step_reference) => (dispatch, getState) => {
  dispatch({
    type: types.SELECT_USER_STEP,
    payload: user_step_reference,
  });
};
export const resetCompareStep = () => (dispatch, getState) => {
  dispatch({
    type: types.RESET_COMPARE_STEP,
  });
};
