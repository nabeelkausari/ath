import { USER_LOGOUT } from '../auth/types';
import rosterReducer from './roster/reducer';
import * as types from './types';
import { combineReducers } from 'redux';
import concatenateReducers from 'redux-concatenate-reducers';

const initialState = {
  profile_requested: null,
  profile_succeeded: null,
  profile_failed: null,
  profile: {},
  cities_requested: null,
  cities_succeeded: null,
  cities_failed: null,
  cities: [],
};

const adminMainReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_CITIES:
      return {
        ...state,
        cities_requested: true,
        cities_failed: null,
        cities_succeeded: null,
      };

    case types.CITIES_SUCCESS:
      return {
        ...state,
        cities_requested: false,
        cities_succeeded: true,
        cities: payload,
      };
    case types.CITIES_ERROR:
      return {
        ...state,
        cities_requested: false,
        cities_succeeded: false,
        cities_failed: true,
      };

    case types.GET_ADMIN_PROFILE:
      return {
        ...state,
        profile_requested: true,
        profile_failed: null,
        profile_succeeded: null,
      };

    case types.ADMIN_PROFILE_SUCCESS:
      return {
        ...state,
        profile_requested: false,
        profile_succeeded: true,
        profile: payload,
      };
    case types.ADMIN_PROFILE_ERROR:
      return {
        ...state,
        profile_requested: false,
        profile_succeeded: false,
        profile_failed: true,
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

const adminReducer = concatenateReducers([
  adminMainReducer,
  combineReducers({
    roster: rosterReducer,
  }),
]);

export default adminReducer;
