import { USER_LOGOUT } from '../auth/types';
import * as types from './types';
import moment from 'moment';
import { BACKEND_DF, eventTypes } from '../../utils/helpers/calendar';

const filterTypes = [{ type: 'ALL', label: 'All' }, ...eventTypes];

const initialState = {
  selected: {
    date: moment(),
    type: 'month',
    range: [],
    animDirection: 1,
  },
  filter: { types: [...eventTypes], searchText: '' },
  searchFilter: {
    opened: false,
    type: 'ALL',
    items: [...filterTypes],
    expanded: false,
    searchText: '',
    // from: undefined,
    // to: undefined,
    refresh: false,
  },
  popper: { type: '', opened: false },
  calendar_events_requested: null,
  calendar_events_succeeded: null,
  calendar_events_failed: null,
  calendar_events: [],
  event_details_requested: null,
  event_details_succeeded: null,
  event_details_failed: null,
  event_details: [],
  timezones_requested: null,
  timezones_succeeded: null,
  timezones_failed: null,
  timezones: [],
  create_event_requested: null,
  create_event_succeeded: null,
  create_event_failed: null,
  event_courses_projects_requested: null,
  event_courses_projects_succeeded: null,
  event_courses_projects_failed: null,
  event_courses_projects: [],
  event_users_requested: null,
  event_users_succeeded: null,
  event_users_failed: null,
  event_users: [],
  calendar_search_events_requested: null,
  calendar_search_events_succeeded: null,
  calendar_search_events_failed: null,
  calendar_search_events: [],
  refreshRequired: 0,
};

const calendarReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_CALENDAR_SELECTED:
      return { ...state, selected: { ...state.selected, ...payload } };
    case types.SET_CALENDAR_FILTER:
      return { ...state, filter: { ...state.filter, ...payload } };
    case types.SET_CALENDAR_POPPER:
      return { ...state, popper: { ...state.popper, ...payload } };
    case types.SET_CALENDAR_SEARCH_FILTER:
      return { ...state, searchFilter: { ...state.searchFilter, ...payload } };
    case types.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        popper: { opened: false },
        refreshRequired: state.refreshRequired + 1,
      };

    case types.GET_CALENDAR_EVENTS:
      return {
        ...state,
        calendar_events_requested: true,
        calendar_events_failed: null,
        calendar_events_succeeded: null,
      };

    case types.CALENDAR_EVENTS_SUCCESS:
      return {
        ...state,
        calendar_events_requested: false,
        calendar_events_succeeded: true,
        calendar_events: payload,
      };
    case types.CALENDAR_EVENTS_ERROR:
      return {
        ...state,
        calendar_events_requested: false,
        calendar_events_succeeded: false,
        calendar_events_failed: true,
      };
    case types.CLEAR_CALENDAR_SEARCH_EVENTS:
      return {
        ...state,
        calendar_search_events: [],
      };
    case types.GET_CALENDAR_SEARCH_EVENTS:
      return {
        ...state,
        calendar_search_events_requested: true,
        calendar_search_events_failed: null,
        calendar_search_events_succeeded: null,
      };

    case types.CALENDAR_SEARCH_EVENTS_SUCCESS:
      return {
        ...state,
        calendar_search_events_requested: false,
        calendar_search_events_succeeded: true,
        calendar_search_events: payload,
      };
    case types.CALENDAR_SEARCH_EVENTS_ERROR:
      return {
        ...state,
        calendar_search_events_requested: false,
        calendar_search_events_succeeded: false,
        calendar_search_events_failed: true,
      };

    case types.GET_EVENT_DETAILS:
      return {
        ...state,
        event_details_requested: true,
        event_details_failed: null,
        event_details_succeeded: null,
        event_details: [],
      };

    case types.EVENT_DETAILS_SUCCESS:
      return {
        ...state,
        event_details_requested: false,
        event_details_succeeded: true,
        event_details: payload,
      };
    case types.EVENT_DETAILS_ERROR:
      return {
        ...state,
        event_details_requested: false,
        event_details_succeeded: false,
        event_details_failed: true,
      };

    case types.GET_TIMEZONES:
      return {
        ...state,
        timezones_requested: true,
        timezones_failed: null,
        timezones_succeeded: null,
      };

    case types.TIMEZONES_SUCCESS:
      return {
        ...state,
        timezones_requested: false,
        timezones_succeeded: true,
        timezones: payload,
      };
    case types.TIMEZONES_ERROR:
      return {
        ...state,
        timezones_requested: false,
        timezones_succeeded: false,
        timezones_failed: true,
      };

    case types.GET_CREATE_EVENT:
      return {
        ...state,
        create_event_requested: true,
        create_event_failed: null,
        create_event_succeeded: null,
      };

    case types.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        create_event_requested: false,
        create_event_succeeded: true,
        create_event: payload,
        refreshRequired: state.refreshRequired + 1,
      };
    case types.CREATE_EVENT_ERROR:
      return {
        ...state,
        create_event_requested: false,
        create_event_succeeded: false,
        create_event_failed: true,
      };

    case types.GET_EVENT_COURSES_PROJECTS:
      return {
        ...state,
        event_courses_projects_requested: true,
        event_courses_projects_failed: null,
        event_courses_projects_succeeded: null,
        event_courses_projects: [],
      };

    case types.EVENT_COURSES_PROJECTS_SUCCESS:
      return {
        ...state,
        event_courses_projects_requested: false,
        event_courses_projects_succeeded: true,
        event_courses_projects: payload,
      };
    case types.EVENT_COURSES_PROJECTS_ERROR:
      return {
        ...state,
        event_courses_projects_requested: false,
        event_courses_projects_succeeded: false,
        event_courses_projects_failed: true,
      };

    case types.GET_EVENT_USERS:
      return {
        ...state,
        event_users_requested: true,
        event_users_failed: null,
        event_users_succeeded: null,
        event_users: [],
      };

    case types.EVENT_USERS_SUCCESS:
      return {
        ...state,
        event_users_requested: false,
        event_users_succeeded: true,
        event_users: payload,
      };
    case types.EVENT_USERS_ERROR:
      return {
        ...state,
        event_users_requested: false,
        event_users_succeeded: false,
        event_users_failed: true,
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

export default calendarReducer;
