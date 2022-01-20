import { CLEAR_SOLVE } from "../types";
import * as types from './types';

const initialState = {
  console_loading: null,
  fetch_console_succeeded: null,
  fetch_console_error: null,
  console_url: '',
  discard_console_requested: null,
  discard_console_succeeded: null,
  discard_console_error: null,
  discard_notebook_requested: null,
  discard_notebook_succeeded: null,
  discard_notebook_error: null,
  fetch_notebook_requested: null,
  fetch_notebook_succeeded: null,
  fetch_notebook_error: null,
  notebook_data: {},
};

const consoleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_CONSOLE_REQUESTED:
      return {
        ...state,
        console_loading: true,
        fetch_console_error: null,
        fetch_console_succeeded: null,
      };

    case types.FETCH_CONSOLE_SUCCEEDED:
      return {
        ...state,
        console_loading: false,
        fetch_console_succeeded: true,
        console_url: payload,
      };

    case types.FETCH_CONSOLE_FAILED:
      return {
        ...state,
        console_loading: false,
        fetch_console_succeeded: false,
        fetch_console_error: payload,
      };
    case types.DISCARD_CONSOLE_REQUESTED:
      return {
        ...state,
        discard_console_requested: true,
        discard_console_succeeded: null,
        discard_console_error: null,
      };

    case types.DISCARD_CONSOLE_SUCCEEDED:
      return {
        ...state,
        discard_console_requested: false,
        discard_console_succeeded: true,
        discard_console_error: false,
      };

    case types.DISCARD_CONSOLE_FAILED:
      return {
        ...state,
        discard_console_requested: false,
        discard_console_succeeded: false,
        discard_console_error: true,
      };

    case types.FETCH_NOTEBOOK_REQUESTED:
      return {
        ...state,
        fetch_notebook_requested: true,
        fetch_notebook_succeeded: null,
        fetch_notebook_error: null,
      };

    case types.FETCH_NOTEBOOK_SUCCEEDED:
      return {
        ...state,
        fetch_notebook_requested: false,
        fetch_notebook_succeeded: true,
        fetch_notebook_error: false,
        notebook_data: payload,
      };

    case types.FETCH_NOTEBOOK_FAILED:
      return {
        ...state,
        fetch_notebook_requested: false,
        fetch_notebook_succeeded: false,
        fetch_notebook_error: true,
      };
    case types.DISCARD_NOTEBOOK_REQUESTED:
      return {
        ...state,
        discard_notebook_requested: true,
        discard_notebook_succeeded: null,
        discard_notebook_error: null,
      };

    case types.DISCARD_NOTEBOOK_SUCCEEDED:
      return {
        ...state,
        discard_notebook_requested: false,
        discard_notebook_succeeded: true,
        discard_notebook_error: false,
        notebook_data: payload,
      };

    case types.DISCARD_NOTEBOOK_FAILED:
      return {
        ...state,
        discard_notebook_requested: false,
        discard_notebook_succeeded: false,
        discard_notebook_error: true,
      };
    case types.UNSET_CONSOLE_URL:
      return {
        ...state,
        console_url: '',
        fetch_console_succeeded: null,
        fetch_console_error: null,
      };

    case CLEAR_SOLVE:
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
};

export default consoleReducer;
