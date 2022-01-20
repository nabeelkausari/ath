import { fetchLink, fetchLinkAs } from '../../../utils/api/fetch';
import { notify } from '../../../utils/helpers/notification';
import { getUserIdFromProfile } from '../../../utils/helpers/storage';
import { hideDialog } from '../../global/actions';
import * as types from './types';

export const getRosterUsers =
  ({ name, designation, status, accessLevel, page, rowsPerPage }) =>
  (dispatch, getState) => {
    const user_id = getUserIdFromProfile();

    const searchParams = {
      name,
      designation: designation !== 'ALL' ? designation : '',
      role: accessLevel != 'ALL' ? accessLevel : '',
      pageSize: rowsPerPage,
      pageNo: page,
      status: status,
    };

    const searchParamString = Object.keys(searchParams)
      .map(
        (i) =>
          searchParams[i] !== undefined &&
          searchParams[i] !== '' &&
          i + '=' + searchParams[i]
      )
      .filter((i) => i)
      .join('&');

    const link = {
      href: `/users/${user_id}/tenants/da49652c-ba7d-4531-b610-a50cf856d841/users?${encodeURI(
        searchParamString
      )}`,
      accept: 'application/json',
    };

    dispatch({ type: types.GET_ROSTER_USERS });
    return fetchLinkAs(link)
      .then((payload) => {
        dispatch({
          type: types.ROSTER_USERS_SUCCESS,
          payload: payload.users || [],
        });
        dispatch(setRosterPagination({ records: payload.totalItems }));
      })
      .catch((err) => {
        dispatch({ type: types.ROSTER_USERS_ERROR });
        notify.error(err?.body?.message);
      });
  };

export const getDesignations = () => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/users/admin/tenants/da49652c-ba7d-4531-b610-a50cf856d841/designations`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_ROSTER_DESIGNATIONS });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.ROSTER_DESIGNATIONS_SUCCESS,
        payload: payload?.designations?.map((i, k) => ({
          label: i,
          value: i,
        })),
      });
    })
    .catch((err) => {
      dispatch({ type: types.ROSTER_DESIGNATIONS_ERROR });
      notify.error(err?.body?.message);
    });
};

export const getAllResources = (userId) => (dispatch, getState) => {
  const link = {
    href: `/content/admin/resources${userId ? '?userId=' + userId : ''}`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_ROSTER_RESOURCES });

  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.ROSTER_RESOURCES_SUCCESS,
        payload,
      });
    })
    .catch((err) => {
      dispatch({ type: types.ROSTER_RESOURCES_ERROR });
      notify.error(err?.body?.message);
    });
};

export const getAccessLevels = () => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/users/admin/role/tenants/da49652c-ba7d-4531-b610-a50cf856d841/roles`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_ROSTER_ACCESS_LEVELS });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.ROSTER_ACCESS_LEVELS_SUCCESS,
        payload: payload?.roles?.map((i, k) => ({
          label: i.displayName,
          value: i.key,
        })),
      });
    })
    .catch((err) => {
      dispatch({ type: types.ROSTER_ACCESS_LEVELS_ERROR });
      notify.error(err?.body?.message);
    });
};

export const changeUserToggle = (link, data) => (dispatch, getState) => {
  dispatch({
    type: types.CHANGE_ROSTER_USER_TOGGLE,
    payload: data,
  });
  return fetchLink(link)
    .then((payload) => {})
    .catch((err) => {
      notify.error(err?.body?.message);
      dispatch({
        type: types.CHANGE_ROSTER_USER_TOGGLE_ERROR,
        payload: data,
      });
    });
};

export const deleteRosterUser = (link, id) => (dispatch, getState) => {
  return fetchLinkAs(link, { userMappingIds: [id] })
    .then((payload) => {
      dispatch({ type: types.DELETE_ROSTER_USER, payload: id });
    })
    .catch((err) => {
      notify.error(err?.body?.message);
    });
};

export const createRosterUser = () => (dispatch, getState) => {
  const user = getState().admin.roster.user;
  console.log(user);
  const link = {
    href: `/users/admin/user`,
    type: 'application/json',
    method: 'POST',
  };

  return fetchLink(link, user)
    .then((payload) => {
      dispatch({ type: types.CREATE_ROSTER_USER_SUCCESS });
      notify.success('User Created Successfully');
      dispatch(hideDialog());
      dispatch(setRosterUser());
    })
    .catch((err) => {
      notify.error(err?.body?.message);
    });
};

export const updateRosterUser = () => (dispatch, getState) => {
  const user = getState().admin.roster.user;
  console.log(user);
  const link = {
    href: `/users/admin/user`,
    type: 'application/json',
    method: 'PUT',
  };

  return fetchLink(link, user)
    .then((payload) => {
      dispatch({ type: types.UPDATE_ROSTER_USER_SUCCESS });
      notify.success('User Updated Successfully');
      dispatch(hideDialog());
      dispatch(setRosterUser());
    })
    .catch((err) => {
      notify.error(err?.body?.message);
    });
};

export const setRosterFilter = (payload) => (dispatch) => {
  dispatch({ type: types.SET_ROSTER_FILTER, payload });
};
export const setRosterUser = (payload) => (dispatch) => {
  dispatch({ type: types.SET_ROSTER_USER, payload });
};

export const setRosterPagination = (payload) => (dispatch) => {
  dispatch({ type: types.SET_ROSTER_PAGINATION, payload });
};
