import Router from 'next/router';

import { fetchLinkAs } from '../../utils/api/fetch';
import { tokens, users } from '../../utils/api/tokens';
import { API_GATEWAY_URI } from '../../utils/constants';
import { notify } from '../../utils/helpers/notification';
import {
  AUTH_KEY,
  clearAuthCookies,
  getCookie,
  getUserProfileLink,
  setAuthCookies,
} from '../../utils/helpers/storage';
import * as types from './types';

const checkEmail = (email) => {
  const url = {
    href: `${API_GATEWAY_URI}/users/tenants/verifyOrganizationEmail?email=${email}`,
    method: 'GET',
  };
  return fetchLinkAs(url);
};

export const clearLogin = () => ({
  type: types.CLEAR_LOGIN,
});

export const login =
  ({ email, password }, query) =>
  (dispatch) => {
    if (!email) {
      return notify.error('Email is required');
    }
    if (!password) {
      return notify.error('Password is required');
    }
    dispatch({ type: types.LOGIN });
    return checkEmail(email)
      .then(({ tenantName }) =>
        tokens.create(email, password, tenantName, query)
      )
      .then((payload) => {
        // SentryApp.setUser(payload.user_id);
        setAuthCookies(payload);
        dispatch({ type: types.LOGIN_SUCCESS, payload });
      })
      .catch((err) => dispatch({ type: types.LOGIN_ERROR }));
  };

export const logout = () => (dispatch) => {
  clearAuthCookies();
  dispatch({ type: types.USER_LOGOUT });
  notify.success('You have been successfully logged out!', '');
  return Router.push('/');
};

export const isLoggedIn = () => (dispatch) => {
  dispatch({ type: types.IS_LOGGED_IN, payload: !!getCookie(AUTH_KEY) });
};

export const clearForgotPassword = () => ({
  type: types.CLEAR_FORGOT_PASSWORD,
});

export const forgotPassword = (email) => (dispatch) => {
  if (!email) {
    return notify.error('Email is required');
  }
  dispatch({ type: types.FORGOT_PASSWORD });
  return checkEmail(email)
    .then(({ tenantName }) =>
      users.generateResetPasswordLink({ emailId: email, tenantName })
    )
    .then((payload) => {
      dispatch({ type: types.FORGOT_PASSWORD_SUCCESS });
    })
    .catch((err) => {
      dispatch({ type: types.FORGOT_PASSWORD_ERROR });
      notify.error(err?.body?.message);
    });
};

export const resetPassword = (param) => (dispatch) => {
  dispatch({ type: types.RESET_PASSWORD });
  users
    .resetPassword(param)
    .then((payload) => {
      dispatch({ type: types.RESET_PASSWORD_SUCCESS });
    })
    .catch((err) => {
      dispatch({ type: types.RESET_PASSWORD_ERROR });
      notify.error(err?.body?.message);
    });
};

export const getMyProfile = () => (dispatch) => {
  let user_profile_link = getUserProfileLink();
  if (!user_profile_link) return dispatch(logout());

  dispatch({ type: types.MY_PROFILE });
  return fetchLinkAs(user_profile_link)
    .then((payload) => {
      dispatch({ type: types.MY_PROFILE_SUCCESS, payload });
    })
    .catch((err) => {
      dispatch({ type: types.MY_PROFILE_ERROR });
      notify.error(err?.body?.message);
    });
};
