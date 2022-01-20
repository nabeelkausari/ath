import Cookies from 'universal-cookie';

import { IS_DEV } from '../constants';

export const AUTH_KEY = 'OE__auth';
export const USER_ID = 'USER_ID';
export const USER_PROFILE_LINK_KEY = 'USER_PROFILE_LINK_KEY';

const cookies = new Cookies();

function extractHostname(url) {
  let hostname;
  if (url.indexOf('//') > -1) {
    hostname = url.split('/')[2];
  } else {
    hostname = url.split('/')[0];
  }
  hostname = hostname.split(':')[0];
  hostname = hostname.split('?')[0];
  const [subdomain, ...domain] = hostname.split('.');
  return domain.join('.');
}

const NEXT_YEAR = new Date().setFullYear(new Date().getFullYear() + 1);
const configOption = {
  path: '/',
  domain: IS_DEV
    ? 'localhost'
    : typeof window !== 'undefined'
    ? `.${extractHostname(window.location.href)}`
    : '',
  expires: new Date(NEXT_YEAR),
};

export const setCookie = (key, value) => {
  cookies.set(key, value, configOption);
};

export const getCookie = (key) => {
  return cookies.get(key);
};
export const removeCookie = (key) => {
  return cookies.remove(key, configOption);
};

export const getUserProfileLink = () => {
  return getCookie(USER_PROFILE_LINK_KEY);
};

export const getUserIdFromProfile = () => {
  const profileLink = getUserProfileLink();
  return profileLink?.href?.split('/')[2];
};

export const setAuthCookies = (token) => {
  setCookie(USER_ID, token?.user_id?.toString());
  setCookie(USER_PROFILE_LINK_KEY, {
    ...token?._links?.user_profile,
    type: 'application/json',
  });
};

export const clearAuthCookies = () => {
  removeCookie(AUTH_KEY);
  removeCookie(USER_ID);
  removeCookie(USER_PROFILE_LINK_KEY);
};
