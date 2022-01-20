import { fetchLink, fetchLinkAs } from '../../utils/api/fetch';
import { notify } from '../../utils/helpers/notification';
import { getUserIdFromProfile } from '../../utils/helpers/storage';
import * as types from './types';

export const getWhereYouLeft = () => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/content/dashboard/user/${user_id}/lastAccessContents`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_WHERE_YOU_LEFT });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({ type: types.WHERE_YOU_LEFT_SUCCESS, payload });
    })
    .catch((err) => {
      dispatch({ type: types.WHERE_YOU_LEFT_ERROR });
      notify.error(err?.body?.message);
    });
};

export const getDashboardProjects = () => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/user/${user_id}/case/createdAndShared/${3}`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_MY_PROJECTS });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({ type: types.MY_PROJECTS_SUCCESS, payload });
    })
    .catch((err) => {
      dispatch({ type: types.MY_PROJECTS_ERROR });
      notify.error(err?.body?.message);
    });
};
export const getDashboardAllNotes = () => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/content/dashboard/user/${user_id}/notes`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_DASHBOARD_ALL_NOTES });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({ type: types.DASHBOARD_ALL_NOTES_SUCCESS, payload });
    })
    .catch((err) => {
      dispatch({ type: types.DASHBOARD_ALL_NOTES_ERROR });
      notify.error(err?.body?.message);
    });
};

export const getDashboardAllLessons = () => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/users/${user_id}/getSavedLessons`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_DASHBOARD_ALL_LESSONS });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({ type: types.DASHBOARD_ALL_LESSONS_SUCCESS, payload });
    })
    .catch((err) => {
      dispatch({ type: types.DASHBOARD_ALL_LESSONS_ERROR });
      notify.error(err?.body?.message);
    });
};

export const getDashboardHomeNotes = () => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/content/dashboard/user/${user_id}/library/latestNote`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_DASHBOARD_HOME_NOTES });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.DASHBOARD_HOME_NOTES_SUCCESS,
        payload:
          (payload &&
            payload.notes && {
              ...payload.notes[0],
              resource_name: payload.resource_name,
            }) ||
          {},
      });
    })
    .catch((err) => {
      dispatch({ type: types.DASHBOARD_HOME_NOTES_ERROR });
      notify.error(err?.body?.message);
    });
};

export const getDashboardHomeLessons = () => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/users/${user_id}/getLatestSavedLesson`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_DASHBOARD_HOME_LESSONS });
  return fetchLinkAs(link)
    .then((payload) => {
      let obj = {};
      let type = Object.keys(payload.saved_lessons)[0];

      if (payload && payload.saved_lessons && type) {
        obj = payload.saved_lessons[type][0];
      }
      dispatch({
        type: types.DASHBOARD_HOME_LESSONS_SUCCESS,
        payload: {
          ...obj,
          resource_name: payload.resource_name,
          note_parent: type,
        },
      });
    })
    .catch((err) => {
      dispatch({ type: types.DASHBOARD_HOME_LESSONS_ERROR });
      notify.error(err?.body?.message);
    });
};

export const updateDashboardLessonFilter = (data) => (dispatch, getState) => {
  dispatch({ type: types.SET_DASHBOARD_LESSON_FILTER, payload: data });
};

export const updateDashboardNoteFilter = (data) => (dispatch, getState) => {
  dispatch({ type: types.SET_DASHBOARD_NOTE_FILTER, payload: data });
};

export const updateDashboardNote = (href, body) => (dispatch) => {
  if (body.noteBody == '' || !body.noteBody)
    return notify.error('note cannot be empty');
  return fetchLinkAs(href, body)
    .then((payload) => {
      dispatch(getNotesData());
    })
    .catch((err) => {
      notify.error(err?.body?.message);
    });
};

export const deleteDashboardNote = (href) => (dispatch) => {
  return fetchLink(href)
    .then((payload) => {
      dispatch(getNotesData());
    })
    .catch((err) => {
      notify.error(err?.body?.message);
    });
};

export const getNotesData = () => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/content/dashboard/user/${user_id}/notes`,
    accept: 'application/json',
  };

  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({ type: types.DASHBOARD_ALL_NOTES_SUCCESS, payload });
    })
    .catch((err) => {
      notify.error(err?.body?.message);
    });
};
