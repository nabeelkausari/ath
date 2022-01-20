import Papa from 'papaparse';

import { fetchLinkAs } from '../../../../utils/api/fetch';
import {
  getHeaders,
  getTableInfos,
} from '../../../../utils/helpers/helperFunctions';
import * as types from './types';

export const fetchShowCodeTabs = () => (dispatch, getState) => {
  dispatch({ type: types.FETCH_USER_STEP_DETAILS_REQUESTED });
  const {
    cases: { info },
  } = getState();
  fetchLinkAs(info._links.show_code_tabs)
    .then((payload) => {
      dispatch({ type: types.FETCH_USER_STEP_DETAILS_SUCCEEDED, payload });
      dispatch(fetchShowCodeSteps());
    })
    .catch((payload) =>
      dispatch({ type: types.FETCH_USER_STEP_DETAILS_FAILED, payload })
    );
};

export const fetchShowCodeSteps = () => (dispatch, getState) => {
  dispatch({ type: types.FETCH_USER_CODE_REQUESTED });
  const {
    solve: {
      userStepDetails: { user_step_details_info, current_tab_reference },
    },
  } = getState();
  const tab = user_step_details_info
    .filter((tab) => tab._links.self.href === current_tab_reference)
    .shift();
  if (current_tab_reference === '' || tab === undefined) return;
  fetchLinkAs({
    href: tab._links.steps.href,
    method: tab._links.steps.method,
    type: 'application/json',
  }).then((steps) =>
    dispatch({
      type: types.FETCH_USER_CODE_SUCCEEDED,
      payload: { steps: steps, current_tab_reference: current_tab_reference },
    }).catch((payload) =>
      dispatch({ type: types.FETCH_USER_CODE_FAILED, payload })
    )
  );
};

export const setCurrentShowCodeTab =
  (current_tab_reference) => (dispatch, getState) => {
    dispatch(setCurrentShowCodeTabInternal(current_tab_reference));
    dispatch(fetchShowCodeSteps());
  };

export const setCurrentShowCodeTabInternal = (payload) => ({
  type: types.SET_CURRENT_SHOW_CODE_TAB,
  payload,
});

export const fetchShowCodeStepsSuccess = (current_tab_reference, steps) => ({
  type: types.FETCH_USER_CODE_SUCCEEDED,
  payload: {
    steps: steps,
    current_tab_reference: current_tab_reference,
  },
});

export const fetchStepDetailsCsv = (csv) => (dispatch) => {
  dispatch({ type: types.FETCH_STEP_DATASET_CSV_REQUESTED });

  Papa.parse(csv || '', {
    delimiter: ';',
    download: true,
    complete: (results) => {
      const table_infos = getTableInfos(results.data);
      const tables = table_infos.map((table_info) => {
        const raw_rows = table_info.rows;
        const headers = getHeaders(raw_rows.shift()).map((header) => header);
        const rows = raw_rows
          // .map((row, i) => getRow(row, i))
          .filter((row) => row.length === headers.length)
          .filter(
            (row) => !row.every((datum) => datum === undefined || datum === '')
          );
        if (rows.length !== raw_rows.length)
          console.log(
            "Some rows don't have the required number of columns, or didn't have data, and have been ignored."
          );
        return {
          name: table_info.name,
          headers,
          rows,
        };
      });

      let payload = { data: tables, csv };
      dispatch({ type: types.FETCH_STEP_DATASET_CSV_SUCCEEDED, payload });
    },
  });
};
