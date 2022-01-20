import { USER_LOGOUT } from '../auth/types';
import * as types from './types';

const initialState = {
  course_discussions_requested: null,
  course_discussions_succeeded: null,
  course_discussions_failed: null,
  course_discussions: [],
  dashboard_discussions_requested: null,
  dashboard_discussions_succeeded: null,
  dashboard_discussions_failed: null,
  dashboard_discussions: [],
  course_structure_requested: null,
  course_structure_succeeded: null,
  course_structure_failed: null,
  course_structure: [],
  filterData: {},
  dashboard_filterData: {
    selected: 0,
  },
  comments_requested: null,
  comments_succeeded: null,
  comments_failed: null,
  comments: {},
};

const DiscussionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_DISCUSSION_FILTER:
      return { ...state, filterData: { ...state.filterData, ...payload } };
    case types.SET_DASHBOARD_DISCUSSION_FILTER:
      return {
        ...state,
        dashboard_filterData: { ...state.dashboard_filterData, ...payload },
      };
    case types.UPDATE_DISCUSSION_PIN:
      return {
        ...state,
        ...updateSubData(state, (item) => ({
          ...item,
          pinned: item.postId == payload.post_id ? payload.status : item.pinned,
        })),
      };
    case types.CREATE_DISCUSSION_COMMENT_SUCCESS:
      return {
        ...state,
        ...updateSubData(state, (item) => ({
          ...item,
          totalCommentsCount:
            item.postId == payload.post_id
              ? item.totalCommentsCount + 1
              : item.totalCommentsCount,
        })),
      };
    case types.GET_DISCUSSION_COMMENTS:
      return {
        ...state,
        comments_requested: payload,
        comments_failed: null,
        comments_succeeded: null,
      };

    case types.DISCUSSION_COMMENTS_SUCCESS:
      return {
        ...state,
        comments_requested: false,
        comments_succeeded: true,
        comments: { ...state.comments, [payload.id]: payload.data },
      };
    case types.DISCUSSION_COMMENTS_ERROR:
      return {
        ...state,
        comments_requested: false,
        comments_succeeded: false,
        comments_failed: true,
      };

    case types.GET_DISCUSSION_COURSE_STRUCTURE:
      return {
        ...state,
        course_structure_requested: true,
        course_structure_failed: null,
        course_structure_succeeded: null,
      };

    case types.DISCUSSION_COURSE_STRUCTURE_SUCCESS:
      return {
        ...state,
        course_structure_requested: false,
        course_structure_succeeded: true,
        course_structure: payload,
      };
    case types.DISCUSSION_COURSE_STRUCTURE_ERROR:
      return {
        ...state,
        course_structure_requested: false,
        course_structure_succeeded: false,
        course_structure_failed: true,
      };

    case types.GET_COURSE_DISCUSSIONS:
      return {
        ...state,
        course_discussions_requested: true,
        course_discussions_failed: null,
        course_discussions_succeeded: null,
      };

    case types.COURSE_DISCUSSIONS_SUCCESS:
      return {
        ...state,
        course_discussions_requested: false,
        course_discussions_succeeded: true,
        course_discussions: payload,
      };
    case types.COURSE_DISCUSSIONS_ERROR:
      return {
        ...state,
        course_discussions_requested: false,
        course_discussions_succeeded: false,
        course_discussions_failed: true,
      };

    case types.GET_DASHBOARD_DISCUSSIONS:
      return {
        ...state,
        dashboard_discussions_requested: true,
        dashboard_discussions_failed: null,
        dashboard_discussions_succeeded: null,
      };

    case types.DASHBOARD_DISCUSSIONS_SUCCESS:
      return {
        ...state,
        dashboard_discussions_requested: false,
        dashboard_discussions_succeeded: true,
        dashboard_discussions: payload,
      };
    case types.DASHBOARD_DISCUSSIONS_ERROR:
      return {
        ...state,
        dashboard_discussions_requested: false,
        dashboard_discussions_succeeded: false,
        dashboard_discussions_failed: true,
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

export default DiscussionReducer;

const updateSubData = (state, mapperFn) => {
  return {
    course_discussions:
      state.course_discussions.length > 0 &&
      state.course_discussions.map(mapperFn),
    dashboard_discussions:
      state.dashboard_discussions.length > 0 &&
      state.dashboard_discussions.map((i, k) =>
        k == state.dashboard_filterData.selected
          ? {
              ...i,
              courses: i.courses.map(mapperFn),
            }
          : i
      ),
  };
};
