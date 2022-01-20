import { fetchLinkAs } from '../../utils/api/fetch';
import { notify } from '../../utils/helpers/notification';
import * as types from './types';

export const getExploreAllData = (params) => (dispatch) => {
  const paramsQueryArr = params
    ? Object.keys(params).map((param) => `${param}=${params[param]}`)
    : null;

  const paramsQueryString = paramsQueryArr
    ? `?${paramsQueryArr.join('&')}`
    : '';

  const explore_all_link = {
    href: encodeURI(`/content/discover${paramsQueryString}`),
    type: 'application/json',
  };
  dispatch({ type: types.EXPLORE_ALL_DATA });
  fetchLinkAs(explore_all_link)
    .then((payload) => {
      dispatch({ type: types.EXPLORE_ALL_DATA_SUCCESS, payload });
    })
    .catch((err) => {
      dispatch({ type: types.EXPLORE_ALL_DATA_ERROR });
      notify.error(err?.body?.message);
    });
};

export const searchData = (keyword) => ({
  type: types.SEARCH_DATA,
  payload: keyword,
});
