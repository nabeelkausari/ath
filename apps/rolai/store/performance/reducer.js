import { USER_LOGOUT } from '../auth/types';
import * as types from './types';

const initialState = {
  performance_metrics_requested: null,
  performance_metrics_succeeded: null,
  performance_metrics_failed: null,
  performance_metrics: [],
  course_performance_data_requested: null,
  course_performance_data_succeeded: null,
  course_performance_data_failed: null,
  course_performance_data: {},
  dashboard_performance_data_requested: null,
  dashboard_performance_data_succeeded: null,
  dashboard_performance_data_failed: null,
  dashboard_performance_data: {},
};

const performanceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_PERFORMANCE_METRICS:
      return {
        ...state,
        performance_metrics_requested: true,
        performance_metrics_failed: null,
        performance_metrics_succeeded: null,
      };

    case types.PERFORMANCE_METRICS_SUCCESS:
      return {
        ...state,
        performance_metrics_requested: false,
        performance_metrics_succeeded: true,
        performance_metrics: payload,
      };
    case types.PERFORMANCE_METRICS_ERROR:
      return {
        ...state,
        performance_metrics_requested: false,
        performance_metrics_succeeded: false,
        performance_metrics_failed: true,
      };

    case types.GET_COURSE_PERFORMANCE_DATA:
      return {
        ...state,
        course_performance_data_requested: true,
        course_performance_data_failed: null,
        course_performance_data_succeeded: null,
      };

    case types.COURSE_PERFORMANCE_DATA_SUCCESS:
      return {
        ...state,
        course_performance_data_requested: false,
        course_performance_data_succeeded: true,
        course_performance_data: payload,
      };
    case types.COURSE_PERFORMANCE_DATA_ERROR:
      return {
        ...state,
        course_performance_data_requested: false,
        course_performance_data_succeeded: false,
        course_performance_data_failed: true,
      };

    case types.GET_DASHBOARD_PERFORMANCE_DATA:
      return {
        ...state,
        dashboard_performance_data_requested: true,
        dashboard_performance_data_failed: null,
        dashboard_performance_data_succeeded: null,
      };

    case types.DASHBOARD_PERFORMANCE_DATA_SUCCESS:
      return {
        ...state,
        dashboard_performance_data_requested: false,
        dashboard_performance_data_succeeded: true,
        dashboard_performance_data: payload,
      };
    case types.DASHBOARD_PERFORMANCE_DATA_ERROR:
      return {
        ...state,
        dashboard_performance_data_requested: false,
        dashboard_performance_data_succeeded: false,
        dashboard_performance_data_failed: true,
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
