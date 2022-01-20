export const httpMethods = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE',
  patch: 'PATCH',
};
export const DEFAULT_REQUEST_INIT = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  method: httpMethods.get,
};

export const BASE_URI = process.env.NX_API_GATEWAY_URL + '/';
export const API_GATEWAY_URI = process.env.NX_API_GATEWAY_URL;
export const APP_URL = process.env.NX_APP_URL;

export const IS_DEV = process.env.NODE_ENV === 'development';

const DEV_STRIPE_KEY =
  'pk_test_51HoRxTK4HLBC4rwC7yeBEfiyoEUsyb5ziPaSuL6krku0Yvp87VgOAJMy7OCBIq8pfonMNhnLFAvlYJj0kZJBNPRC00HQGzAWJL';
const PROD_STRIPE_KEY =
  'pk_live_51HoRxTK4HLBC4rwCKPCcDLa9G4gTZc7OW8hMshaKZdgLuqODnxHmcyPnVcD18lbHPbKFW8f7lSwMGrqEPtqQVqLE00GFD6K609';
export const STRIPE_KEY = IS_DEV ? DEV_STRIPE_KEY : PROD_STRIPE_KEY;

export const DASHBOARD_GRID = 96;
export const DASHBOARD_SIZES = {
  STEP: {
    h: 30,
    w: 30,
  },
  CASE: {
    'sub-heading': {
      h: 6,
      w: 20,
    },
    heading: {
      h: 7,
      w: 20,
    },
    paragraph: {
      h: 7,
      w: 20,
    },
    editor: {
      h: 10,
      w: 20,
    },
  },
};

export const USER = 'USER';
export const REFERENCE = 'REFERENCE';
export const MAX_IMAGE_SIZE = 1048576;
