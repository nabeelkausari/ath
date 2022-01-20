import { USER_LOGOUT } from '../auth/types';
import * as types from './types';

const initialState = {
  performance_metrics_requested: null,
  performance_metrics_succeeded: null,
  performance_metrics_failed: null,
  performance_metrics: [],
};

const performanceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_DASHBOARD_PERFORMANCE_METRICS:
      return {
        ...state,
        performance_metrics_requested: true,
        performance_metrics_failed: null,
        performance_metrics_succeeded: null,
      };

    case types.DASHBOARD_PERFORMANCE_METRICS_SUCCESS:
      return {
        ...state,
        performance_metrics_requested: false,
        performance_metrics_succeeded: true,
        performance_metrics: payload,
      };
    case types.DASHBOARD_PERFORMANCE_METRICS_ERROR:
      return {
        ...state,
        performance_metrics_requested: false,
        performance_metrics_succeeded: false,
        performance_metrics_failed: true,
      };

    case USER_LOGOUT:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export default performanceReducer;
