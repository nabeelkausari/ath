import get from 'lodash/get';

import { fetchLink } from '../../../utils/api/fetch';
import { notify } from '../../../utils/helpers/notification';
import * as types from './types';

export const fetchConsole = () => (dispatch, getState) => {
  const {
    workspace: { solve },
  } = getState();
  const console_link = get(solve, '_links.console');
  if (!console_link) return console.log('console link not found');
  dispatch({ type: types.FETCH_CONSOLE_REQUESTED });
  fetchLink(console_link)
    .then((res) => res.json())
    .then((data) => {
      if (data.serverStatus === 'Running' && data.path) {
        dispatch({ type: types.FETCH_CONSOLE_SUCCEEDED, payload: data.path });
      }
      // if (!!data.path && !!data.path) {
      //
      // } else {
      //   console.log("Error");
      // }
    })
    .catch((payload) =>
      dispatch({ type: types.FETCH_CONSOLE_FAILED, payload })
    );
};

export const discardConsole = () => (dispatch, getState) => {
  const {
    workspace: { solve },
  } = getState();
  const discard_link = solve._links.discard_draft;
  dispatch({ type: types.DISCARD_CONSOLE_REQUESTED });
  fetchLink(discard_link)
    .then((res) => {
      notify.success('Success', 'console discarded successfully');
      dispatch({ type: types.DISCARD_CONSOLE_SUCCEEDED });
      dispatch(unSetConsoleUrl());
    })
    .catch((error) => {
      notify.error('Error', error.message);
      dispatch({ type: types.DISCARD_CONSOLE_FAILED });
    });
};

export const fetchNotebook = (link) => (dispatch, getState) => {
  if (!link) return console.log('notebook link not found');
  dispatch({ type: types.FETCH_NOTEBOOK_REQUESTED });
  fetchLink(link)
    .then((res) => res.json())
    .then((payload) => {
      if (payload?.serverStatus !== 'Running') {
        setTimeout(() => {
          dispatch(fetchNotebook(link));
        }, 2000);
      } else if (payload?.serverStatus === 'Running') {
        dispatch({ type: types.FETCH_NOTEBOOK_SUCCEEDED, payload });
      }
    })
    .catch((payload) =>
      dispatch({ type: types.FETCH_NOTEBOOK_FAILED, payload })
    );
};

export const discardNotebook = (link) => (dispatch, getState) => {
  if (!link) return console.log('discardNotebook link not found');
  dispatch({ type: types.DISCARD_NOTEBOOK_REQUESTED });
  fetchLink(link)
    .then((res) => res.json())
    .then((payload) => {
      if (payload?.serverStatus !== 'Running') {
        setTimeout(() => {
          dispatch(discardNotebook(link));
        }, 2000);
      } else if (payload?.serverStatus === 'Running') {
        dispatch({ type: types.DISCARD_NOTEBOOK_SUCCEEDED, payload });
        notify.success('Notebook discarded successfully');
      }
    })
    .catch((error) => {
      notify.error('Error', error.message);
      dispatch({ type: types.DISCARD_NOTEBOOK_FAILED });
    });
};

export const unSetConsoleUrl = () => (dispatch) => {
  dispatch({ type: types.UNSET_CONSOLE_URL });
};
