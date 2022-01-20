import * as types from './types';

export const showDialog = (options) => ({
  type: types.SHOW_DIALOG,
  payload: options,
});

export const hideDialog = () => ({
  type: types.HIDE_DIALOG,
});

export const setDialogOptions = (payload) => ({
  type: types.SET_DIALOG_OPTIONS,
  payload,
});

export const setDialogParams = (payload) => ({
  type: types.SET_DIALOG_PARAMS,
  payload,
});

export const clearDialogParams = () => ({
  type: types.CLEAR_DIALOG_PARAMS,
});

export const showFiltersDialog = (options) => ({
  type: types.SHOW_FILTERS_DIALOG,
  payload: options,
});

export const hideFiltersDialog = () => ({
  type: types.HIDE_FILTERS_DIALOG,
});
