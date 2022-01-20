import { fetchLink, fetchLinkAs } from '../../utils/api/fetch';
import { notify } from '../../utils/helpers/notification';
import { getUserIdFromProfile } from '../../utils/helpers/storage';
import * as types from './types';

export const getRoomMessages = () => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/chat-management-service/chat_management/messages`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_MESSAGES_ROOM_MESSAGES });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.MESSAGES_ROOM_MESSAGES_SUCCESS,
        payload: payload,
      });
    })
    .catch((err) => {
      dispatch({ type: types.MESSAGES_ROOM_MESSAGES_ERROR });
      notify.error(err?.body?.message);
    });
};

export const getRooms = () => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/chat-management-service/chat_management/messages`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_MESSAGES_ROOMS });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.MESSAGES_ROOMS_SUCCESS,
        payload: payload,
      });
    })
    .catch((err) => {
      dispatch({ type: types.MESSAGES_ROOMS_ERROR });
      notify.error(err?.body?.message);
    });
};

export const createStarRoom =
  (course_id, data, callback) => (dispatch, getState) => {
    const user_id = getUserIdFromProfile();
    const link = {
      href: `/discussion/user/${user_id}/course/${course_id}/createDiscussion`,
      type: 'application/json',
      method: 'POST',
    };

    return fetchLink(link, data)
      .then((payload) => {
        callback();
        dispatch({
          type: types.CREATE_DISCUSSION_SUCCESS,
          payload: payload,
        });
        dispatch(getCourseDiscussions(course_id));
      })
      .catch((err) => {
        notify.error(err?.body?.message);
      });
  };

export const setDashboardDiscussionFilter = (data) => (dispatch, getState) => {
  dispatch({ type: types.SET_DASHBOARD_DISCUSSION_FILTER, payload: data });
};
