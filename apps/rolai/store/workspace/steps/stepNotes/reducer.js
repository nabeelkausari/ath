import * as types from './types';

const initialState = {
  notes_output: {
    is_primary_flyout_open: false,
    is_secondary_flyout_open: false,
    save_notes_succeeded: null,
  },
};

const stepNotesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SAVE_CURRENT_STEP:
      return {
        ...state,
        current_step: payload,
      };

    case types.FETCH_NOTES_REQUESTED:
      return {
        ...state,
        notes_loading: true,
        fetch_notes_error: null,
        fetch_notes_succeeded: null,
      };

    case types.FETCH_NOTES_SUCCEEDED:
      return {
        ...state,
        notes_loading: false,
        fetch_notes_succeeded: true,
        notes_info: payload,
        show_notes_flyout: true,
      };

    case types.FETCH_NOTES_FAILED:
      return {
        ...state,
        notes_loading: false,
        fetch_notes_succeeded: null,
        fetch_notes_error: true,
        show_notes_flyout: false,
      };

    case types.CLOSE_NOTES_FLYOUT:
      return {
        ...state,
        show_notes_flyout: false,
      };

    case types.SET_CURRENT_NOTES:
      return {
        ...state,
        notes_output: {
          ...state.notes_output,
          is_primary_step_set: true,
          note1: payload,
          save_notes_succeeded: true,
        },
      };

    case types.SET_PREVIOUS_NOTES:
      return {
        ...state,
        notes_output: {
          ...state.notes_output,
          note2: state.notes_output.note1,
          is_secondary_step_set: true,
          save_notes_succeeded: true,
        },
      };

    case types.OPEN_FLYOUT_PRIMARY:
      return {
        ...state,
        notes_output: {
          ...state.notes_output,
          is_primary_flyout_open: true,
        },
      };

    case types.CLOSE_FLYOUT_PRIMARY:
      return {
        ...state,
        notes_output: {
          ...state.notes_output,
          is_primary_flyout_open: false,
          note1: undefined,
          is_primary_step_set: false,
        },
      };

    case types.OPEN_FLYOUT_SECONDARY:
      return {
        ...state,
        notes_output: {
          ...state.notes_output,
          is_secondary_flyout_open: true,
        },
      };

    case types.CLOSE_FLYOUT_SECONDARY:
      return {
        ...state,
        notes_output: {
          ...state.notes_output,
          is_secondary_flyout_open: false,
          note2: undefined,
          is_secondary_step_set: false,
        },
      };

    case types.SAVE_NOTES_REQUESTED:
      return {
        ...state,
        save_notes_loading: true,
        save_notes_error: null,
        save_notes_succeeded: null,
      };

    case types.SAVE_NOTES_SUCCEEDED:
      return {
        ...state,
        save_notes_loading: false,
        save_notes_succeeded: true,
      };

    case types.SAVE_NOTES_FAILED:
      return {
        ...state,
        save_notes_loading: false,
        save_notes_succeeded: null,
        save_notes_error: true,
      };

    default:
      return state;
  }
};

export default stepNotesReducer;
