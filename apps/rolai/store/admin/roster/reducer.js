import { USER_LOGOUT } from '../../auth/types';
import * as types from './types';

const initialState = {
  users_requested: null,
  users_succeeded: null,
  users_failed: null,
  users: [],
  designations_requested: null,
  designations_succeeded: null,
  designations_failed: null,
  designations: [],
  access_levels_requested: null,
  access_levels_succeeded: null,
  access_levels_failed: null,
  access_levels: [],
  resources_requested: null,
  resources_succeeded: null,
  resources_failed: null,
  resources: [],
  filter: {
    designation: 'ALL',
    accessLevel: 'ALL',
    status: undefined,
    name: '',
  },
  pagination: {
    rowsPerPage: 10,
    page: 0,
  },
  user: {},
};

const rosterReducer = (state = initialState, { type, payload }) => {
  console.log(type, payload);
  switch (type) {
    case types.SET_ROSTER_FILTER:
      return { ...state, filter: { ...state.filter, ...payload } };
    case types.SET_ROSTER_PAGINATION:
      return { ...state, pagination: { ...state.pagination, ...payload } };
    case types.SET_ROSTER_USER:
      if (payload) return { ...state, user: { ...state.user, ...payload } };
      else return { ...state, user: {} };
    case types.GET_ROSTER_USERS:
      return {
        ...state,
        users_requested: true,
        users_failed: null,
        users_succeeded: null,
      };

    case types.DELETE_ROSTER_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== payload),
      };

    case types.CHANGE_ROSTER_USER_TOGGLE:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id == payload.id
            ? {
                ...user,
                status: payload.value ? 'Active' : 'InActive',
              }
            : user
        ),
      };

    case types.CHANGE_ROSTER_USER_TOGGLE_ERROR:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id == payload.id
            ? {
                ...user,
                status: payload.value ? 'InActive' : 'Active',
              }
            : user
        ),
      };

    case types.ROSTER_USERS_SUCCESS:
      return {
        ...state,
        users_requested: false,
        users_succeeded: true,
        users: payload,
      };
    case types.ROSTER_USERS_ERROR:
      return {
        ...state,
        users_requested: false,
        users_succeeded: false,
        users_failed: true,
      };

    case types.GET_ROSTER_RESOURCES:
      return {
        ...state,
        resources_requested: true,
        resources_failed: null,
        resources_succeeded: null,
      };

    case types.ROSTER_RESOURCES_SUCCESS:
      return {
        ...state,
        resources_requested: false,
        resources_succeeded: true,
        resources: payload,
      };
    case types.ROSTER_RESOURCES_ERROR:
      return {
        ...state,
        resources_requested: false,
        resources_succeeded: false,
        resources_failed: true,
      };

    case types.GET_ROSTER_DESIGNATIONS:
      return {
        ...state,
        designations_requested: true,
        designations_failed: null,
        designations_succeeded: null,
      };

    case types.ROSTER_DESIGNATIONS_SUCCESS:
      return {
        ...state,
        designations_requested: false,
        designations_succeeded: true,
        designations: payload,
      };
    case types.ROSTER_DESIGNATIONS_ERROR:
      return {
        ...state,
        designations_requested: false,
        designations_succeeded: false,
        designations_failed: true,
      };

    case types.GET_ROSTER_ACCESS_LEVELS:
      return {
        ...state,
        access_levels_requested: true,
        access_levels_failed: null,
        access_levels_succeeded: null,
      };

    case types.ROSTER_ACCESS_LEVELS_SUCCESS:
      return {
        ...state,
        access_levels_requested: false,
        access_levels_succeeded: true,
        access_levels: payload,
      };
    case types.ROSTER_ACCESS_LEVELS_ERROR:
      return {
        ...state,
        access_levels_requested: false,
        access_levels_succeeded: false,
        access_levels_failed: true,
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

export default rosterReducer;
