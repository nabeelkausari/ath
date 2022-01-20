import { USER_LOGOUT } from '../auth/types';
import * as types from './types';

const initialState = {
  where_you_left_requested: null,
  where_you_left_succeeded: null,
  where_you_left_failed: null,
  where_you_left: [],
  my_projects_requested: null,
  my_projects_succeeded: null,
  my_projects_failed: null,
  my_projects: [],
  dashboard_all_notes_requested: null,
  dashboard_all_notes_succeeded: null,
  dashboard_all_notes_failed: null,
  dashboard_all_notes: [],
  dashboard_all_lessons_requested: null,
  dashboard_all_lessons_succeeded: null,
  dashboard_all_lessons_failed: null,
  dashboard_all_lessons: [],
  note_filter: { selected: 0, selectedLesson: 0, searchValue: '' },
  lesson_filter: { selected: 0, searchValue: '' },
  dashboard_home_notes_requested: null,
  dashboard_home_notes_succeeded: null,
  dashboard_home_notes_failed: null,
  dashboard_home_notes: {},
  dashboard_home_lessons_requested: null,
  dashboard_home_lessons_succeeded: null,
  dashboard_home_lessons_failed: null,
  dashboard_home_lessons: {},
};

const dashboardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_DASHBOARD_LESSON_FILTER:
      return {
        ...state,
        lesson_filter: payload,
      };
    case types.SET_DASHBOARD_NOTE_FILTER:
      return {
        ...state,
        note_filter: payload,
      };
    case types.GET_WHERE_YOU_LEFT:
      return {
        ...state,
        where_you_left_requested: true,
        where_you_left_failed: null,
        where_you_left_succeeded: null,
      };

    case types.WHERE_YOU_LEFT_SUCCESS:
      return {
        ...state,
        where_you_left_requested: false,
        where_you_left_succeeded: true,
        where_you_left: payload,
      };
    case types.WHERE_YOU_LEFT_ERROR:
      return {
        ...state,
        where_you_left_requested: false,
        where_you_left_succeeded: false,
        where_you_left_failed: true,
      };
    case types.GET_MY_PROJECTS:
      return {
        ...state,
        my_projects_requested: true,
        my_projects_failed: null,
        my_projects_succeeded: null,
      };

    case types.MY_PROJECTS_SUCCESS:
      return {
        ...state,
        my_projects_requested: false,
        my_projects_succeeded: true,
        my_projects: payload,
      };
    case types.MY_PROJECTS_ERROR:
      return {
        ...state,
        my_projects_requested: false,
        my_projects_succeeded: false,
        my_projects_failed: true,
      };

    case types.GET_DASHBOARD_ALL_NOTES:
      return {
        ...state,
        dashboard_all_notes_requested: true,
        dashboard_all_notes_failed: null,
        dashboard_all_notes_succeeded: null,
      };

    case types.DASHBOARD_ALL_NOTES_SUCCESS:
      return {
        ...state,
        dashboard_all_notes_requested: false,
        dashboard_all_notes_succeeded: true,
        dashboard_all_notes: payload,
      };
    case types.DASHBOARD_ALL_NOTES_ERROR:
      return {
        ...state,
        dashboard_all_notes_requested: false,
        dashboard_all_notes_succeeded: false,
        dashboard_all_notes_failed: true,
      };

    case types.GET_DASHBOARD_ALL_LESSONS:
      return {
        ...state,
        dashboard_all_lessons_requested: true,
        dashboard_all_lessons_failed: null,
        dashboard_all_lessons_succeeded: null,
      };

    case types.DASHBOARD_ALL_LESSONS_SUCCESS:
      return {
        ...state,
        dashboard_all_lessons_requested: false,
        dashboard_all_lessons_succeeded: true,
        dashboard_all_lessons: payload,
      };
    case types.DASHBOARD_ALL_LESSONS_ERROR:
      return {
        ...state,
        dashboard_all_lessons_requested: false,
        dashboard_all_lessons_succeeded: false,
        dashboard_all_lessons_failed: true,
      };

    case types.GET_DASHBOARD_HOME_NOTES:
      return {
        ...state,
        dashboard_home_notes_requested: true,
        dashboard_home_notes_failed: null,
        dashboard_home_notes_succeeded: null,
      };

    case types.DASHBOARD_HOME_NOTES_SUCCESS:
      return {
        ...state,
        dashboard_home_notes_requested: false,
        dashboard_home_notes_succeeded: true,
        dashboard_home_notes: payload,
      };
    case types.DASHBOARD_HOME_NOTES_ERROR:
      return {
        ...state,
        dashboard_home_notes_requested: false,
        dashboard_home_notes_succeeded: false,
        dashboard_home_notes_failed: true,
      };

    case types.GET_DASHBOARD_HOME_LESSONS:
      return {
        ...state,
        dashboard_home_lessons_requested: true,
        dashboard_home_lessons_failed: null,
        dashboard_home_lessons_succeeded: null,
      };

    case types.DASHBOARD_HOME_LESSONS_SUCCESS:
      return {
        ...state,
        dashboard_home_lessons_requested: false,
        dashboard_home_lessons_succeeded: true,
        dashboard_home_lessons: payload,
      };
    case types.DASHBOARD_HOME_LESSONS_ERROR:
      return {
        ...state,
        dashboard_home_lessons_requested: false,
        dashboard_home_lessons_succeeded: false,
        dashboard_home_lessons_failed: true,
        dashboard_home_notes: [],
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

export default dashboardReducer;
