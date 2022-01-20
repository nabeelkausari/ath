import { USER_LOGOUT } from '../auth/types';
import * as types from './types';

const initialState = {
  my_org_tracks_requested: null,
  my_org_tracks_succeeded: null,
  my_org_tracks_failed: null,
  my_org_tracks: [],
  enroll_track_requested: null,
  enroll_track_succeeded: null,
  enroll_track_failed: null,
  un_enroll_track_requested: null,
  un_enroll_track_succeeded: null,
  un_enroll_track_failed: null,
  track_requested: null,
  track_failed: null,
  track_succeeded: null,
  track: {},
  track_courses: {},
  track_course_requested: null,
  track_course_failed: null,
  track_course_succeeded: null,
  track_reviews_requested: null,
  track_reviews_failed: null,
  track_reviews_succeeded: null,
  track_reviews: null,
};

const tracksReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_TRACK_REVIEWS:
      return {
        ...state,
        track_reviews_requested: true,
        track_reviews_failed: null,
        track_reviews_succeeded: null,
      };
    case types.GET_TRACK_REVIEWS_SUCCESS:
      return {
        ...state,
        track_reviews_requested: false,
        track_reviews_succeeded: true,
        track_reviews: payload,
      };
    case types.GET_TRACK_REVIEWS_ERROR:
      return {
        ...state,
        track_reviews_requested: false,
        track_reviews_succeeded: false,
        track_reviews_failed: true,
      };
    case types.CLEAR_TRACK:
      return {
        ...state,
        track_requested: null,
        track_failed: null,
        track_succeeded: null,
        track: initialState.track,

        track_reviews_requested: null,
        track_reviews_failed: null,
        track_reviews_succeeded: null,
        track_reviews: initialState.track_reviews,

        track_course_requested: null,
        track_course_failed: null,
        track_course_succeeded: null,
        track_courses: initialState.track_courses,
      };
    case types.GET_TRACK:
      return {
        ...state,
        track_requested: true,
        track_failed: null,
        track_succeeded: null,
      };
    case types.GET_TRACK_SUCCESS:
      let arr = [];
      payload.resource_group.forEach((r) => {
        arr = [...arr, ...r.resources];
      });
      const track_courses = {};
      arr
        .filter((r) => r.resource_type === 'COURSE')
        .forEach((track) => (track_courses[track.ref_id] = track));
      return {
        ...state,
        track_requested: false,
        track_succeeded: true,
        track: payload,
        track_courses,
      };
    case types.GET_TRACK_ERROR:
      return {
        ...state,
        track_requested: false,
        track_succeeded: false,
        track_failed: true,
      };
    case types.GET_TRACK_COURSE:
      return {
        ...state,
        track_course_requested: true,
        track_course_failed: null,
        track_course_succeeded: null,
      };
    case types.GET_TRACK_COURSE_SUCCESS:
      return {
        ...state,
        track_course_requested: false,
        track_course_succeeded: true,
        track_courses: {
          ...state.track_courses,
          [payload.course_id]: {
            ...state.track_courses[payload.course_id],
            ...payload,
          },
        },
      };
    case types.GET_TRACK_COURSE_ERROR:
      return {
        ...state,
        track_course_requested: false,
        track_course_succeeded: false,
        track_course_failed: true,
      };
    case types.MY_ORGANIZATION_TRACKS:
      return {
        ...state,
        my_org_tracks_requested: true,
        my_org_tracks_failed: null,
        my_org_tracks_succeeded: null,
      };
    case types.MY_ORGANIZATION_TRACKS_SUCCESS:
      return {
        ...state,
        my_org_tracks_requested: false,
        my_org_tracks_succeeded: true,
        my_org_tracks: payload,
      };
    case types.MY_ORGANIZATION_TRACKS_ERROR:
      return {
        ...state,
        my_org_tracks_requested: false,
        my_org_tracks_succeeded: false,
        my_org_tracks_failed: true,
      };
    case types.ENROLL_TRACK:
      return {
        ...state,
        enroll_track_requested: true,
        enroll_track_failed: null,
        enroll_track_succeeded: null,
      };
    case types.ENROLL_TRACK_SUCCESS:
      return {
        ...state,
        enroll_track_requested: false,
        enroll_track_succeeded: true,
        my_org_tracks: state.my_org_tracks.map((track) => ({
          ...track,
          enrolled: track.track_id === payload ? true : track.enrolled,
        })),
        track:{
          ...state.track,
          enrolled:true,
        }
      };
    case types.ENROLL_TRACK_ERROR:
      return {
        ...state,
        enroll_track_requested: false,
        enroll_track_succeeded: false,
        enroll_track_failed: true,
      };
    case types.UN_ENROLL_TRACK:
      return {
        ...state,
        un_enroll_track_requested: true,
        un_enroll_track_failed: null,
        un_enroll_track_succeeded: null,
      };
    case types.UN_ENROLL_TRACK_SUCCESS:
      return {
        ...state,
        un_enroll_track_requested: false,
        un_enroll_track_succeeded: true,
        un_enroll_track: payload,
      };
    case types.UN_ENROLL_TRACK_ERROR:
      return {
        ...state,
        un_enroll_track_requested: false,
        un_enroll_track_succeeded: false,
        un_enroll_track_failed: true,
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

export default tracksReducer;
