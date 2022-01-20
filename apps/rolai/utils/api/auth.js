import {
  AUTH_KEY,
  getCookie,
  removeCookie,
  setCookie,
} from '../helpers/storage';
import { TOKEN } from './media-types';

let authHeader = undefined;

export const authorizer = {
  setHeader: (authorizationHeader) => {
    authHeader = authorizationHeader;
    if (authHeader === undefined) removeCookie(AUTH_KEY);
    else setCookie(AUTH_KEY, authorizationHeader);
  },
  getHeader: () => getCookie(AUTH_KEY),
};

export const getGoogleLoginLink = (authorization_code) => ({
  href: `/social/google?authorization_code=${authorization_code}`,
  method: 'POST',
  accept: TOKEN,
  type: 'application/json',
});

export const getLinkedInLoginLink = (authorization_code) => ({
  href: `/social/linkedin?authorization_code=${authorization_code}`,
  method: 'POST',
  accept: TOKEN,
  type: 'application/json',
});
