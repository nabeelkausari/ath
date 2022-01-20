import { USER_LOGOUT } from '../auth/types';
import * as types from './types';

const initialState = {
  room_messages_requested: null,
  room_messages_succeeded: null,
  room_messages_failed: null,
  room_messages: [],
  rooms_requested: null,
  rooms_succeeded: null,
  rooms_failed: null,
  rooms: [],
};

const MessagesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_DISCUSSION_FILTER:
      return { ...state, filterData: { ...state.filterData, ...payload } };

    case types.GET_MESSAGES_ROOM_MESSAGES:
      return {
        ...state,
        room_messages_requested: true,
        room_messages_failed: null,
        room_messages_succeeded: null,
      };

    case types.MESSAGES_ROOM_MESSAGES_SUCCESS:
      return {
        ...state,
        room_messages_requested: false,
        room_messages_succeeded: true,
        room_messages: payload,
      };
    case types.MESSAGES_ROOM_MESSAGES_ERROR:
      return {
        ...state,
        room_messages_requested: false,
        room_messages_succeeded: false,
        room_messages_failed: true,
      };

    case types.GET_MESSAGES_ROOMS:
      return {
        ...state,
        rooms_requested: true,
        rooms_failed: null,
        rooms_succeeded: null,
      };

    case types.MESSAGES_ROOMS_SUCCESS:
      return {
        ...state,
        rooms_requested: false,
        rooms_succeeded: true,
        rooms: payload,
      };
    case types.MESSAGES_ROOMS_ERROR:
      return {
        ...state,
        rooms_requested: false,
        rooms_succeeded: false,
        rooms_failed: true,
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

export default MessagesReducer;
