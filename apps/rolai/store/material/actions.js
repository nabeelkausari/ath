import { fetchLinkAs } from '../../utils/api/fetch';
import * as types from './types';

export const fetchMaterial = (link) => (dispatch) => {
  dispatch({ type: types.FETCH_MATERIAL_REQUESTED });
  fetchLinkAs(link)
    .then((payload) => {
      dispatch({ type: types.FETCH_MATERIAL_SUCCEEDED, payload });
    })

    .catch((error) => {
      dispatch({ type: types.FETCH_MATERIAL_FAILED });
      console.log(error);
    });
};

export const saveMaterial =
  (link, new_content, href) => (dispatch, getState) => {
    const {
      material: { by_uri },
    } = getState();
    let material = by_uri[link.href];

    dispatch({ type: types.UPDATE_MATERIAL_REQUESTED });
    fetchLinkAs(link, { ...material, text: new_content })
      .then((material) => {
        dispatch({
          type: types.UPDATE_MATERIAL_SUCCEEDED,
          payload: { material, href },
        });
      })
      .catch((error) => {
        dispatch({ type: types.UPDATE_MATERIAL_FAILED });
        console.log(error);
      });
  };
