import { fetchLink, fetchLinkAs } from '../../utils/api/fetch';
import { notify } from '../../utils/helpers/notification';
import { getCourse } from '../courses/actions';
import * as types from './types';

export const setScenario = (payload) => ({ type: types.SET_SCENARIO, payload });

const getSolveLink = (is_case, getState) => {
  let link;
  if (is_case) {
    const { scenario } = getState().workspace;
    if (!scenario) return;
    link = scenario._links.get_scenario_details;
  } else {
    const { current_lesson } = getState().courses;
    if (!current_lesson) return;
    link = current_lesson._links.self;
  }
  return link;
};
export const getWorkspaceSolve = (is_case) => (dispatch, getState) => {
  const link = getSolveLink(is_case, getState);

  dispatch({ type: types.GET_WORKSPACE_SOLVE });
  fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.GET_WORKSPACE_SOLVE_SUCCESS,
        payload: payload,
      });
    })
    .catch((err) => {
      dispatch({ type: types.GET_WORKSPACE_SOLVE_ERROR });
      notify.error(err?.body?.message);
    });
};

export const getWorkspaceSolveInternal = (is_case) => (dispatch, getState) => {
  const link = getSolveLink(is_case, getState);
  dispatch({ type: types.GET_INTERNAL_SOLVE });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({ type: types.GET_INTERNAL_SOLVE_SUCCESS, payload });
    })
    .catch((error) => {
      console.log('error while getting solve', error.message);
      dispatch({ type: types.GET_INTERNAL_SOLVE_ERROR });
    });
};

export const submitApply = () => (dispatch, getState) => {
  const { solve } = getState().workspace;
  const { course } = getState().courses;
  return fetchLink(solve._links.submit)
    .then(() => {
      dispatch(getWorkspaceSolveInternal(false));
      dispatch(getCourse(course?.course_id));

      notify.success('Successfully submitted');
    })
    .catch((reason) => {
      notify.error('Failed to submit', reason.message);
    });
};

export const clearSolve = () => ({
  type: types.CLEAR_SOLVE,
});
