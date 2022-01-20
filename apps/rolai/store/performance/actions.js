import { fetchLink, fetchLinkAs } from '../../utils/api/fetch';
import { notify } from '../../utils/helpers/notification';
import { getUserIdFromProfile } from '../../utils/helpers/storage';
import * as types from './types';

export const getPerformanceMetrics = () => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/user/${user_id}/performance`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_PERFORMANCE_METRICS });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.PERFORMANCE_METRICS_SUCCESS,
        payload: payload.performance_metrics,
      });
    })
    .catch((err) => {
      dispatch({ type: types.PERFORMANCE_METRICS_ERROR });
      notify.error(err?.body?.message);
    });
};

export const getDashboardPerformanceData =
  (metric_id) => (dispatch, getState) => {
    const user_id = getUserIdFromProfile();
    const link = {
      href: `/user/${user_id}/performance/${metric_id}`,
      accept: 'application/json',
    };
    dispatch({ type: types.GET_DASHBOARD_PERFORMANCE_DATA });
    return fetchLinkAs(link)
      .then((payload) => {
        dispatch({
          type: types.DASHBOARD_PERFORMANCE_DATA_SUCCESS,
          payload: payload,
        });
      })
      .catch((err) => {
        dispatch({ type: types.DASHBOARD_PERFORMANCE_DATA_ERROR });
        notify.error(err?.body?.message);
      });
  };

export const getCoursePerformanceData = (course_id) => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/user/${user_id}/course/${course_id}/performance`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_COURSE_PERFORMANCE_DATA });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.COURSE_PERFORMANCE_DATA_SUCCESS,
        payload: payload,
      });
    })
    .catch((err) => {
      dispatch({ type: types.COURSE_PERFORMANCE_DATA_ERROR });
      notify.error(err?.body?.message);
    });
};
