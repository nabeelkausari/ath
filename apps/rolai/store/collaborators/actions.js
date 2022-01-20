import { fetchLinkAs } from '../../utils/api/fetch';
import { API_GATEWAY_URI, APP_URL } from '../../utils/constants';
import { notify } from '../../utils/helpers/notification';
import { getUserIdFromProfile } from '../../utils/helpers/storage';
import * as types from './types';

export const getAllCollaborators = () => (dispatch, getState) => {
  dispatch({ type: types.FETCH_COLLABORATORS_REQUESTED });
  const {
    auth: {
      my_profile: { _links },
    },
  } = getState();
  const link = {
    ..._links.get_all_collaborators,
    type: 'application/json',
  };
  return fetchLinkAs(link)
    .then((response) => {
      dispatch({
        type: types.FETCH_COLLABORATORS_SUCCEEDED,
        payload: response,
      });
    })
    .catch((error) => {
      dispatch({ type: types.FETCH_COLLABORATORS_FAILED, payload: error });
    });
};

export const getProjectCollaborators = (case_id) => (dispatch, getState) => {
  dispatch({ type: types.FETCH_COLLABORATORS_REQUESTED });
  const user_id = getUserIdFromProfile();

  const link = {
    accept: 'application/json',
    href: `/access/resource/cases/${case_id}/getExistingCollaborators`,
    method: 'GET',
    type: 'application/json',
  };
  return fetchLinkAs(link)
    .then((response) => {
      dispatch({
        type: types.FETCH_COLLABORATORS_SUCCEEDED,
        payload: [...response, { collaboratorId: +user_id }],
      });
    })
    .catch((error) => {
      dispatch({ type: types.FETCH_COLLABORATORS_FAILED, payload: error });
    });
};

export const getAllUsers = () => (dispatch, getState) => {
  // if (isLeaps()) return;
  const {
    auth: {
      my_profile: { _links },
    },
  } = getState();
  dispatch({ type: types.FETCH_ALL_USERS_REQUESTED });
  const link = {
    ..._links.get_all_users,
    type: 'application/json',
  };
  return fetchLinkAs(link)
    .then((response) => {
      dispatch({ type: types.FETCH_ALL_USERS_SUCCEEDED, payload: response });
    })
    .catch((error) => {
      dispatch({ type: types.FETCH_ALL_USERS_FAILED, payload: error });
    });
};

export const getAllUsersForAdmin = () => (dispatch, getState) => {
  const {
    auth: {
      my_profile: { _links },
    },
  } = getState();
  dispatch({ type: types.FETCH_ALL_USERS_REQUESTED });
  const link = {
    ..._links.get_all_users,
    type: 'application/json',
  };
  return fetchLinkAs(link)
    .then((response) => {
      dispatch({ type: types.FETCH_ALL_USERS_SUCCEEDED, payload: response });
    })
    .catch((error) => {
      dispatch({ type: types.FETCH_ALL_USERS_FAILED, payload: error });
    });
};

export const addCollaborator = (param) => (dispatch, getState) => {
  const {
    cases: {
      project: { _links },
    },
  } = getState();
  dispatch({ type: types.ADD_COLLABORATORS_REQUESTED });
  return fetchLinkAs(_links.save_collaborators, param)
    .then((response) => {
      dispatch({ type: types.ADD_COLLABORATORS_SUCCEEDED, payload: response });
      notify.success('Collaboration Request Sent');
    })
    .catch((error) => {
      dispatch({ type: types.ADD_COLLABORATORS_FAILED, payload: error });
      notify.error('Something went wrong', error.messages);
    });
};

export const getShareableLink = (validityDays) => (dispatch, getState) => {
  const {
    workspace: { solve },
  } = getState();
  dispatch({ type: types.GET_SHAREABLE_LINK_REQUESTED });
  let params = validityDays ? { validityDays } : {};

  return fetchLinkAs(solve._links.create_dashboard_link_token, params)
    .then((response) => {
      let link = `${APP_URL}/shared_dashboard/${response.code}`;
      dispatch({ type: types.GET_SHAREABLE_LINK_SUCCEEDED, payload: link });
      notify.success('Shareable link generated successfully');
    })
    .catch((error) => {
      dispatch({ type: types.GET_SHAREABLE_LINK_FAILED, payload: error });
      notify.error('Something went wrong', error.messages);
    });
};

export const resetShareableLink = () => (dispatch) => {
  dispatch({ type: types.RESET_SHAREABLE_LINK });
};

export const getSharedDashboard = (code) => (dispatch, getState) => {
  dispatch({ type: types.GET_SHARED_DASHBOARD_REQUESTED });

  return fetch(
    `${API_GATEWAY_URI}/step/dashboard/getBySharedLink/?code=${code}`
  )
    .then((res) => res.json())
    .then((response) => {
      if (response.length === undefined) {
        notify.error(
          response?.message || 'Something went wrong with the dashboard'
        );
      }
      dispatch({
        type: types.GET_SHARED_DASHBOARD_SUCCEEDED,
        payload: response,
      });
    })
    .catch((error) => {
      dispatch({ type: types.GET_SHARED_DASHBOARD_FAILED, payload: error });
      notify.error('Something went wrong', error.messages);
    });
};
