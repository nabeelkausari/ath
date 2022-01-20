import { fetchLink, fetchLinkAs } from '../../utils/api/fetch';
import { notify } from '../../utils/helpers/notification';
import * as types from './types';

export const getMyOrganizationTracks = () => (dispatch) => {
  const tracks_link = {
    href: '/track/all',
    type: 'application/json',
  };
  dispatch({ type: types.MY_ORGANIZATION_TRACKS });
  fetchLinkAs(tracks_link)
    .then((payload) => {
      dispatch({
        type: types.MY_ORGANIZATION_TRACKS_SUCCESS,
        payload: payload.tracks,
      });
    })
    .catch((err) => {
      dispatch({ type: types.MY_ORGANIZATION_TRACKS_ERROR });
      notify.error(err?.body?.message);
    });
};

export const enrollTrack = (link, id) => (dispatch) => {
  dispatch({ type: types.ENROLL_TRACK });
  fetchLink(link)
    .then(() => {
      dispatch({
        type: types.ENROLL_TRACK_SUCCESS,
        payload: id,
      });
      notify.success('You have successfully enrolled to the track');
    })
    .catch((err) => {
      dispatch({ type: types.ENROLL_TRACK_ERROR });
      notify.error(err?.body?.message);
    });
};

export const unEnrollTrack = (link) => (dispatch) => {
  dispatch({ type: types.UN_ENROLL_TRACK });
  fetchLink(link)
    .then((payload) => {
      dispatch({
        type: types.UN_ENROLL_TRACK_SUCCESS,
        payload,
      });
      notify.success('You have successfully un enrolled from the track');
    })
    .catch((err) => {
      dispatch({ type: types.UN_ENROLL_TRACK_ERROR });
      notify.error(err?.body?.message);
    });
};

export const clearTrack = () => ({
  type: types.CLEAR_TRACK,
});

export const getTrack = (track_id) => (dispatch) => {
  const link = {
    href: `/track/${track_id}`,
    accept: 'application/json',
  };

  dispatch({ type: types.GET_TRACK });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({ type: types.GET_TRACK_SUCCESS, payload });
    })
    .catch((err) => {
      dispatch({ type: types.GET_TRACK_ERROR });
      notify.error(err?.body?.message);
    });
};

export const getTrackCourse = (course_id) => (dispatch) => {
  const link = {
    href: `/marketplace-courses/${course_id}`,
    accept: 'application/vnd.Analyttica.TreasureHunt.MarketplaceCourse+json',
  };

  dispatch({ type: types.GET_TRACK_COURSE });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({ type: types.GET_TRACK_COURSE_SUCCESS, payload });
    })
    .catch((err) => {
      dispatch({ type: types.GET_TRACK_COURSE_ERROR });
      notify.error(err?.body?.message);
    });
};

export const getTrackReviews = () => (dispatch, getState) => {
  const { track } = getState().tracks;
  dispatch({ type: types.GET_TRACK_REVIEWS });
  return fetchLinkAs(track?._links?.get_feedback)
    .then((payload) => {
      dispatch({ type: types.GET_TRACK_REVIEWS_SUCCESS, payload });
    })
    .catch((err) => {
      dispatch({ type: types.GET_TRACK_REVIEWS_ERROR });
      notify.error(err?.body?.message);
    });
};

export const updateTrackCourse = (course) => (dispatch) => {
  dispatch({ type: types.GET_TRACK_COURSE_SUCCESS, payload: course });
};
