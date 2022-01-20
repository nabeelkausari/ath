import _, { groupBy } from 'lodash';

import { fetchLink, fetchLinkAs } from '../../utils/api/fetch';
import { notify } from '../../utils/helpers/notification';
import { getUserIdFromProfile } from '../../utils/helpers/storage';
import * as types from './types';

export const getDashboardDiscussions = () => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/discussion/user/${user_id}`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_DASHBOARD_DISCUSSIONS });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.DASHBOARD_DISCUSSIONS_SUCCESS,
        payload: _(payload)
          .groupBy((item) => item.courseDetails.courseId)
          .map((value, key) => ({
            courseDetails: value[0].courseDetails,
            courses: value,
          }))
          .value(),
      });
    })
    .catch((err) => {
      dispatch({ type: types.DASHBOARD_DISCUSSIONS_ERROR });
      notify.error(err?.body?.message);
    });
};

export const getCourseDiscussions = (course_id) => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/discussion/user/${user_id}/course/${course_id}`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_COURSE_DISCUSSIONS });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.COURSE_DISCUSSIONS_SUCCESS,
        payload: payload,
      });
    })
    .catch((err) => {
      dispatch({ type: types.COURSE_DISCUSSIONS_ERROR });
      notify.error(err?.body?.message);
    });
};

export const getCourseStructure = (course_id) => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/course/${course_id}/structure`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_DISCUSSION_COURSE_STRUCTURE });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.DISCUSSION_COURSE_STRUCTURE_SUCCESS,
        payload: payload,
      });
    })
    .catch((err) => {
      dispatch({ type: types.DISCUSSION_COURSE_STRUCTURE_ERROR });
      notify.error(err?.body?.message);
    });
};
export const getCommentsByPostId = (post_id) => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/discussion/user/${user_id}/post/${post_id}/comments`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_DISCUSSION_COMMENTS, payload: post_id });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.DISCUSSION_COMMENTS_SUCCESS,
        payload: { id: post_id, data: payload.comments },
      });
    })
    .catch((err) => {
      dispatch({ type: types.DISCUSSION_COMMENTS_ERROR, payload: post_id });
      notify.error(err?.body?.message);
    });
};

export const createDiscussion =
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

export const createComment = (post_id, body) => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/discussion/user/${user_id}/post/${post_id}/comment`,
    type: 'application/json',
    method: 'POST',
  };

  return fetchLink(link, body)
    .then((payload) => {
      dispatch({
        type: types.CREATE_DISCUSSION_COMMENT_SUCCESS,
        payload: { post_id },
      });
      dispatch(getCommentsByPostId(post_id));
    })
    .catch((err) => {
      notify.error(err?.body?.message);
    });
};

export const discussionPin = (post_id, status) => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const pinLink = {
    href: `/discussion/user/${user_id}/post/${post_id}/pin`,
    type: 'application/json',
    method: 'POST',
  };

  const unPinLink = {
    href: `/discussion/user/${user_id}/post/${post_id}/unPin`,
    type: 'application/json',
    method: 'PUT',
  };

  return fetchLink(status ? pinLink : unPinLink)
    .then((payload) => {
      dispatch({
        type: types.UPDATE_DISCUSSION_PIN,
        payload: { post_id, status },
      });
    })
    .catch((err) => {
      notify.error(err?.body?.message);
    });
};

export const createReply =
  (post_id, discussion_id, body) => (dispatch, getState) => {
    const user_id = getUserIdFromProfile();
    const link = {
      href: `/discussion/user/${user_id}/post/${post_id}/comment/discussion/${discussion_id}/reply`,
      type: 'application/json',
      method: 'POST',
    };

    return fetchLink(link, body)
      .then((payload) => {
        dispatch({
          type: types.CREATE_DISCUSSION_REPLY_SUCCESS,
          payload: payload,
        });
        dispatch(getCommentsByPostId(post_id));
      })
      .catch((err) => {
        notify.error(err?.body?.message);
      });
  };

export const setDiscussionFilter = (payload) => (dispatch) => {
  dispatch({ type: types.SET_DISCUSSION_FILTER, payload });
};

export const setDashboardDiscussionFilter = (data) => (dispatch, getState) => {
  dispatch({ type: types.SET_DASHBOARD_DISCUSSION_FILTER, payload: data });
};
