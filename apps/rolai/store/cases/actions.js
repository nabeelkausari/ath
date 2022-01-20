import { fetchLink, fetchLinkAs } from '../../utils/api/fetch';
import { notify } from '../../utils/helpers/notification';
import { getUserIdFromProfile } from '../../utils/helpers/storage';
import * as dailogTypes from '../global/types';
import { setScenario } from '../workspace/actions';
import * as types from './types';

export const getMyOrganizationCases = () => (dispatch, getState) => {
  const { my_profile } = getState().auth;
  const user_id = my_profile?._links?.self?.href?.split('/')[2];
  const sample_cases_link = {
    href: `/user/${user_id}/case/all?includeShared=true`,
    type: 'application/json',
  };
  dispatch({ type: types.MY_ORGANIZATION_CASES });
  fetchLinkAs(sample_cases_link)
    .then((payload) => {
      dispatch({ type: types.MY_ORGANIZATION_CASES_SUCCESS, payload });
    })
    .catch((err) => {
      dispatch({ type: types.MY_ORGANIZATION_CASES_ERROR });
      notify.error(err?.body?.message);
    });
};

export const getDashboardCases = () => (dispatch, getState) => {
  const { my_profile } = getState().auth;
  const user_id = my_profile?._links?.self?.href?.split('/')[2];
  const sample_cases_link = {
    href: `/user/${user_id}/case/createdAndShared`,
    type: 'application/json',
  };
  dispatch({ type: types.MY_ORGANIZATION_CASES });
  fetchLinkAs(sample_cases_link)
    .then((payload) => {
      dispatch({ type: types.MY_ORGANIZATION_CASES_SUCCESS, payload });
    })
    .catch((err) => {
      dispatch({ type: types.MY_ORGANIZATION_CASES_ERROR });
      notify.error(err?.body?.message);
    });
};

export const clearCase = () => ({
  type: types.CLEAR_CASE,
});

export const getCase = (case_id) => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/user/${user_id}/case/${case_id}`,
    accept: 'application/json',
    // accept: 'application/vnd.Analyttica.TreasureHunt.MarketplaceCourse+json',
  };

  dispatch({ type: types.GET_CASE });
  return fetchLinkAs(link)
    .then((payload) => {
      // setting up the first scenario as default
      const [scenario] = payload.scenarios;
      if (scenario) {
        dispatch(setScenario(scenario));
        dispatch(getCaseNotes());
      }

      dispatch({ type: types.GET_CASE_SUCCESS, payload });
    })
    .catch((err) => {
      dispatch({ type: types.GET_CASE_ERROR });
      notify.error(err?.body?.message);
    });
};

export const clearCloneProject = () => ({
  type: types.CLEAR_CLONE_PROJECT,
});

export const cloneProject = () => (dispatch, getState) => {
  const { name, description, clone_link } = getState().global.dialog_params;
  if (name === '') return notify.error('Project name cannot be empty');
  const param = { name, overview: description };
  dispatch({ type: types.CLONE_PROJECT });
  return fetchLinkAs(clone_link, param)
    .then((payload) => {
      dispatch({ type: types.CLONE_PROJECT_SUCCESS, payload });
      dispatch(getDashboardCases());
      dispatch({ type: dailogTypes.CLEAR_DIALOG_PARAMS });

      notify.success('Success', 'Successfully cloned the project');
    })
    .catch((error) => {
      dispatch({ type: types.CLONE_PROJECT_ERROR, error });
      notify.error(
        error.status_code === 409
          ? 'Project with the same name exists'
          : error.message
      );
    });
};

export const getCaseCategories = () => (dispatch, getState) => {
  const end_point = {
    href: '/case/categories',
    method: 'GET',
  };
  dispatch({ type: types.FETCH_CASE_CATEGORIES_REQUESTED });
  return fetchLinkAs(end_point)
    .then((payload) =>
      dispatch({ type: types.FETCH_CASE_CATEGORIES_SUCCEEDED, payload })
    )
    .catch((error) =>
      dispatch({ type: types.FETCH_CASE_CATEGORIES_FAILED, error })
    );
};

export const createProject = (link) => (dispatch, getState) => {
  const { name, description, create_link, category } =
    getState().global.dialog_params;
  if (name === '' || !name) return notify.error('Project name cannot be empty');
  const param = { name, overview: description };
  dispatch({ type: types.CREATE_PROJECT });
  return fetchLinkAs(create_link, param)
    .then((payload) => {
      fetchLinkAs(payload._links.create_case, {
        name,
        description,
        overview: description,
        category,
      })
        .then((payload) => {
          dispatch({ type: types.CREATE_PROJECT_SUCCESS, payload });
          dispatch({ type: dailogTypes.CLEAR_DIALOG_PARAMS });
          notify.success('Success', 'Successfully created the project');
        })
        .catch((error) => {
          dispatch({ type: types.CREATE_PROJECT_ERROR, error });
          notify.error(
            error.status_code === 409
              ? 'Project with the same name exists'
              : error.message
          );
        });
    })
    .catch((error) => {
      dispatch({ type: types.CREATE_PROJECT_ERROR, error });
      notify.error(
        error.status_code === 409
          ? 'Project with the same name exists'
          : error.message
      );
    });
};

export const getCaseNotes = () => (dispatch, getState) => {
  const { get_notes } = getState().workspace?.scenario?._links;

  dispatch({ type: types.GET_CASE_NOTES });
  return fetchLinkAs(get_notes)
    .then((payload) => {
      dispatch({
        type: types.GET_CASE_NOTES_SUCCESS,
        payload,
      });
    })
    .catch((err) => {
      notify.error(err?.body?.message);
      dispatch({
        type: types.GET_CASE_NOTES_ERROR,
      });
    });
};

export const saveCaseNote = (payload) => (dispatch, getState) => {
  const { save_note } = getState().workspace?.scenario?._links;

  dispatch({ type: types.SAVE_CASE_NOTE });
  return fetchLinkAs(save_note, payload)
    .then((payload) => {
      dispatch({
        type: types.SAVE_CASE_NOTE_SUCCESS,
        payload,
      });
      dispatch(getCaseNotes());
    })
    .catch((err) => {
      notify.error(err?.body?.message);
      dispatch({
        type: types.SAVE_CASE_NOTE_ERROR,
      });
    });
};

export const updateCaseNote = (link, payload) => (dispatch) => {
  dispatch({ type: types.EDIT_CASE_NOTE });
  return fetchLinkAs(link, payload)
    .then((payload) => {
      dispatch({
        type: types.EDIT_CASE_NOTE_SUCCESS,
        payload,
      });
      dispatch(getCaseNotes());
    })
    .catch((err) => {
      notify.error(err?.body?.message);
      dispatch({
        type: types.EDIT_CASE_NOTE_ERROR,
      });
    });
};

export const deleteCaseNote = (link, payload) => (dispatch) => {
  dispatch({ type: types.DELETE_CASE_NOTE });
  return fetchLink(link)
    .then(() => {
      dispatch({
        type: types.DELETE_CASE_NOTE_SUCCESS,
        payload,
      });
      dispatch(getCaseNotes());
    })
    .catch((err) => {
      notify.error(err?.body?.message);
      dispatch({
        type: types.DELETE_CASE_NOTE_ERROR,
      });
    });
};
