import get from 'lodash/get';
import Papa from 'papaparse';

import { fetchLink, fetchLinkAs } from '../../../utils/api/fetch';
import { notify } from '../../../utils/helpers/notification';
// import { fetchLink, fetchLinkAs } from '../../../../../../common/api/helpers';
// import { notify } from '../../../../../../common/utils/notification';
// import { dialogs } from '../../../../toPublish/Dialog';
// import AutoRenameDetails from '../components/CreateDataset/AutoRenameDetails';
import * as types from './types';

export const selectTable = (payload) => ({ type: types.SELECT_TABLE, payload });

export const getDatasets = () => (dispatch, getState) => {
  const { solve } = getState().workspace;
  let dataset_link = get(solve, '_links.tables_with_columns');
  if (!dataset_link) return console.log('steps link not found');

  dispatch({ type: types.GET_DATASETS });
  return fetchLinkAs(dataset_link)
    .then((payload) => {
      if (payload.lastModifiedTableRef !== '') {
        dispatch(selectTable(payload.lastModifiedTableRef));
      }

      dispatch({
        type: types.GET_DATASETS_SUCCESS,
        payload,
      });
      // let [selected_table_data] = payload.datasets.filter(item => item.ref === payload.lastModifiedTableRef)
      // let ui_csv = null
      // let selected_table_data_link = ui_csv ? ui_csv : get(selected_table_data, 'datasetPath');
      // dispatch(fetchCsvData('https://devdata.analyttica.com/output/da49652c-ba7d-4531-b610-a50cf856d841/solve_100010/user_3820/data/Airline_SmoothLanding.uidata'))
    })
    .catch((payload) => dispatch({ type: types.GET_DATASETS_ERROR, payload }));
};

export const selectColumn = (dataset_reference, header) => (dispatch) => {
  dispatch({
    type: types.SELECT_COLUMN,
    payload: { dataset_reference, header },
  });
};

export const setDatasetSelection = () => (dispatch, getState) => {
  const {
    workspace: { functions, datasets },
  } = getState();
  let column_selections = functions.selections;
  let dataset_selections = {};

  for (let key in column_selections) {
    dataset_selections[key] = {
      name: datasets.list.by_uri[key].name,
      uri: datasets.list.by_uri[key].datasetPath,
    };
  }
  dispatch({ type: types.SET_DATASET_SELECTIONS, payload: dataset_selections });
};

export const getUploadLink = () => (dispatch) => {
  dispatch({ type: types.FETCH_UPLOAD_LINK_REQUESTED });
  fetchLink({
    href: '/course/upload',
    type: 'application/json',
    accept: 'application/json',
  })
    .then((res) => res.json())
    .then((result) => {
      const payload = {
        uploadLink: result.file_upload_url,
        sampleCSVLink: result.sample_data_url,
        deleteLink: result.delete_dataset_file,
      };
      dispatch({ type: types.FETCH_UPLOAD_LINK_SUCCEEDED, payload });
    })
    .catch((payload) => {
      dispatch({ type: types.FETCH_UPLOAD_LINK_FAILED, payload });
      notify.error('Error', payload.message);
    });
};

export const uploadDataset = (formData) => (dispatch, getState) => {
  dispatch({ type: types.UPLOAD_DATASET_REQUESTED });
  const {
    workspace: {
      datasets: { upload_dataset },
    },
  } = getState();
  let is_upload_success = false;

  fetch(`${upload_dataset.uploadLink.href}`, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      is_upload_success = response.ok;
      return response.json();
    })
    .then((res) => {
      if (is_upload_success) {
        return res;
      } else {
        throw new Error(res.message);
      }
    })
    .then((data) => {
      // if (data.modifiedColumnData.some((b) => b !== null)) {
      //   return dispatch(
      //     dialogs.show({
      //       subtitle: 'Auto Rename of the Column Names',
      //       Component: AutoRenameDetails,
      //       component_props: { ...data },
      //       yesButton: {
      //         text: 'Proceed',
      //         onClick: async () => {
      //           await data.file_path.forEach((file) =>
      //             dispatch(addDataset(file))
      //           );
      //           return true;
      //         },
      //       },
      //       noButton: {
      //         text: 'Cancel',
      //       },
      //     })
      //   );
      // }
      data?.file_path.forEach((file, i) => {
        setTimeout(() => dispatch(addDataset(file)), i * 1000);
      });
      const tables_count = data?.file_path.length;
      setTimeout(() => {
        dispatch({ type: types.UPLOAD_DATASET_SUCCEEDED });
        notify.success(
          `${
            tables_count === 1 ? 'Dataset' : `${tables_count} Datasets`
          } uploaded successfully`
        );

        // clear the upload state
        dispatch({ type: types.CLEAR_UPLOAD_DATASET });
      }, tables_count * 1000);
    })
    .catch((error) => {
      dispatch({ type: types.UPLOAD_DATASET_FAILED, payload: error });
      notify.error(error.message);
    });
};

export const addDataset = (file) => (dispatch, getState) => {
  const {
    workspace: { solve },
  } = getState();
  const payload = {
    path: JSON.stringify([file]),
  };
  dispatch({ type: types.DATASET_CREATED_REQUESTED });
  return fetchLink(solve._links.add_data_sets, payload)
    .then(() => {
      dispatch({ type: types.DATASET_CREATED_SUCCEEDED });
      // dispatch(selectTable(data.filename));
      dispatch(getDatasets());
    })
    .catch((payload) => {
      dispatch({ type: types.DATASET_CREATED_FAILED, payload });
      notify.error('Error', payload.message);
    });
};

export const fetchSqlForm = () => (dispatch, getState) => {
  dispatch({ type: types.FETCH_SQL_FORM_REQUESTED });
  const {
    workspace: {
      functions: {
        list: { by_uri },
      },
    },
  } = getState();
  const sql_form = by_uri['/functions/FUNC0473'];
  if (sql_form === undefined) return;
  const payload = {};
  fetchLinkAs(sql_form._links.parameters, payload)
    .then((payload) =>
      dispatch({ type: types.FETCH_SQL_FORM_SUCCEEDED, payload })
    )
    .catch((payload) =>
      dispatch({ type: types.FETCH_SQL_FORM_FAILED, payload })
    );
};

export const connectToExternalDatabase =
  (payload, dbDriver) => (dispatch, getState) => {
    dispatch({ type: types.CONNECT_TO_DATABASE_REQUESTED });
    const {
      workspace: { solve },
    } = getState();
    const link = solve._links.connect_db;
    if (!link) return notify.error('No database connection link found');
    const params = {
      ...payload,
      dbDriver,
    };

    return fetchLink(link, params)
      .then((payload) => {
        notify.success('Success');
        dispatch({ type: types.CONNECT_TO_DATABASE_SUCCEEDED });
        dispatch(getDatasets());
      })
      .catch((error) => {
        dispatch({ type: types.CONNECT_TO_DATABASE_FAILED });
        notify.error(error.message);
      });
  };

export const fetchPreloadDatasets = () => (dispatch, getState) => {
  dispatch({ type: types.FETCH_PRELOAD_DATASET_REQUESTED });
  const link = {
    href: '/projects/datasets/preloaded',
    method: 'GET',
    type: 'application/json',
  };

  fetchLink(link)
    .then((res) => res.json())
    .then((payload) => {
      dispatch({ type: types.FETCH_PRELOAD_DATASET_SUCCEEDED, payload });
    })
    .catch((payload) =>
      dispatch({ type: types.FETCH_PRELOAD_DATASET_FAILED, payload })
    );
};

export const getDbDrivers = () => (dispatch, getState) => {
  dispatch({ type: types.FETCH_DB_DRIVERS_REQUESTED });
  const {
    workspace: { solve },
  } = getState();
  const link = get(solve, '_links.database_drivers');
  if (!link) return;
  fetchLinkAs(link)
    .then((payload) => {
      dispatch({ type: types.FETCH_DB_DRIVERS_SUCCEEDED, payload });
    })
    .catch((payload) =>
      dispatch({ type: types.FETCH_DB_DRIVERS_FAILED, payload })
    );
};

export const renameDataset = (old_name, new_name) => (dispatch, getState) => {
  const {
    workspace: { solve },
  } = getState();
  const link = get(solve, '_links.rename_table');
  if (!link) return;
  if (old_name === new_name) return;
  const params = {
    existingTableName: old_name,
    newTableName: new_name,
    tableDescription: '',
  };
  dispatch({ type: types.RENAME_DATASET_REQUESTED });
  fetchLink(link, params)
    .then((payload) => {
      dispatch({
        type: types.RENAME_DATASET_SUCCEEDED,
        payload: { old_name, new_name },
      });
      notify.success('Table name updated successfully');
    })
    .catch((error) => {
      dispatch({ type: types.RENAME_DATASET_FAILED, error });
      if (Array.isArray(error.body)) {
        error.body.forEach((e) => {
          notify.error(e.fieldMessage);
        });
      } else {
        notify.error(error?.body?.message);
      }
    });
};

export const fetchCsvData = (csv_url) => (dispatch, getState) => {
  if (!csv_url) return;
  dispatch({ type: types.FETCH_CSV_DATA_REQUESTED });
  // let csvData = [];
  // let headerRow = [];
  return Papa.parse(csv_url || '', {
    download: true,
    delimiter: ';',
    complete: (results) => {
      let data = [];
      if (results.data.length > 200) {
        data = results.data.slice(0, 201);
      } else {
        data = results.data.slice(0, results.data.length - 1);
      }

      dispatch({
        type: types.FETCH_CSV_DATA_SUCCEEDED,
        payload: {
          [csv_url]: data,
        },
      });
    },
  });
};
export const resetDatasets = () => (dispatch, getState) => {
  dispatch({ type: types.RESET_DATASETS });
};

export const getFileUploadSettings = () => (dispatch, getState) => {
  dispatch({ type: types.DATA_UPLOAD_SETTINGS_REQUESTED });
  const {
    auth: { my_profile },
  } = getState();
  const link = get(my_profile, '_links.project_info');
  if (!link) return;
  fetchLinkAs({ ...link, type: 'application/json' })
    .then((payload) => {
      dispatch({ type: types.DATA_UPLOAD_SETTINGS_SUCCEEDED, payload });
    })
    .catch((payload) =>
      dispatch({ type: types.DATA_UPLOAD_SETTINGS_FAILED, payload })
    );
};

export const toggleHideDataset =
  (toggle_link, toggled_state, dataset) => (dispatch, getState) => {
    const {
      solve: {
        datasets: {
          list: { items },
          selected_table_reference,
        },
      },
    } = getState();

    const { id, ref } = dataset;

    let ds_index = items.map((ds) => ds.id).indexOf(id);
    let updated_ref = selected_table_reference;
    let visible_dataset = items.filter((ds) => !ds.isHidden);
    let visible_ds_index = visible_dataset.map((ds) => ds.id).indexOf(id);

    if (toggled_state && visible_dataset.length === 1) {
      notify.error('You cannot hide all Tables', 'One table must be visible');
    } else {
      if (ref === selected_table_reference) {
        if (visible_ds_index === 0) {
          updated_ref = visible_dataset[1].ref;
        } else {
          updated_ref = visible_dataset[visible_ds_index - 1].ref;
        }
      }

      const link = {
        ...toggle_link,
        href: `${toggle_link.href}${toggled_state}`,
      };

      fetchLink(link)
        .then((payload) => {
          dispatch({
            type: types.UPDATE_DATASET_VISIBILTY,
            payload: { dataset_id: id, toggled_state, ds_index, updated_ref },
          });
        })
        .catch((error) => console.log(error));
    }
  };
