import { USER_LOGOUT } from '../auth/types';
import * as types from './types';

const initialState = {
  explore_all_requested: null,
  explore_all_succeeded: null,
  explore_all_failed: null,
  explore_all: [],
  explore_all_copy: [],
  selected_filters: [],
  search_by: '',
};

const casesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.EXPLORE_ALL_DATA:
      return {
        ...state,
        explore_all_requested: true,
        explore_all_failed: null,
        explore_all_succeeded: null,
      };
    case types.EXPLORE_ALL_DATA_SUCCESS:
      return {
        ...state,
        explore_all_requested: false,
        explore_all_succeeded: true,
        explore_all: payload,
        explore_all_copy: payload,
        selected_filters: payload.filters
          .map((fl) => fl.types.map((f) => f.selected && { ...f, key: fl.key }))
          .reduce((a, b) => a.concat(b))
          .filter((a) => a),
      };
    case types.EXPLORE_ALL_DATA_ERROR:
      return {
        ...state,
        explore_all_requested: false,
        explore_all_succeeded: false,
        explore_all_failed: true,
      };
    case types.SEARCH_DATA:
      return {
        ...state,
        search_by: payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export default casesReducer;
