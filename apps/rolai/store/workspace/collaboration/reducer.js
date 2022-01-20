import { CLEAR_SOLVE } from "../types";
import * as types from './types';

const initialState = {
  invitation_requested: null,
  invitation_succeeded: null,
  invitation_failed: null,
  invitation_error: null,
  invitation: null,
};

const collaborationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SEND_COLLABORATION_INVITE_REQUESTED:
      return {
        ...state,
        invitation_requested: true,
        invitation_succeeded: null,
        invitation_failed: null,
      };
    case types.SEND_COLLABORATION_INVITE_SUCCEEDED:
      return {
        ...state,
        invitation_requested: false,
        invitation_succeeded: true,
        invitation_failed: false,
        invitation: payload,
      };
    case types.SEND_COLLABORATION_INVITE_FAILED:
      return {
        ...state,
        invitation_requested: false,
        invitation_succeeded: false,
        invitation_failed: true,
        invitation_error: payload,
      };
    case CLEAR_SOLVE:
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
};

export default collaborationReducer;
