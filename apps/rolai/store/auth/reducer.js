import * as types from './types';

const initialState = {
  is_logged_in_check: false,
  is_logged_in: null,
  login_requested: null,
  login_succeeded: null,
  login_failed: null,
  forgot_password_requested: null,
  forgot_password_succeeded: null,
  forgot_password_failed: null,
  reset_password_requested: null,
  reset_password_succeeded: null,
  reset_password_failed: null,
  registration_requested: null,
  registration_succeeded: null,
  registration_failed: null,
  registration: null,
  fetch_captcha_loading: null,
  fetch_captcha_succeeded: null,
  fetch_captcha_failed: null,
  resend_email_loading: null,
  resend_email_succeeded: null,
  resend_email_failed: null,
  captcha: {
    image_source: null,
    key: null,
  },
  email: '',
  disable_resend_button: false,
  my_profile_requested: null,
  my_profile_succeeded: null,
  my_profile_failed: null,
  my_profile: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.CLEAR_LOGIN:
      return {
        ...state,
        login_requested: null,
        login_failed: null,
        login_succeeded: null,
      };
    case types.LOGIN:
      return {
        ...state,
        login_requested: true,
        login_failed: null,
        login_succeeded: null,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        is_logged_in: true,
        login_requested: false,
        login_succeeded: true,
        ...payload,
      };
    case types.LOGIN_ERROR:
      return {
        ...state,
        login_requested: false,
        login_succeeded: false,
        login_failed: true,
      };
    case types.IS_LOGGED_IN:
      return {
        ...state,
        is_logged_in_check: true,
        is_logged_in: payload,
      };
    case types.USER_LOGOUT:
      return {
        ...state,
        ...initialState,
      };

    case types.CLEAR_FORGOT_PASSWORD:
      return {
        ...state,
        forgot_password_requested: null,
        forgot_password_failed: null,
        forgot_password_succeeded: null,
      };

    case types.FORGOT_PASSWORD:
      return {
        ...state,
        forgot_password_requested: true,
        forgot_password_failed: null,
        forgot_password_succeeded: null,
      };
    case types.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgot_password_requested: false,
        forgot_password_succeeded: true,
      };
    case types.FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        forgot_password_requested: false,
        forgot_password_succeeded: false,
        forgot_password_failed: true,
      };

    case types.MY_PROFILE:
      return {
        ...state,
        my_profile_requested: true,
        my_profile_failed: null,
        my_profile_succeeded: null,
      };
    case types.MY_PROFILE_SUCCESS:
      return {
        ...state,
        my_profile_requested: false,
        my_profile_succeeded: true,
        my_profile: payload,
      };
    case types.MY_PROFILE_ERROR:
      return {
        ...state,
        my_profile_requested: false,
        my_profile_succeeded: false,
        my_profile_failed: true,
      };

    case types.RESET_PASSWORD:
      return {
        ...state,
        reset_password_requested: true,
        reset_password_failed: null,
        reset_password_succeeded: null,
      };
    case types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        reset_password_requested: false,
        reset_password_succeeded: true,
      };
    case types.RESET_PASSWORD_ERROR:
      return {
        ...state,
        reset_password_requested: false,
        reset_password_succeeded: false,
        reset_password_failed: true,
      };

    case types.REGISTER:
      return {
        ...state,
        registration_requested: true,
        registration_failed: null,
        registration_succeeded: null,
      };

    case types.REGISTER_SUCCESS:
      return {
        ...state,
        registration_requested: false,
        registration_succeeded: true,
        registration: payload,
      };

    case types.REGISTER_ERROR:
      return {
        ...state,
        registration_requested: false,
        registration_succeeded: false,
        registration_failed: true,
      };

    case types.RESET_REGISTER:
      return {
        ...state,
        registration_requested: null,
        registration_succeeded: null,
        registration_failed: null,
      };

    case types.FETCH_CAPTCHA:
      return {
        ...state,
        fetch_captcha_loading: true,
        fetch_captcha_succeeded: null,
        fetch_captcha_failed: null,
      };

    case types.FETCH_CAPTCHA_SUCCESS:
      return {
        ...state,
        fetch_captcha_loading: false,
        fetch_captcha_succeeded: true,
        fetch_captcha_failed: false,
        captcha: payload,
      };

    case types.FETCH_CAPTCHA_ERROR:
      return {
        ...state,
        fetch_captcha_loading: false,
        fetch_captcha_succeeded: false,
        fetch_captcha_failed: true,
      };
    case types.RESEND_EMAIL:
      return {
        ...state,
        resend_email_loading: true,
        resend_email_succeeded: null,
        resend_email_failed: null,
      };

    case types.RESEND_EMAIL_SUCCESS:
      return {
        ...state,
        resend_email_loading: false,
        resend_email_succeeded: true,
      };

    case types.RESEND_EMAIL_ERROR:
      return {
        ...state,
        resend_email_loading: false,
        resend_email_succeeded: false,
        fetch_captcha_failed: true,
      };

    case types.SET_EMAIL:
      return {
        ...state,
        email: payload,
      };

    case types.DISABLE_RESEND_BUTTON:
      return {
        ...state,
        disable_resend_button: true,
      };
    default:
      return state;
  }
};
