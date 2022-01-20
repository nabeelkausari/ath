import * as types from './types';

const initialState = {
  quiz_instructions_requested: null,
  quiz_instructions_succeeded: null,
  quiz_instructions_failed: null,
  quiz_instructions_error: null,

  quiz_questions_requested: null,
  quiz_questions_succeeded: null,
  quiz_questions_failed: null,

  instructions_by_id: {},

  show_quiz_answers: null,
  quiz_over: null,

  active_quiz: {
    name: null,
    selected_options: {},
    selected_quiz_options: [],
    show_quiz_result: null,
    id: null,
    active_quiz_id: null,
    minimized: false,
    lesson: {},
  },

  quiz_timer_active: false,
  quiz_timer_stopped: null,
  time_left: null,

  abstract_quiz_results: {},
  quiz_result_requested: null,
  quiz_result_succeeded: null,
  quiz_result_failed: null,

  attempts_by_quiz_id: {},
  quiz_attempts_requested: null,
  quiz_attempts_succeeded: null,
  quiz_attempts_failed: null,

  selected_attempt_reference: null,

  attempt_details_by_uri: {},
  attempt_details_requested: null,
  attempt_details_succeeded: null,
  attempt_details_failed: null,

  manual_attempts_update_required: false,
};

const quizReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_QUIZ_INSTRUCTIONS:
      return {
        ...state,
        quiz_instructions_requested: true,
        quiz_instructions_failed: null,
        quiz_instructions_error: null,
        quiz_instructions_succeeded: null,
      };
    case types.GET_QUIZ_INSTRUCTIONS_SUCCESS:
      return {
        ...state,
        quiz_instructions_requested: false,
        quiz_instructions_succeeded: true,
        quiz_instructions: payload,
        active_quiz: {
          ...state.active_quiz,
          name: payload.name,
        },
        instructions_by_id: {
          ...state.instructions_by_id,
          ...payload.instructions,
        },
      };
    case types.GET_QUIZ_INSTRUCTIONS_ERROR:
      return {
        ...state,
        quiz_instructions_requested: false,
        quiz_instructions_failed: true,
        quiz_instructions_error: payload,
      };

    case types.GET_QUIZ_QUESTIONS:
      return {
        ...state,
        quiz_questions_requested: true,
        quiz_questions_succeeded: null,
        quiz_questions_failed: null,
      };
    case types.GET_QUIZ_QUESTIONS_SUCCESS:
      const answered_questions = payload.questions.filter(
        (q) => q.status === 'ANSWERED'
      );
      const selected_options = {};
      if (answered_questions.length > 0) {
        answered_questions.forEach((q) => {
          selected_options[q.id] = q.options.find((o) => o.is_user_option).id;
        });
      }
      return {
        ...state,
        quiz_questions_requested: null,
        quiz_questions_succeeded: true,
        active_quiz: { ...state.active_quiz, ...payload, selected_options },
      };
    case types.GET_QUIZ_QUESTIONS_ERROR:
      return {
        ...state,
        quiz_questions_requested: null,
        quiz_questions_failed: true,
      };

    case types.GET_QUIZ_RESULT:
      return {
        ...state,
        quiz_result_requested: true,
        quiz_result_succeeded: null,
        quiz_result_failed: null,
      };
    case types.GET_QUIZ_RESULT_SUCCESS:
      return {
        ...state,
        quiz_result_requested: null,
        quiz_result_succeeded: true,
        abstract_quiz_results: payload,
      };
    case types.GET_QUIZ_RESULT_ERROR:
      return {
        ...state,
        quiz_result_requested: null,
        quiz_result_failed: true,
      };

    case types.GET_ALL_QUIZ_ATTEMPTS:
      return {
        ...state,
        quiz_attempts_requested: true,
        quiz_attempts_succeeded: null,
        quiz_attempts_failed: null,
      };
    case types.GET_ALL_QUIZ_ATTEMPTS_SUCCESS:
      return {
        ...state,
        quiz_attempts_requested: false,
        quiz_attempts_succeeded: true,
        attempts_by_quiz_id: { ...state.attempts_by_quiz_id, ...payload },
      };
    case types.GET_ALL_QUIZ_ATTEMPTS_ERROR:
      return {
        ...state,
        quiz_attempts_requested: false,
        quiz_attempts_failed: true,
      };

    case types.QUIZ_TIMER_START:
      return {
        ...state,
        quiz_timer_active: true,
        quiz_timer_stopped: null,
        time_left: payload,
      };

    case types.QUIZ_TIMER_TICK:
      return {
        ...state,
        time_left: payload,
      };

    case types.QUIZ_TIMER_STOP:
      return {
        ...state,
        quiz_timer_active: false,
        quiz_timer_stopped: true,
        time_left: null,
      };

    case types.SET_ACTIVE_QUIZ:
      return {
        ...state,
        active_quiz: {
          ...state.active_quiz,
          ...payload,
          // active_quiz_id: payload,
        },
      };

    case types.SET_MANUAL_ATTEMPTS_UPDATE_REQUIRED:
      return {
        ...state,
        manual_attempts_update_required: true,
      };

    case types.SHOW_QUIZ_RESULT:
      return {
        ...state,
        active_quiz: {
          ...state.active_quiz,
          show_quiz_result: true,
        },
      };

    case types.REMOVE_ACTIVE_QUIZ:
      return {
        ...state,
        active_quiz: {
          selected_options: {},
          selected_quiz_options: [],
          show_quiz_result: null,
        },
      };

    case types.SET_ANSWER_TO_QUESTION:
      let current_answered =
        state.active_quiz.selected_quiz_options[payload.question_id] || [];
      let index = current_answered.indexOf(payload.option_id);
      if (payload.question_type === 'SINGLE_SELECT') {
        current_answered = [payload.option_id];
      } else if (payload.question_type === 'MULTI_SELECT') {
        if (index > -1) {
          current_answered.splice(index, 1);
        } else {
          current_answered.push(payload.option_id);
        }
      }

      return {
        ...state,
        active_quiz: {
          ...state.active_quiz,
          selected_options: {
            ...state.active_quiz.selected_options,
            [payload.question_id]: payload.option_id,
          },
          selected_quiz_options: {
            ...state.active_quiz.selected_quiz_options,
            [payload.question_id]: current_answered,
          },
        },
      };

    case types.SHOW_QUIZ_ANSWERS:
      return {
        ...state,
        show_quiz_answers: true,
      };

    case types.HIDE_QUIZ_ANSWERS:
      return {
        ...state,
        show_quiz_answers: false,
      };

    case types.GET_ATTEMPT_DETAILS:
      return {
        ...state,
        attempt_details_requested: true,
        attempt_details_succeeded: null,
        attempt_details_failed: null,
      };

    case types.GET_ATTEMPT_DETAILS_SUCCESS:
      return {
        ...state,
        attempt_details_requested: false,
        attempt_details_succeeded: true,
        attempt_details_by_uri: {
          ...state.attempt_details_by_uri,
          ...payload.attempts,
        },
        instructions_by_id: {
          ...state.instructions_by_id,
          [payload.quiz_id]: {
            ...state.instructions_by_id[payload.quiz_id],
            remainingAttempts: 0,
          },
        },
      };

    case types.GET_ATTEMPT_DETAILS_ERROR:
      return {
        ...state,
        attempt_details_requested: false,
        attempt_details_failed: true,
      };

    case types.SET_QUIZ_OVER:
      return {
        ...state,
        quiz_over: payload,
      };

    case types.SET_ATTEMPT_REFERENCE:
      return {
        ...state,
        selected_attempt_reference: payload,
      };

    case types.RESET_ACTIVE_QUIZ:
      return {
        ...state,
        active_quiz: {
          selected_options: {},
          selected_quiz_options: [],
          show_quiz_result: null,
          id: null,
          active_quiz_id: null,
        },
      };

    case types.UPDATE_QUIZ_ATTEMPT:
      if (!state.manual_attempts_update_required) return state;
      return {
        ...state,
        instructions_by_id: {
          ...state.instructions_by_id,
          [payload]: {
            ...state.instructions_by_id[payload],
            remainingAttempts:
              state.instructions_by_id[payload].remainingAttempts - 1,
          },
        },
      };

    default:
      return state;
  }
};

export default quizReducer;
