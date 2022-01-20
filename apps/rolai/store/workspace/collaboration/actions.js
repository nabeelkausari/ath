import { fetchLinkAs } from '../../../utils/api/fetch';
import { notify } from '../../../utils/helpers/notification';
import * as types from './types';

export const setCollaborationInvite = (email) => (dispatch, getState) => {
  const {
    auth: {
      my_profile: {
        info: {
          _links: { notify_registration_link },
        },
      },
    },
    cases: {
      project: {
        info: { id },
      },
    },
  } = getState();
  dispatch({ type: types.SEND_COLLABORATION_INVITE_REQUESTED });
  return fetchLinkAs(notify_registration_link, {
    caseId: id,
    email,
  })
    .then((payload) => {
      dispatch({ type: types.SEND_COLLABORATION_INVITE_SUCCEEDED, payload });
      notify.success('Success', `Invite sent to ${email}`);
    })
    .catch((payload) => {
      dispatch({ type: types.SEND_COLLABORATION_INVITE_FAILED, payload });
    });
};

export const checkForUserAccount = (email) => (dispatch, getState) => {
  const {
    auth: {
      my_profile: {
        info: {
          _links: { admin_user_by_email },
        },
      },
    },
  } = getState();
  let link = { ...admin_user_by_email };
  link.href = `${link.href}/${email}`;
  dispatch({ type: types.FETCH_USER_REQUESTED });
  fetchLinkAs(link)
    .then((response) =>
      dispatch({ type: types.FETCH_USER_SUCCEEDED, payload: response })
    )
    .catch((error) => dispatch({ type: types.FETCH_USER_FAILED, error }));
};
