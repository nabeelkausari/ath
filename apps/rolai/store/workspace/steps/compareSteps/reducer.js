import { byUri } from '../../../../utils/helpers/byUri';
import { byUserStepUri } from './actions';
import * as types from './types';

const initialState = {
  compare_steps: {
    is_open: false,
    reference_step_reference: '',
    user_step_reference: '',
    reference_step: null,
    reference_steps_succeeded: null,
    reference_steps_loading: null,
  },
  select_milestone: {
    is_open: false,
    selected_milestone_reference: null,
  },
  select_steps: {
    is_open: false,
    reference_steps: {
      summary: ['Loading...'],
      steps: [],
      by_uri: {},
      by_user_step_uri: {},
      showReferenceSteps: false,
    },
    user_steps: {
      summary: ['Loading...'],
      steps: [],
    },
  },
};

const compareStepsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SELECT_MILESTONE:
      return {
        ...state,
        select_milestone: {
          ...state.select_milestone,
          selected_milestone_reference: payload,
        },
      };
    case types.RESET_SELECT_MILESTONE:
      return {
        ...state,
        select_milestone: {
          ...state.select_milestone,
          selected_milestone_reference: null,
        },
      };
    case types.SELECT_REFERENCE_STEP:
      return {
        ...state,
        compare_steps: {
          ...state.compare_steps,
          reference_step_reference: payload,
        },
      };
    case types.SELECT_USER_STEP:
      return {
        ...state,
        compare_steps: {
          ...state.compare_steps,
          user_step_reference: payload,
        },
      };
    case types.FETCH_REFERENCE_STEP_REQUESTED:
      return {
        ...state,
        compare_steps: {
          ...state.compare_steps,
          reference_step: payload,
          reference_steps_loading: true,
          reference_steps_succeeded: null,
        },
      };
    case types.FETCH_REFERENCE_STEP_SUCCEEDED:
      return {
        ...state,
        compare_steps: {
          ...state.compare_steps,
          reference_step: payload,
          reference_steps_loading: false,
          reference_steps_succeeded: true,
        },
      };
    case types.FETCH_REFERENCE_STEP_FAILED:
      return {
        ...state,
        compare_steps: {
          ...state.compare_steps,
          reference_step: payload,
          reference_steps_loading: false,
          reference_steps_succeeded: false,
        },
      };
    case types.RESET_COMPARE_STEP:
      return {
        ...initialState,
      };
    case types.FETCH_COMPARE_SUCCEEDED:
      const reference_items = payload.reference_steps.items;
      const reference_steps = {
        steps: reference_items,
        summary: payload.reference_steps.summary,
        by_uri: byUri(reference_items),
        by_user_step_uri: byUserStepUri(reference_items),
      };
      const user_steps = {
        steps: [],
        summary: payload.user_steps.summary,
      };
      return {
        ...state,
        select_steps: {
          ...state.select_steps,
          reference_steps,
          user_steps,
        },
      };

    default:
      return state;
  }
};

export default compareStepsReducer;
