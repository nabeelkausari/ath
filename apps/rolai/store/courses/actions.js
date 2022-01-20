import { fetchLink, fetchLinkAs } from '../../utils/api/fetch';
import { notify } from '../../utils/helpers/notification';
import { getUserIdFromProfile, setCookie } from '../../utils/helpers/storage';
import { updateTrackCourse } from '../tracks/actions';
import * as types from './types';

export const getMyOrganizationCourses = () => (dispatch, getState) => {
  const { my_profile } = getState().auth;
  dispatch({ type: types.MY_ORGANIZATION_COURSES });
  return fetchLinkAs(my_profile?._links?.marketplace_courses)
    .then((payload) => {
      dispatch({ type: types.MY_ORGANIZATION_COURSES_SUCCESS, payload });
    })
    .catch((err) => {
      dispatch({ type: types.MY_ORGANIZATION_COURSES_ERROR });
      notify.error(err?.body?.message);
    });
};

export const clearCourse = () => ({
  type: types.CLEAR_COURSE,
});

export const getCourse =
  (course_id, loader = true) =>
  (dispatch) => {
    const link = {
      href: `/marketplace-courses/${course_id}`,
      accept: 'application/vnd.Analyttica.TreasureHunt.MarketplaceCourse+json',
    };
    if (loader) dispatch({ type: types.GET_COURSE });
    return fetchLinkAs(link)
      .then((payload) => {
        setCookie('COURSE_ID', payload?.course_id);
        dispatch({ type: types.GET_COURSE_SUCCESS, payload });
        dispatch(updateTrackCourse(payload));
      })
      .catch((err) => {
        dispatch({ type: types.GET_COURSE_ERROR });
        notify.error(err?.body?.message);
      });
  };

export const getUserCourse = (course_id) => (dispatch) => {
  const userId = getUserIdFromProfile();
  const course_link = {
    method: 'GET',
    href: `/users/${userId}/marketplace-courses/${course_id}`,
  };
  dispatch({ type: types.GET_COURSE });
  fetchLinkAs(course_link)
    .then((payload) => {
      setCookie('COURSE_ID', payload?.course_id);
      dispatch({ type: types.GET_COURSE_SUCCESS, payload });
      dispatch(updateTrackCourse(payload));
    })
    .catch((err) => {
      dispatch({ type: types.GET_COURSE_ERROR });
      notify.error(err?.body?.message);
    });
};

export const getCourseSyllabus =
  (loader = true) =>
  (dispatch, getState) => {
    const { course } = getState().courses;
    if (loader) dispatch({ type: types.GET_COURSE_SYLLABUS });
    return fetchLinkAs(
      course._links?.enroll
        ? course._links?.get_module_contents
        : course._links?.modules_contents_arranged
    )
      .then((payload) => {
        dispatch({ type: types.GET_COURSE_SYLLABUS_SUCCESS, payload });
      })
      .catch((err) => {
        dispatch({ type: types.GET_COURSE_SYLLABUS_ERROR });
        notify.error(err?.body?.message);
      });
  };

export const getCourseReviews = () => (dispatch, getState) => {
  const { course } = getState().courses;
  dispatch({ type: types.GET_COURSE_REVIEWS });
  return fetchLinkAs(course._links?.get_feedback)
    .then((payload) => {
      dispatch({ type: types.GET_COURSE_REVIEWS_SUCCESS, payload });
    })
    .catch((err) => {
      dispatch({ type: types.GET_COURSE_REVIEWS_ERROR });
      notify.error(err?.body?.message);
    });
};

export const toggleCourseNotesPopup = (status) => (dispatch, getState) => {
  const { course_notes_popup } = getState().courses;
  return dispatch({
    type: types.TOGGLE_COURSE_NOTES_POPUP,
    payload: status === undefined ? !course_notes_popup : status,
  });
};

export const enrollCourse = (link, id) => (dispatch, getState) => {
  const { my_profile } = getState().auth;
  dispatch({ type: types.ENROLL_COURSE });
  return fetchLink(link)
    .then(() => fetchLinkAs(my_profile?._links?.marketplace_courses))
    .then((payload) => {
      const updated_course = payload.find((course) => course.code === id);
      dispatch(getCourse(updated_course.course_id));
      dispatch({
        type: types.ENROLL_COURSE_SUCCESS,
        payload: updated_course,
      });
      notify.success('You have successfully enrolled to the course');
    })
    .catch((err) => {
      dispatch({ type: types.ENROLL_COURSE_ERROR });
      notify.error(err?.body?.message);
    });
};

export const startCourse = (link) => (dispatch, getState) => {
  return fetchLinkAs(link);
};

export const getCourseNotes = (course_id) => (dispatch) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/users/${user_id}/course/${course_id}/getUserNotes`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_COURSE_NOTES });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.GET_COURSE_NOTES_SUCCESS,
        payload,
      });
    })
    .catch((err) => {
      dispatch({ type: types.GET_COURSE_NOTES_ERROR });
      notify.error(err?.body?.message);
    });
};

export const updateCourseNotes = (course_id) => (dispatch) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/users/${user_id}/course/${course_id}/getUserNotes`,
    accept: 'application/json',
  };

  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.GET_COURSE_NOTES_SUCCESS,
        payload,
      });
    })
    .catch((err) => {
      notify.error(err?.body?.message);
    });
};

export const clearLessonNotes = () => (dispatch) => {
  dispatch({ type: types.CLEAR_LESSON_NOTES });
};

export const setCurrentLesson = (lesson, module_index) => (dispatch) => {
  setCookie('LESSON_ID', lesson?.content_reference);
  setCookie('LESSON_TYPE', lesson?.type);
  dispatch({
    type: types.SET_CURRENT_LESSON,
    payload: { ...lesson, module_index },
  });
};

export const updateMilestonesInCurrentLesson = (payload) => ({
  type: types.UPDATE_CURRENT_LESSON_MILESTONES,
  payload,
});

export const getLessonNotes = (course_id, seq_id) => (dispatch) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/users/${user_id}/course/${course_id}/moduleSequence/${seq_id}/getUserNotes`,
    accept: 'application/json',
  };

  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.GET_LESSON_NOTES_SUCCESS,
        payload,
      });
    })
    .catch((err) => {
      notify.error(err?.body?.message);
    });
};

export const updateLessonNote = (href, body) => (dispatch) => {
  if (body.noteBody == '' || !body.noteBody)
    return notify.error('note cannot be empty');
  return fetchLinkAs(href, body)
    .then((payload) => {
      dispatch({ type: types.UPDATE_LESSON_NOTES_SUCCESS, payload });
    })
    .catch((err) => {
      notify.error(err?.body?.message);
    });
};

export const deleteLessonNote = (href, note) => (dispatch) => {
  return fetchLink(href)
    .then((payload) => {
      dispatch({
        type: types.DELETE_LESSON_NOTES_SUCCESS,
        payload: note,
      });
    })
    .catch((err) => {
      notify.error(err?.body?.message);
    });
};

export const updateCourseNote =
  (href, body, callbackAfterUpdate) => (dispatch) => {
    return fetchLink(href, body)
      .then((payload) => {
        callbackAfterUpdate();
      })
      .catch((err) => {
        notify.error(err?.body?.message);
      });
  };

export const deleteCourseNote = (href, callbackAfterUpdate) => (dispatch) => {
  return fetchLink(href)
    .then((payload) => {
      callbackAfterUpdate();
    })
    .catch((err) => {
      notify.error(err?.body?.message);
    });
};

export const saveCourseNote = (course_id, body) => (dispatch) => {
  if (body.noteBody === '' || !body.noteBody)
    return notify.error('note cannot be empty');

  const user_id = getUserIdFromProfile();
  const link = {
    href: `/users/${user_id}/course/${course_id}/saveNote`,
    method: 'POST',
    type: 'application/json',
    accept: 'application/json',
  };

  return fetchLinkAs(link, body)
    .then((payload) => {
      dispatch({
        type: types.ADD_LESSON_NOTES_SUCCESS,
        payload,
      });
    })
    .catch((err) => {
      notify.error(err?.body?.message);
    });
};

export const getSavedLessons = (course_id) => (dispatch) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/users/${user_id}/course/${course_id}/getSavedLessons`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_COURSE_NOTES });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.SAVED_LESSONS_SUCCESS,
        payload: [].concat.apply(
          [],
          Object.values(payload).map((i, k) => i)
        ),
      });
    })
    .catch((err) => {
      dispatch({ type: types.SAVED_LESSONS_ERROR });
      notify.error(err?.body?.message);
    });
};

export const saveLesson = (course_id, seq_id) => (dispatch) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/users/${user_id}/course/${course_id}/moduleSequence/${seq_id}/saveLesson`,
    method: 'POST',
    type: 'application/json',
    accept: 'application/json',
  };

  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.SAVE_LESSON_SUCCESS,
        payload: payload,
      });
    })
    .catch((err) => {
      notify.error(err?.body?.message);
    });
};

export const undoSavedLesson = (lesson) => (dispatch) => {
  const user_id = getUserIdFromProfile();

  return fetchLink(lesson?._links?.undo_saved_lesson)
    .then((payload) => {
      dispatch({
        type: types.UNDOSAVED_LESSON_SUCCESS,
        payload: lesson.module_seq_id,
      });
    })
    .catch((err) => {
      notify.error(err?.body?.message);
    });
};

export const getCourseBookmarks = (course_id) => (dispatch) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/users/${user_id}/course/${course_id}/getSavedLessons`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_COURSE_BOOKMARKS });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.GET_COURSE_BOOKMARKS_SUCCESS,
        payload,
      });
    })
    .catch((err) => {
      dispatch({ type: types.GET_COURSE_BOOKMARKS_ERROR });
      notify.error(err?.body?.message);
    });
};

export const markModuleContentAsViewed = (link) => (dispatch, getState) => {
  const { current_lesson, course } = getState().courses;
  fetchLinkAs(link)
    .then((response) => {
      dispatch(getCourse(course?.course_id, false));
      dispatch(getCourseSyllabus(false));
      // dispatch({
      //   type: types.UPDATE_VIEW_COUNT,
      //   payload: {
      //     ...response,
      //     lesson_id: current_lesson.content_reference,
      //     module_index: current_lesson.module_index,
      //   },
      // });
      notify.success('Content marked as viewed');
    })
    .catch((error) => notify.error('Failed to mark as viewed', error.message));
};

export const updateQuizCompleteion = () => (dispatch, getState) => {
  const {
    current_lesson,
    course,
    quiz: {
      active_quiz: { id },
    },
  } = getState().courses;
  course?.course_id && dispatch(getCourse(course?.course_id, false));
  course?.course_id && dispatch(getCourseSyllabus(false));

  // dispatch({
  //   type: types.UPDATE_QUIZ_COMPLETION,
  //   payload: {
  //     id: id,
  //     l_id: current_lesson.content_reference,
  //     m_index: current_lesson.module_index,
  //   },
  // });
};

export const updateLastAccessLesson = (course_id, seq_id) => (dispatch) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/users/${user_id}/course/${course_id}/moduleSeq/${seq_id}/lastAccess`,
    method: 'PUT',
    type: 'application/json',
    accept: 'application/json',
  };

  return fetchLinkAs(link)
    .then((payload) => {
      // dispatch({
      //   type: types.UNDOSAVED_LESSON_SUCCESS,
      //   payload,
      // });
    })
    .catch((err) => {
      // notify.error(err?.body?.message);
    });
};

export const updateLastAccessTrack = (course_id) => (dispatch) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/user/${user_id}/track/resourceType/COURSE/resource/${course_id}/lastAccess`,
    method: 'PUT',
    type: 'application/json',
    accept: 'application/json',
  };

  return fetchLinkAs(link)
    .then((payload) => {
      // dispatch({
      //   type: types.UNDOSAVED_LESSON_SUCCESS,
      //   payload,
      // });
    })
    .catch((err) => {
      // notify.error(err?.body?.message);
    });
};
