import { fetchLink, fetchLinkAs } from '../../../utils/api/fetch';
import { notify } from '../../../utils/helpers/notification';
import {
  getCookie,
  removeCookie,
  setCookie,
} from '../../../utils/helpers/storage';
// import { fetchLink, fetchLinkAs } from '../../../../../../common/api/helpers';
// import { ACTIVE_QUIZ_ID } from '../../../../../../common/utils/constants';
// import { notify } from '../../../../../../common/utils/notification';
// import {
//   getLocalStorage,
//   removeLoacalStorage,
//   setLocalStorage,
// } from '../../../../../../common/utils/storage';
// import { updateAsCourseStarted } from '../../../redux/actions';
import { updateQuizCompleteion } from '../actions';
import * as types from './types';

export const ACTIVE_QUIZ_ID = 'ACTIVE_QUIZ_ID';

export const getQuizInstructions = (link, quiz_id) => (dispatch, getState) => {
  const { instructions_by_id } = getState().courses.quiz;
  if (instructions_by_id[quiz_id]) return;
  dispatch({ type: types.GET_QUIZ_INSTRUCTIONS });
  fetchLinkAs({ ...link, accept: 'application/json' })
    .then((quiz_details) => {
      dispatch({
        type: types.GET_QUIZ_INSTRUCTIONS_SUCCESS,
        payload: {
          instructions: { [quiz_id]: quiz_details },
          name: quiz_details.name,
        },
      });
    })

    .catch((error) => {
      dispatch({
        type: types.GET_QUIZ_INSTRUCTIONS_ERROR,
        payload: { error, quiz_id },
      });
    });
};

export const checkForActiveQuiz = (link, quiz_id) => (dispatch, getState) => {
  dispatch({ type: types.GET_QUIZ_QUESTIONS });
  fetchLinkAs(link)
    .then((payload) => {
      if (payload.remaining_duration === 0) {
        dispatch(removeActiveQuiz());
        alert('quiz was over');
      } else {
        dispatch(setActiveQuiz({ active_quiz_id: quiz_id }));
        dispatch(timerStart(payload.remaining_duration));
        dispatch({ type: types.GET_QUIZ_QUESTIONS_SUCCESS, payload });
      }
    })

    .catch((error) => {
      dispatch({ type: types.GET_QUIZ_QUESTIONS_ERROR });
      console.log(error);
    });
};

export const setActiveQuiz = (quiz) => (dispatch) => {
  setCookie(ACTIVE_QUIZ_ID, quiz.active_quiz_id);
  dispatch({ type: types.SET_ACTIVE_QUIZ, payload: quiz });
  dispatch(setQuizOver(false));
};

export const setManualAttemptsUpdateRequired = () => ({
  type: types.SET_MANUAL_ATTEMPTS_UPDATE_REQUIRED,
});

export const getActiveQuiz = () => () => {
  return getCookie(ACTIVE_QUIZ_ID);
};

export const removeActiveQuiz = () => (dispatch, getState) => {
  dispatch({ type: types.REMOVE_ACTIVE_QUIZ });
  removeCookie(ACTIVE_QUIZ_ID);
  dispatch(setQuizOver(true));
};

export const getQuizQuestions = (link, quiz_id) => (dispatch, getState) => {
  dispatch({ type: types.GET_QUIZ_QUESTIONS });
  fetchLinkAs(link)
    .then((payload) => {
      dispatch({ type: types.GET_QUIZ_QUESTIONS_SUCCESS, payload });
    })

    .catch((error) => {
      dispatch({ type: types.GET_QUIZ_QUESTIONS_ERROR });
      notify.error('Failed to Load Questions', error.message);
      dispatch(removeActiveQuiz());
    });
};

export const getQuizResultById = (link, quiz_id) => (dispatch) => {
  dispatch({ type: types.GET_QUIZ_RESULT });
  fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.GET_QUIZ_RESULT_SUCCESS,
        payload: { ...payload, quiz_id },
      });
      dispatch({ type: types.SHOW_QUIZ_RESULT });
    })
    .catch((error) => {
      dispatch({ type: types.GET_QUIZ_RESULT_ERROR });
      console.log(error);
    });
};

export const getQuizResultsCb = (link, quiz_id, dispatch) => {
  dispatch({ type: types.GET_ALL_QUIZ_ATTEMPTS });
  fetchLinkAs(link)
    .then((results) => {
      dispatch({
        type: types.GET_ALL_QUIZ_ATTEMPTS_SUCCESS,
        payload: { [quiz_id]: results },
      });
      dispatch(fetchAttemptsDetails([...results.attempts].pop()));
    })
    .catch((error) => {
      dispatch({ type: types.GET_ALL_QUIZ_ATTEMPTS_ERROR });
      console.log(error);
      notify.error('Failed to fetch answers', error.message);
    });
};

export const getQuizResults = (link, quiz_id) => (dispatch, getState) => {
  getQuizResultsCb(link, quiz_id, dispatch);
};

export const lockAndGetQuizResults =
  (link, quiz_id, lock_link) => (dispatch) => {
    dispatch({ type: types.GET_ALL_QUIZ_ATTEMPTS });

    fetchLink(lock_link).then(() => getQuizResultsCb(link, quiz_id, dispatch));
  };

export const submitQuiz = (link, resLink, quiz_id) => (dispatch, getState) => {
  fetchLink(link, undefined)
    .then(() => {
      dispatch(getQuizResultById(resLink, quiz_id));
      dispatch(updateQuizAttempt());
      dispatch(removeActiveQuiz());
      dispatch(updateQuizCompleteion());
      notify.success('Your quiz has been submitted successfully');
      // if (!ltiHeaders) {
      //   dispatch(updateAsCourseStarted(course_code));
      // }
    })
    .catch((error) => console.log(error));
};

const updateQuizAttempt = () => (dispatch, getState) => {
  const {
    quiz: {
      active_quiz: { id },
    },
  } = getState().courses;
  dispatch({ type: types.UPDATE_QUIZ_ATTEMPT, payload: id });
};

export const lockQuiz = (link) => () => {
  fetchLink(link);
};

export const selectOptionInternal =
  (question_id, option_id, question_type) => (dispatch, getState) => {
    dispatch({
      type: types.SET_ANSWER_TO_QUESTION,
      payload: { question_id, option_id, question_type },
    });
  };

export const resetQuiz = () => (dispatch) => {
  dispatch(removeActiveQuiz());
  dispatch(hideQuizAnswers());
  dispatch(setQuizOver(false));
  dispatch({ type: types.RESET_ACTIVE_QUIZ });
};

export const resetQuizInternal = () => (dispatch, getState) => {
  dispatch({ type: types.RESET_ACTIVE_QUIZ });
  dispatch(setQuizOver(false));
};

export const selectOptionForQuestion =
  (link, questionId) => (dispatch, getState) => {
    const {
      quiz: {
        active_quiz: { selected_quiz_options },
      },
    } = getState().courses;
    const body = {
      answerIds: selected_quiz_options[questionId],
    };
    fetchLink(link, body).catch((error) => {
      notify.error('Quiz Over', error);
    });
  };

let timer = null;

export const timerStart = (time_in_seconds) => (dispatch, getState) => {
  clearInterval(timer);
  timer = setInterval(() => dispatch(tick(time_in_seconds--)), 1000);
  dispatch({ type: types.QUIZ_TIMER_START, payload: time_in_seconds });
  dispatch(tick());
};

const tick = (remaining_time) => (dispatch, getState) => {
  dispatch({ type: types.QUIZ_TIMER_TICK, payload: remaining_time });
  if (!remaining_time) {
    dispatch(() => timerStop());
  }
};

export const timerStop = () => (dispatch, getState) => {
  clearInterval(timer);
  dispatch({ type: types.QUIZ_TIMER_STOP });
};

const showQuizAnswers = () => (dispatch, getState) => {
  dispatch({ type: types.SHOW_QUIZ_ANSWERS });
};

export const setQuizOver = (payload) => (dispatch, getState) => {
  dispatch({ type: types.SET_QUIZ_OVER, payload });
};
export const hideQuizAnswers = () => (dispatch, getState) => {
  dispatch({ type: types.HIDE_QUIZ_ANSWERS });
};

export const fetchAttemptsDetails = (attempt) => (dispatch, getState) => {
  const {
    quiz: { attempt_details_by_uri },
  } = getState().courses;
  dispatch({ type: types.SET_ATTEMPT_REFERENCE, payload: attempt.href });
  if (attempt_details_by_uri[attempt.href]) return;

  dispatch({ type: types.GET_ATTEMPT_DETAILS });
  fetchLink(attempt)
    .then((res) => res.json())
    .then((payload) => {
      dispatch({
        type: types.GET_ATTEMPT_DETAILS_SUCCESS,
        payload: { attempts: { [attempt.href]: payload }, quiz_id: payload.id },
      });
    })
    .catch((error) => {
      dispatch({ type: types.GET_ATTEMPT_DETAILS_ERROR });
      notify.error('Failed to load answers of the quiz', error.message);
    });
};
