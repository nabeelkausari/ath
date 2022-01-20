import { combineReducers } from 'redux';
import concatenateReducers from 'redux-concatenate-reducers';

import { CLEAR_SOLVE } from '../types';
import compareStepsReducer from './compareSteps/reducer';
import outputReducer from './output/reducer';
// import stepNotesReducer from './stepNotes/reducer';
import * as types from './types';

const initialState = {
  list: [],
  steps_requested: true,
  steps_succeeded: null,
  steps_failed: null,

  reference_steps: [],
  expert_step_mapping: [],

  fetch_reference_steps_loading: null,
  fetch_reference_steps_succeeded: null,
  fetch_reference_steps_error: null,

  flyout: {
    primary: {
      step: {
        isAccordionOpen: false,
        comments: {
          discussion: [],
        },
      },
      code: {
        ath_code: {},
        python_code: {},
        r_code: {},

        fetch_ath_code_loading: null,
        fetch_ath_code_succeeded: null,
        fetch_ath_code_error: null,

        fetch_python_code_loading: null,
        fetch_python_code_succeeded: null,
        fetch_python_code_error: null,

        fetch_r_code_loading: null,
        fetch_r_code_succeeded: null,
        fetch_r_code_error: null,
      },
      notes: {
        fetch_notes_loading: null,
        fetch_notes_succeeded: null,
        fetch_notes_failed: null,
        note: {},
      },
      csv_info: {
        fetch_step_dataset_csv_requested: null,
        fetch_step_dataset_csv_succeeded: null,
        fetch_step_dataset_csv_failed: null,
      },
      is_open: false,
      is_full_screen: false,
      is_step_set: false,
      current_view: 0,
    },

    secondary: {
      step: {
        isAccordionOpen: false,
        comments: {
          discussion: [],
        },
      },
      code: {
        ath_code: {},
        python_code: {},
        r_code: {},

        fetch_ath_code_loading: null,
        fetch_ath_code_succeeded: null,
        fetch_ath_code_error: null,

        fetch_python_code_loading: null,
        fetch_python_code_succeeded: null,
        fetch_python_code_error: null,

        fetch_r_code_loading: null,
        fetch_r_code_succeeded: null,
        fetch_r_code_error: null,
      },
      notes: {
        fetch_notes_loading: null,
        fetch_notes_succeeded: null,
        fetch_notes_failed: null,
        note: {},
      },
      csv_info: {},
      is_open: false,
      is_full_screen: false,
      is_step_set: false,
      current_view: 0,
    },
  },

  step_detail_flyout: {
    is_open: false,
    is_full_screen: false,
    type: null,
  },
  step_detail_flyout_secondary: {
    is_open: false,
    is_full_screen: false,
    type: null,
  },

  undo_requested: null,
  undo_succeeded: null,
  undo_error: null,

  new_reply_post_requested: null,
  new_reply_post_succeeded: null,
  new_reply_post_failed: null,

  new_comment_post_requested: null,
  new_comment_post_succeeded: null,
  new_comment_post_failed: null,

  comment_delete_requested: null,
  comment_delete_succeeded: null,
  comment_delete_failed: null,

  reply_delete_requested: null,
  reply_delete_succeeded: null,
  reply_delete_failed: null,

  kill_execution_ongoing: null,
  killed_step_id: null,
};

const stepDetailsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_STEPS:
      return {
        ...state,
        steps_requested: true,
        steps_succeeded: null,
        fetch_steps_error: null,
      };
    case types.GET_STEPS_SUCCESS:
      return {
        ...state,
        steps_requested: false,
        steps_succeeded: true,
        list: payload,
      };
    case types.GET_STEPS_ERROR:
      return {
        ...state,
        steps_requested: false,
        steps_failed: true,
      };

    case types.FETCH_EXPERT_STEPS_REQUESTED:
      return {
        ...state,
        fetch_reference_steps_loading: true,
        fetch_reference_steps_succeeded: null,
        fetch_reference_steps_error: null,
      };
    case types.FETCH_EXPERT_STEPS_SUCCEEDED:
      return {
        ...state,
        fetch_reference_steps_loading: false,
        fetch_reference_steps_succeeded: true,
        fetch_reference_steps_error: false,
        reference_steps: payload,
      };
    case types.FETCH_EXPERT_STEPS_FAILED:
      return {
        ...state,
        fetch_reference_steps_loading: false,
        fetch_reference_steps_succeeded: false,
        fetch_reference_steps_error: payload,
      };
    case types.SET_CURRENT_STEP:
      return {
        ...state,
        flyout: {
          ...state.flyout,
          current_case_id: payload.id,
          primary: {
            ...state.flyout.primary,
            step: {
              ...payload.step,
              comments: {
                discussion: [],
              },
            },
            is_step_set: true,
            is_open: true,
          },
        },
      };

    case types.SET_PREVIOUS_STEP:
      return {
        ...state,
        flyout: {
          ...state.flyout,
          secondary: {
            ...state.flyout.primary,
            is_step_set: true,
            is_open: true,
          },
          primary: {
            ...state.flyout.primary,
            current_view: 0,
          },
        },
      };

    case types.SET_SECONDARY_STEP_AS_PRIMARY:
      return {
        ...state,
        flyout: {
          ...state.flyout,
          primary: {
            ...state.flyout.secondary,
          },
        },
      };

    case types.OPEN_FLYOUT_PRIMARY:
      return {
        ...state,
        flyout: {
          ...state.flyout,
          primary: {
            ...state.flyout.primary,
            is_open: true,
          },
        },
      };

    case types.CLOSE_FLYOUT_PRIMARY:
      return {
        ...state,
        flyout: {
          ...state.flyout,
          primary: {
            ...state.flyout.primary,
            is_open: false,
            step: {},
            code: {},
            notes: {},
            current_view: 0,
          },
        },
      };

    case types.OPEN_FLYOUT_SECONDARY:
      return {
        ...state,
        flyout: {
          ...state.flyout,
          secondary: {
            ...state.flyout.secondary,
            is_open: true,
          },
        },
      };

    case types.CLOSE_FLYOUT_SECONDARY:
      return {
        ...state,
        flyout: {
          ...state.flyout,
          secondary: {
            ...state.flyout.secondary,
            is_open: false,
            step: {},
            code: {},
            notes: {},
            current_view: 0,
          },
        },
      };

    case types.SET_FLYOUT_FULLSCREEN:
      return {
        ...state,
        flyout: {
          ...state.flyout,
          primary: {
            ...state.flyout.primary,
            is_full_screen: true,
          },
        },
      };

    case types.CLOSE_FLYOUT_FULLSCREEN:
      return {
        ...state,
        flyout: {
          ...state.flyout,
          primary: {
            ...state.flyout.primary,
            is_full_screen: false,
          },
        },
      };

    case types.FETCH_USER_CODE_REQUESTED: {
      return {
        ...state,
        flyout: {
          ...state.flyout,
          [payload.flyout]: {
            ...state.flyout[payload.flyout],
            code: {
              ...state.flyout[payload.flyout].code,
              fetch_ath_code_loading: true,
              fetch_ath_code_succeeded: null,
              fetch_ath_code_error: null,
            },
          },
        },
      };
    }

    case types.FETCH_USER_CODE_SUCCEEDED: {
      return {
        ...state,
        flyout: {
          ...state.flyout,
          [payload.flyout]: {
            ...state.flyout[payload.flyout],
            code: {
              ...state.flyout[payload.flyout].code,
              fetch_ath_code_loading: false,
              fetch_ath_code_succeeded: true,
              fetch_ath_code_error: false,
              ath_code: payload.result,
            },
          },
        },
      };
    }

    case types.FETCH_USER_CODE_FAILED: {
      return {
        ...state,
        flyout: {
          ...state.flyout,
          [payload.flyout]: {
            ...state.flyout[payload.flyout],
            code: {
              ...state.flyout[payload.flyout].code,
              fetch_ath_code_loading: false,
              fetch_ath_code_succeeded: false,
              fetch_ath_code_error: true,
              ath_code: {
                error: payload.error,
              },
            },
          },
        },
      };
    }

    case types.FETCH_USER_R_CODE_REQUESTED: {
      return {
        ...state,
        flyout: {
          ...state.flyout,
          [payload.flyout]: {
            ...state.flyout[payload.flyout],
            code: {
              ...state.flyout[payload.flyout].code,
              fetch_r_code_loading: true,
              fetch_r_code_succeeded: null,
              fetch_r_code_error: null,
            },
          },
        },
      };
    }

    case types.FETCH_USER_R_CODE_SUCCEEDED: {
      return {
        ...state,
        flyout: {
          ...state.flyout,
          [payload.flyout]: {
            ...state.flyout[payload.flyout],
            code: {
              ...state.flyout[payload.flyout].code,
              fetch_r_code_loading: false,
              fetch_r_code_succeeded: true,
              fetch_r_code_error: false,
              r_code: payload.result,
            },
          },
        },
      };
    }

    case types.FETCH_USER_R_CODE_FAILED: {
      return {
        ...state,
        flyout: {
          ...state.flyout,
          [payload.flyout]: {
            ...state.flyout[payload.flyout],
            code: {
              ...state.flyout[payload.flyout].code,
              fetch_r_code_loading: false,
              fetch_r_code_succeeded: false,
              fetch_r_code_error: true,
              r_code: {
                error: payload.error,
              },
            },
          },
        },
      };
    }

    case types.FETCH_USER_PYTHON_CODE_REQUESTED: {
      return {
        ...state,
        flyout: {
          ...state.flyout,
          [payload.flyout]: {
            ...state.flyout[payload.flyout],
            code: {
              ...state.flyout[payload.flyout].code,
              fetch_python_code_loading: true,
              fetch_python_code_succeeded: null,
              fetch_python_code_error: null,
            },
          },
        },
      };
    }

    case types.FETCH_USER_PYTHON_CODE_SUCCEEDED: {
      return {
        ...state,
        flyout: {
          ...state.flyout,
          [payload.flyout]: {
            ...state.flyout[payload.flyout],
            code: {
              ...state.flyout[payload.flyout].code,
              fetch_python_code_loading: false,
              fetch_python_code_succeeded: true,
              fetch_python_code_error: false,
              python_code: payload.result,
            },
          },
        },
      };
    }

    case types.FETCH_USER_PYTHON_CODE_FAILED: {
      return {
        ...state,
        flyout: {
          ...state.flyout,
          [payload.flyout]: {
            ...state.flyout[payload.flyout],
            code: {
              ...state.flyout[payload.flyout].code,
              fetch_python_code_loading: false,
              fetch_python_code_succeeded: false,
              fetch_python_code_error: true,
              python_code: {
                error: payload.error,
              },
            },
          },
        },
      };
    }

    case types.SET_CURRENT_FLYOUT_TAB: {
      return {
        ...state,
        flyout: {
          ...state.flyout,
          [payload.index]: {
            ...state.flyout[payload.index],
            current_view: payload.view,
          },
        },
      };
    }

    case types.FETCH_NOTES_REQUESTED: {
      return {
        ...state,
        flyout: {
          ...state.flyout,
          [payload.index]: {
            ...state.flyout[payload.index],
            notes: {
              ...state.flyout[payload.index].notes,
              fetch_notes_loading: true,
              fetch_notes_succeeded: null,
              fetch_notes_error: null,
            },
          },
        },
      };
    }

    case types.FETCH_NOTES_SUCCEEDED: {
      return {
        ...state,
        flyout: {
          ...state.flyout,
          [payload.index]: {
            ...state.flyout[payload.index],
            notes: {
              ...state.flyout[payload.index].notes,
              fetch_notes_loading: false,
              fetch_notes_succeeded: true,
              fetch_notes_error: false,
              note: payload,
            },
          },
        },
      };
    }

    case types.FETCH_NOTES_FAILED: {
      return {
        ...state,
        flyout: {
          ...state.flyout,
          [payload.index]: {
            ...state.flyout[payload.index],
            notes: {
              ...state.flyout[payload.index].notes,
              fetch_notes_loading: false,
              fetch_notes_succeeded: false,
              fetch_notes_error: true,
            },
          },
        },
      };
    }
    //
    // cases types.SET_CURRENT_FLYOUT_TAB: {
    //   return {
    //     ...state,
    //     current_flyout_tab : payload
    //   }
    // }

    case types.UNDO_REQUESTED: {
      return {
        ...state,
        undo_requested: true,
        undo_succeeded: null,
        undo_error: null,
      };
    }

    case types.UNDO_SUCCEEDED: {
      return {
        ...state,
        undo_requested: false,
        undo_succeeded: true,
        undo_error: false,
        list: [
          ...state.list.slice(0, state.list.length - 2),
          ...payload.slice(payload.length - 1),
        ],
      };
    }

    case types.UNDO_FAILED: {
      return {
        ...state,
        undo_requested: false,
        undo_succeeded: false,
        undo_error: true,
        error_message: payload,
      };
    }

    case types.REDO_REQUESTED: {
      return {
        ...state,
        redo_requested: true,
        redo_success: null,
        redo_error: null,
      };
    }

    case types.REDO_SUCCEEDED: {
      return {
        ...state,
        redo_requested: false,
        redo_success: true,
        redo_error: false,
        list: [
          ...state.list.slice(0, state.list.length - 1),
          ...payload.slice(payload.length - 2),
        ],
      };
    }

    case types.REDO_FAILED: {
      return {
        ...state,
        redo_requested: false,
        redo_success: false,
        redo_error: true,
        error_message: payload,
      };
    }

    case types.RESET_REQUESTED: {
      return {
        ...state,
        reset_requested: true,
        reset_error: false,
        reset_succeeded: null,
      };
    }

    case types.RESET_SUCCEEDED: {
      return {
        ...state,
        reset_requested: false,
        reset_error: false,
        reset_succeeded: true,
      };
    }

    case types.RESET_FAILED: {
      return {
        ...state,
        reset_requested: false,
        reset_error: true,
        reset_succeeded: false,
        error_message: payload,
      };
    }

    case types.ROLLBACK_REQUESTED: {
      return {
        ...state,
        rollback_requested: true,
        rollback_error: false,
        rollback_succeeded: null,
      };
    }

    case types.ROLLBACK_SUCCEEDED: {
      return {
        ...state,
        rollback_requested: false,
        rollback_error: false,
        rollback_succeeded: true,
      };
    }

    case types.ROLLBACK_FAILED: {
      return {
        ...state,
        rollback_requested: false,
        rollback_error: true,
        rollback_succeeded: false,
        error_message: payload,
      };
    }

    case types.FETCH_COMMENTS_REQUESTED:
      return {
        ...state,
        fetch_comments_loading: true,
        fetch_comments_succeeded: false,
        fetch_comments_failed: false,
      };

    case types.FETCH_COMMENTS_SUCCEEDED:
      return {
        ...state,
        fetch_comments_loading: false,
        fetch_comments_succeeded: true,
        fetch_comments_failed: false,
        flyout: {
          ...state.flyout,
          [payload.flyout_index]: {
            ...state.flyout[payload.flyout_index],
            step: {
              ...state.flyout[payload.flyout_index].step,
              comments: payload.comments,
            },
          },
        },
      };

    case types.FETCH_COMMENTS_FAILED:
      return {
        ...state,
        fetch_comments_loading: false,
        fetch_comments_succeeded: false,
        fetch_comments_failed: true,
      };

    case types.NEW_COMMENT_POST_REQUESTED:
      return {
        ...state,
        new_comment_post_requested: true,
        new_comment_post_succeeded: null,
        new_comment_post_failed: null,
      };

    case types.NEW_COMMENT_POST_SUCCEEDED:
      return {
        ...state,
        new_comment_post_requested: false,
        new_comment_post_succeeded: true,
        new_comment_post_failed: false,
        flyout: {
          ...state.flyout,
          [payload.flyout_index]: {
            ...state.flyout[payload.flyout_index],
            step: {
              ...state.flyout[payload.flyout_index].step,
              comments: {
                ...state.flyout[payload.flyout_index].step.comments,
                discussion: [
                  ...state.flyout[payload.flyout_index].step.comments
                    .discussion,
                  payload.discussion,
                ],
              },
            },
          },
        },
      };

    case types.NEW_COMMENT_POST_FAILED:
      return {
        ...state,
        new_comment_post_requested: false,
        new_comment_post_succeeded: false,
        new_comment_post_failed: true,
      };

    case types.NEW_REPLY_POST_REQUESTED:
      return {
        ...state,
        new_reply_post_requested: true,
        new_reply_post_succeeded: null,
        new_reply_post_failed: null,
      };

    case types.NEW_REPLY_POST_SUCCEEDED:
      return {
        ...state,
        new_reply_post_requested: false,
        new_reply_post_succeeded: true,
        new_reply_post_failed: false,
        flyout: {
          ...state.flyout,
          [payload.flyout_index]: {
            ...state.flyout[payload.flyout_index],
            step: {
              ...state.flyout[payload.flyout_index].step,
              comments: {
                ...state.flyout[payload.flyout_index].step.comments,
                discussion: [
                  ...state.flyout[
                    payload.flyout_index
                  ].step.comments.discussion.slice(0, payload.discussion_index),
                  payload.discussion,
                  ...state.flyout[
                    payload.flyout_index
                  ].step.comments.discussion.slice(
                    payload.discussion_index + 1
                  ),
                ],
              },
            },
          },
        },
      };

    case types.NEW_REPLY_POST_FAILED:
      return {
        ...state,
        new_reply_post_requested: false,
        new_reply_post_succeeded: false,
        new_reply_post_failed: true,
      };

    case types.REPLY_DELETE_REQUESTED:
      return {
        ...state,
        reply_delete_requested: true,
        reply_delete_succeeded: null,
        reply_delete_failed: null,
      };

    case types.REPLY_DELETE_SUCCEEDED:
      return {
        ...state,
        reply_delete_requested: false,
        reply_delete_succeeded: true,
        reply_delete_failed: false,
        flyout: {
          ...state.flyout,
          [payload.flyout_index]: {
            ...state.flyout[payload.flyout_index],
            step: {
              ...state.flyout[payload.flyout_index].step,
              comments: {
                ...state.flyout[payload.flyout_index].step.comments,
                discussion: [
                  ...state.flyout[
                    payload.flyout_index
                  ].step.comments.discussion.slice(0, payload.discussion_index),
                  {
                    ...state.flyout[payload.flyout_index].step.comments
                      .discussion[payload.discussion_index],
                    comments: [
                      ...state.flyout[
                        payload.flyout_index
                      ].step.comments.discussion[
                        payload.discussion_index
                      ].comments.slice(0, payload.reply_index),
                      ...state.flyout[
                        payload.flyout_index
                      ].step.comments.discussion[
                        payload.discussion_index
                      ].comments.slice(payload.reply_index + 1),
                    ],
                  },
                  ...state.flyout[
                    payload.flyout_index
                  ].step.comments.discussion.slice(
                    payload.discussion_index + 1
                  ),
                ],
              },
            },
          },
        },
      };

    case types.REPLY_DELETE_FAILED:
      return {
        ...state,
        reply_delete_requested: false,
        reply_delete_succeeded: false,
        reply_delete_failed: true,
      };

    case types.COMMENT_DELETE_REQUESTED:
      return {
        ...state,
        comment_delete_requested: true,
        comment_delete_succeeded: null,
        comment_delete_failed: null,
      };

    case types.COMMENT_DELETE_SUCCEEDED:
      return {
        ...state,
        comment_delete_requested: false,
        comment_delete_succeeded: true,
        comment_delete_failed: false,
        flyout: {
          ...state.flyout,
          [payload.flyout_index]: {
            ...state.flyout[payload.flyout_index],
            step: {
              ...state.flyout[payload.flyout_index].step,
              comments: {
                ...state.flyout[payload.flyout_index].step.comments,
                discussion: [
                  ...state.flyout[
                    payload.flyout_index
                  ].step.comments.discussion.slice(0, payload.discussion_index),
                  ...state.flyout[
                    payload.flyout_index
                  ].step.comments.discussion.slice(
                    payload.discussion_index + 1
                  ),
                ],
              },
            },
          },
        },
      };

    case types.COMMENT_DELETE_FAILED:
      return {
        ...state,
        comment_delete_requested: false,
        comment_delete_succeeded: false,
        comment_delete_failed: true,
      };

    case types.TOGGLE_OUTPUT_ACCORDION:
      return {
        ...state,
        flyout: {
          ...state.flyout,
          [payload.flyout_index]: {
            ...state.flyout[payload.flyout_index],
            step: {
              ...state.flyout[payload.flyout_index].step,
              isAccordionOpen:
                !state.flyout[payload.flyout_index].step.isAccordionOpen,
            },
          },
        },
      };

    case types.PREVIOUS_STEP_REQUESTED:
      return {
        ...state,
        previous_step_loading: true,
        previous_step_failed: null,
        previous_step_succeeded: null,
      };

    case types.PREVIOUS_STEP_SUCCEEDED:
      let index_of_previous_step = 0;
      state.list.forEach((item, index) => {
        if (item.id === payload.previous.id) index_of_previous_step = index;
      });
      let previous_step = {
        ...payload.previous,
        index_number: index_of_previous_step,
      };

      let list = [
        ...state.list.slice(0, index_of_previous_step),
        previous_step,
        ...state.list.slice(index_of_previous_step + 1, state.list.length - 1),
      ];

      let current_step = {
        ...payload.current,
        index_number: list.length,
      };

      list = [...list, current_step];

      return {
        ...state,
        previous_step_loading: false,
        previous_step_failed: null,
        previous_step_succeeded: true,
        list: list,
        initial_execution_status: '',
      };

    case types.PREVIOUS_STEP_FAILED:
      return {
        ...state,
        previous_step_loading: false,
        previous_step_succeeded: false,
        previous_step_failed: payload,
      };

    case types.INITIAL_EXECUTION_CHECK_REQUESTED:
      return {
        ...state,
        initial_execution_check_loading: true,
        initial_execution_check_failed: null,
        initial_execution_check_succeeded: null,
        initial_execution_status: 'CHECKING',
        // initial_execution_check_count: state.initial_execution_check_count + 1
      };

    case types.INITIAL_EXECUTION_CHECK_SUCCEEDED:
      return {
        ...state,
        initial_execution_check_loading: false,
        initial_execution_check_failed: null,
        initial_execution_check_succeeded: true,
        initial_execution_status: payload.status,
        initial_executed_step: payload,
        list: [...state.list, payload],
        // initial_execution_check_count: payload.status === "COMPLETED" ? 0 : state.initial_execution_check_count
      };

    case types.INITIAL_EXECUTION_CHECK_FAILED:
      return {
        ...state,
        initial_execution_check_loading: false,
        initial_execution_check_succeeded: false,
        initial_execution_check_failed: payload,
        initial_execution_status: 'FAILED',
      };

    case types.STEP_EXECUTION_CHECK_REQUESTED:
      return {
        ...state,
        step_execution_check_loading: true,
        step_execution_check_failed: null,
        step_execution_check_succeeded: null,
      };

    case types.STEP_EXECUTION_CHECK_SUCCEEDED:
      let step_index = state.list.findIndex((s) => s.id === payload.id);
      return {
        ...state,
        step_execution_check_loading: false,
        step_execution_check_failed: null,
        step_execution_check_succeeded: true,
        list: [
          ...state.list.slice(0, step_index),
          payload,
          ...state.list.slice(step_index + 1),
        ],
      };

    case types.STEP_EXECUTION_CHECK_FAILED:
      return {
        ...state,
        step_execution_check_loading: false,
        step_execution_check_succeeded: false,
        step_execution_check_failed: payload,
      };

    case types.SHOW_STEP_DETAILS:
      if (
        state.step_detail_flyout.is_open &&
        state.step_detail_flyout.type !== payload
      ) {
        return {
          ...state,
          step_detail_flyout_secondary: {
            ...state.step_detail_flyout_secondary,
            is_open: true,
            type: payload,
          },
        };
      }
      return {
        ...state,
        step_detail_flyout: {
          ...state.step_detail_flyout,
          is_open: true,
          type: payload,
        },
      };
    case types.HIDE_STEP_DETAILS:
      if (payload.is_secondary) {
        return {
          ...state,
          step_detail_flyout_secondary: {
            ...state.step_detail_flyout_secondary,
            is_open: false,
            is_full_screen: false,
            type: null,
          },
        };
      } else {
        if (state.step_detail_flyout_secondary.is_open) {
          return {
            ...state,
            step_detail_flyout: {
              ...state.step_detail_flyout,
              is_open: true,
              is_full_screen: false,
              type: state.step_detail_flyout_secondary.type,
            },
            step_detail_flyout_secondary: {
              ...state.step_detail_flyout_secondary,
              is_open: false,
              is_full_screen: false,
              type: null,
            },
          };
        }
        return {
          ...state,
          step_detail_flyout: {
            ...state.step_detail_flyout,
            is_open: false,
            is_full_screen: false,
            type: null,
          },
        };
      }
    case types.TOGGLE_FULL_SCREEN:
      if (payload.is_secondary) {
        return {
          ...state,
          step_detail_flyout_secondary: {
            ...state.step_detail_flyout_secondary,
            is_full_screen: !state.step_detail_flyout_secondary.is_full_screen,
          },
        };
      }
      return {
        ...state,
        step_detail_flyout: {
          ...state.step_detail_flyout,
          is_full_screen: !state.step_detail_flyout.is_full_screen,
        },
      };
    case types.ADD_EXPERT_STEP_MAPPING:
      return {
        ...state,
        expert_step_mapping: (state.expert_step_mapping || [])
          .filter((esm) => esm.step_reference !== payload.step_reference)
          .concat(payload),
      };
    case types.UPDATE_EXPERT_STEP_MAPPING_MILESTONE:
      return {
        ...state,
        expert_step_mapping: (state.expert_step_mapping || []).map((esm) => {
          if (esm.step_reference === payload.step_reference) {
            esm.milestone = payload.milestone;
          }
          return esm;
        }),
      };

    case types.FETCH_FUNCTION_DESC_REQUESTED:
      return {
        ...state,
        fetch_function_desc_requested: true,
        fetch_function_desc_succeeded: false,
        fetch_function_desc_failed: false,
      };

    case types.FETCH_FUNCTION_DESC_SUCCEEDED:
      return {
        ...state,
        flyout: {
          ...state.flyout,
          [payload.flyout_index]: {
            ...state.flyout[payload.flyout_index],
            step: {
              ...state.flyout[payload.flyout_index].step,
              function_description: payload.desc,
            },
          },
        },
        fetch_function_desc_requested: false,
        fetch_function_desc_succeeded: true,
        fetch_function_desc_failed: false,
      };

    case types.FETCH_FUNCTION_DESC_FAILED:
      return {
        ...state,
        fetch_function_desc_requested: false,
        fetch_function_desc_succeeded: false,
        fetch_function_desc_failed: true,
      };

    case types.KILL_EXECUTION_REQUESTED: {
      return {
        ...state,
        kill_execution_ongoing: true,
        killed_step_id: null,
      };
    }

    case types.KILL_EXECUTION_SUCCEEDED: {
      return {
        ...state,
        kill_execution_ongoing: true,
        killed_step_id: payload,
      };
    }

    case types.EXECUTION_KILLED: {
      return {
        ...state,
        kill_execution_ongoing: false,
      };
    }

    case types.RESET_STEPS:
      return {
        ...initialState,
      };

    case CLEAR_SOLVE:
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
};

const stepsReducer = concatenateReducers([
  stepDetailsReducer,
  combineReducers({
    //   stepNotes: stepNotesReducer,
    compare: compareStepsReducer,
    output: outputReducer,
  }),
]);

export default stepsReducer;
