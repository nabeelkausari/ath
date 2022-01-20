import Router from 'next/router';
import { DIALOG_WIDTH_MEDIUM } from '../../components/DialogView/DialogView.styles';

import {
  CLONE_PROJECT,
  CLONE_PROJECT_ERROR,
  CLONE_PROJECT_SUCCESS,
} from '../cases/types';
import * as types from './types';

const initialState = {
  is_filters_dialog_open: false,

  is_dialog_open: false,
  dialog_options: {
    message: '',
    submitting: null,
    title: null,
    hide_header: false,
    hide_footer: false,
    yes_button: { text: 'OK', onClick: () => null, disabled: false },
    no_button: { text: 'cancel', onClick: () => null },
    header_button: null,
    component: null,
    size: 'small',
  },
  dialog_params: {},
};

const globalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SHOW_DIALOG:
      return {
        ...state,
        is_dialog_open: true,
        dialog_options: {
          ...payload.options,
          size: payload.options.size || initialState.dialog_options.size,
        },
        dialog_params: payload.params,
      };
    case types.HIDE_DIALOG:
      return {
        ...state,
        is_dialog_open: state.dialog_options.submitting
          ? state.is_dialog_open
          : false,
      };
    case types.SET_DIALOG_OPTIONS:
      return {
        ...state,
        dialog_options: { ...state.dialog_options, ...payload },
      };
    case types.SET_DIALOG_PARAMS:
      return {
        ...state,
        dialog_params: { ...state.dialog_params, [payload.key]: payload.value },
      };
    case types.CLEAR_DIALOG_PARAMS:
      return {
        ...state,
        dialog_params: {},
      };
    case types.SHOW_FILTERS_DIALOG:
      return {
        ...state,
        is_filters_dialog_open: true,
      };
    case types.HIDE_FILTERS_DIALOG:
      return {
        ...state,
        is_filters_dialog_open: false,
      };
    case CLONE_PROJECT:
      return {
        ...state,
        dialog_options: {
          ...state.dialog_options,
          submitting: true,
        },
      };
    case CLONE_PROJECT_ERROR:
      return {
        ...state,
        dialog_options: {
          ...state.dialog_options,
          submitting: false,
        },
      };
    case CLONE_PROJECT_SUCCESS:
      return {
        ...state,
        dialog_options: {
          ...state.dialog_options,
          submitting: false,
          no_hide_with_yes: false,
          title: 'Confirmation',
          no_button: { ...state.dialog_options.no_button, text: 'No' },
          yes_button: {
            text: 'Yes',
            onClick: () => Router.push(`/projects/${payload.id}`),
          },
        },
      };
    default:
      return state;
  }
};
export default globalReducer;
