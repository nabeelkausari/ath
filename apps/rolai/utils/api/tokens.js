import * as base64 from 'base-64';

import { BASE_URI } from '../constants';
import { notify } from '../helpers/notification';
import { authorizer } from './auth';
import { fetchLink, fetchLinkAs } from './fetch';
import { TOKEN } from './media-types';

const EMAIL_VERIFICATION_URI = `${BASE_URI}users/email/verify`;

const generateQueryString = (params) => {
  let esc = encodeURIComponent;
  return Object.keys(params)
    .map((k) => esc(k) + '=' + esc(params[k]))
    .join('&');
};

const register = (query = {}) => {
  const query_string = generateQueryString(query);
  let href = '/users?' + query_string;
  return {
    href,
    method: 'POST',
    type: 'application/vnd.Analyttica.TreasureHunt.UserRegistration+json',
    accept: 'application/vnd.Analyttica.TreasureHunt.User+json',
  };
};

const tokensLink = (query = {}) => {
  const query_string = generateQueryString(query);
  let href = '/tokens?' + query_string;
  return { href, method: 'POST', accept: TOKEN };
};

const generateResetPwdLink = {
  href: '/password/forgot',
  method: 'POST',
  type: 'application/json',
  accept: 'application/json',
};

const resetPasswordLink = {
  href: '/password/reset',
  method: 'POST',
  type: 'application/json',
  accept: 'application/json',
};

export const returnProcessedToken = (token) => {
  authorizer.setHeader(`Bearer ${token.authorization}`);
  return token;
};
export const tokens = {
  create: (username, password, tenant, query) => {
    const headers = new Headers();
    headers.set(
      'Authorization',
      `Basic ${base64.encode(`${username}:${password}:${tenant}`)}`
    );
    return fetchLinkAs(tokensLink(query), undefined, headers).then((token) =>
      returnProcessedToken(token)
    );
  },
};

export const isPasswordValid = (password) => {
  return (
    /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(password) &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    password.length > 7 &&
    password.length < 31
  );
};

export const notifyPasswordError = () => {
  notify.error(
    'Invalid password, it should be 8-30 characters long, and have at least one lowercase, one uppercase and one special character. Please make sure you have entered a valid password and try again.'
  );
  return false;
};

export const validatePassword = (newPassword, confirmPassword) => {
  if (newPassword === '' || confirmPassword === '') {
    notify.error('Password is required');
    return false;
  } else if (!isPasswordValid(newPassword)) {
    notifyPasswordError();
  } else if (newPassword !== confirmPassword) {
    notify.error('Passwords do not match');
    return false;
  } else {
    return true;
  }
};

const generateResetPasswordLink = (generateResetPasswordLinkEntity) =>
  fetchLink(generateResetPwdLink, generateResetPasswordLinkEntity);
const resetPassword = (resetPasswordLinkEntity) =>
  fetchLinkAs(resetPasswordLink, resetPasswordLinkEntity);

export const users = {
  register: (registration, query) => fetchLinkAs(register(query), registration),
  verifyEmail: (query) => fetch(`${EMAIL_VERIFICATION_URI}${query}`),
  generateResetPasswordLink,
  resetPassword,
};
