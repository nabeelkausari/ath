import { USER_LOGOUT } from '../auth/types';
import * as types from './types';

const initialState = {
  my_org_cases_requested: null,
  my_org_cases_succeeded: null,
  my_org_cases_failed: null,
  my_org_cases: [],
  project_requested: true,
  project_failed: null,
  project_succeeded: null,
  project: {},
  clone_project_requested: null,
  clone_project_failed: null,
  clone_project_succeeded: null,
  cloned_project: {},
  fetch_case_categories_requested: null,
  fetch_case_categories_error: null,
  fetch_case_categories_succeeded: null,
  case_categories: [],
  case_notes_requested: null,
  case_notes_failed: null,
  case_notes_succeeded: null,
  case_notes: [],
};

const casesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_CASE_CATEGORIES_REQUESTED: {
      return {
        ...state,
        fetch_case_categories_requested: true,
      };
    }

    case types.FETCH_CASE_CATEGORIES_SUCCEEDED: {
      return {
        ...state,
        fetch_case_categories_requested: false,
        fetch_case_categories_succeeded: true,
        case_categories: payload,
      };
    }

    case types.FETCH_CASE_CATEGORIES_FAILED: {
      return {
        ...state,
        fetch_case_categories_requested: false,
        fetch_case_categories_error: payload,
      };
    }

    case types.CLEAR_CASE:
      return {
        ...state,
        project_requested: null,
        project_failed: null,
        project_succeeded: null,
        project: initialState.project,
      };
    case types.GET_CASE:
      return {
        ...state,
        project_requested: true,
        project_failed: null,
        project_succeeded: null,
      };
    case types.GET_CASE_SUCCESS:
      return {
        ...state,
        project_requested: false,
        project_succeeded: true,
        project: payload,
      };
    case types.GET_CASE_ERROR:
      return {
        ...state,
        project_requested: false,
        project_succeeded: false,
        project_failed: true,
      };
    case types.CLEAR_CLONE_PROJECT:
      return {
        ...state,
        clone_project_requested: null,
        clone_project_failed: null,
        clone_project_succeeded: null,
        cloned_project: initialState.cloned_project,
      };
    case types.CLONE_PROJECT:
      return {
        ...state,
        clone_project_requested: true,
        clone_project_failed: null,
        clone_project_succeeded: null,
      };
    case types.CLONE_PROJECT_SUCCESS:
      return {
        ...state,
        clone_project_requested: false,
        clone_project_succeeded: true,
        cloned_project: payload,
      };
    case types.CLONE_PROJECT_ERROR:
      return {
        ...state,
        clone_project_requested: false,
        clone_project_succeeded: false,
        clone_project_failed: true,
      };
    case types.MY_ORGANIZATION_CASES:
      return {
        ...state,
        my_org_cases_requested: true,
        my_org_cases_failed: null,
        my_org_cases_succeeded: null,
      };
    case types.MY_ORGANIZATION_CASES_SUCCESS:
      return {
        ...state,
        my_org_cases_requested: false,
        my_org_cases_succeeded: true,
        my_org_cases: payload,
      };
    case types.MY_ORGANIZATION_CASES_ERROR:
      return {
        ...state,
        my_org_cases_requested: false,
        my_org_cases_succeeded: false,
        my_org_cases_failed: true,
      };
    case types.GET_CASE_NOTES:
      return {
        ...state,
        case_notes_requested: true,
        case_notes_failed: null,
        case_notes_succeeded: null,
      };
    case types.GET_CASE_NOTES_SUCCESS:
      return {
        ...state,
        case_notes_requested: false,
        case_notes_succeeded: true,
        case_notes: payload,
      };
    case types.GET_CASE_NOTES_ERROR:
      return {
        ...state,
        case_notes_requested: false,
        case_notes_succeeded: false,
        case_notes_failed: true,
      };
    case types.SAVE_CASE_NOTE:
      return {
        ...state,
        save_case_note_requested: true,
        save_case_note_failed: null,
        save_case_note_succeeded: null,
      };
    case types.SAVE_CASE_NOTE_SUCCESS:
      return {
        ...state,
        save_case_note_requested: false,
        save_case_note_succeeded: true,
      };
    case types.SAVE_CASE_NOTE_ERROR:
      return {
        ...state,
        save_case_note_requested: false,
        save_case_note_succeeded: false,
        save_case_note_failed: true,
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
