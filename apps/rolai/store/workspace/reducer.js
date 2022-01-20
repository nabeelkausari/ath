import { combineReducers } from 'redux';
import concatenateReducers from 'redux-concatenate-reducers';

import { USER_LOGOUT } from '../auth/types';
import collaborationReducer from './collaboration/reducer';
import consoleReducer from './console/reducer';
import datasetsReducer from './datasets/reducer';
import functionsReducer from './functions/reducer';
import insightsReducer from './insights/reducer';
import stepsReducer from './steps/reducer';
import * as types from './types';

const initialState = {
  scenario: null,
  workspace_solve_requested: null,
  workspace_solve_succeeded: null,
  workspace_solve_failed: null,
  internal_solve_requested: null,
  internal_solve_succeeded: null,
  internal_solve_failed: null,
  solve: {},
};

const workspaceDetailsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_SCENARIO:
      return {
        ...state,
        scenario: payload,
      };
    case types.GET_WORKSPACE_SOLVE:
      return {
        ...state,
        workspace_solve_requested: true,
        workspace_solve_failed: null,
        workspace_solve_succeeded: null,
      };
    case types.GET_WORKSPACE_SOLVE_SUCCESS:
      return {
        ...state,
        workspace_solve_requested: false,
        workspace_solve_succeeded: true,
        solve: payload,
      };
    case types.GET_WORKSPACE_SOLVE_ERROR:
      return {
        ...state,
        workspace_solve_requested: false,
        workspace_solve_succeeded: false,
        workspace_solve_failed: true,
      };
    case types.GET_INTERNAL_SOLVE:
      return {
        ...state,
        internal_solve_requested: true,
        internal_solve_failed: null,
        internal_solve_succeeded: null,
      };
    case types.GET_INTERNAL_SOLVE_SUCCESS:
      return {
        ...state,
        internal_solve_requested: false,
        internal_solve_succeeded: true,
        solve: payload,
      };
    case types.GET_INTERNAL_SOLVE_ERROR:
      return {
        ...state,
        internal_solve_requested: false,
        internal_solve_succeeded: false,
        internal_solve_failed: true,
      };
    case USER_LOGOUT:
    case types.CLEAR_SOLVE:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

const workspaceReducer = concatenateReducers([
  workspaceDetailsReducer,
  combineReducers({
    functions: functionsReducer,
    datasets: datasetsReducer,
    steps: stepsReducer,
    console: consoleReducer,
    collaboration: collaborationReducer,
    insights: insightsReducer,
  }),
]);

export default workspaceReducer;
