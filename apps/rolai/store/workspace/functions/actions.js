import get from 'lodash/get';
import { fromPairs, toPairs } from 'ramda';

import { fetchLink, fetchLinkAs } from '../../../utils/api/fetch';
import { functions } from '../../../utils/api/functions';
import { getMaterialLink } from '../../../utils/api/material';
import { notify } from '../../../utils/helpers/notification';
import { setDatasetSelection } from '../datasets/actions';
import * as types from './types';

export const getCategoryAndFunctions = (link) => (dispatch, getState) => {
  dispatch({ type: types.GET_FUNCTIONS_CATEGORIES });
  return functions
    .categories()
    .then((payload) => {
      dispatch({ type: types.GET_FUNCTIONS_CATEGORIES_SUCCESS, payload });
      return dispatch(getFunctions(link));
    })
    .catch((payload) =>
      dispatch({ type: types.GET_FUNCTIONS_CATEGORIES_ERROR, payload })
    );
};

const getFunctions = (link) => (dispatch) => {
  dispatch({ type: types.GET_FUNCTIONS });
  return functions
    .get(link)
    .then((payload) => dispatch({ type: types.GET_FUNCTIONS_SUCCESS, payload }))
    .catch((payload) => dispatch({ type: types.GET_FUNCTIONS_ERROR, payload }));
};

export const suggestFunctions = (query) => (dispatch, getState) => {
  const {
    workspace: {
      functions: {
        categories,
        list: { by_uri },
      },
    },
  } = getState();
  const categories_by_uri = { ...categories.by_uri };
  dispatch({ type: types.FETCH_FUNCTION_SUGGESTIONS_REQUESTED });
  return functions
    .getSuggestions(query)
    .then((response) => {
      const suggestions = response.map(
        ({
          _links: {
            function: { href },
          },
        }) => {
          const function_obj = by_uri[href];
          const parent_category = categories.items
            .filter((category) =>
              category.functions.some(
                (function_reference) => function_reference === href
              )
            )
            .shift();
          return {
            // label: name || title,
            // value: href,
            sub_category:
              parent_category !== undefined
                ? parent_category.name
                : 'Unknown category',
            category:
              parent_category !== undefined
                ? categories_by_uri[parent_category._links.parent.href].name
                : '',
            function_obj,
          };
        }
      );
      dispatch({
        type: types.FETCH_FUNCTION_SUGGESTIONS_SUCCEEDED,
        payload: suggestions,
      });
    })
    .catch((payload) =>
      dispatch({ type: types.FETCH_FUNCTION_SUGGESTIONS_FAILED, payload })
    );
};

export const publishUdfFunction = (fx) => (dispatch, getState) => {
  dispatch({ type: types.PUBLISH_UDF_FUNCTION_REQUESTED });
  return fetchLinkAs(fx._links.share_udf)
    .then((payload) => {
      notify.success('Successfully Published UDF : ' + fx.name);
      dispatch({ type: types.PUBLISH_UDF_FUNCTION_SUCCEEDED, payload });
    })
    .catch((payload) => {
      dispatch({ type: types.PUBLISH_UDF_FUNCTION_FAILED, payload });
      notify.error(payload.message);
    });
};

export const unpublishUdfFunction = (fx) => (dispatch, getState) => {
  dispatch({ type: types.UN_PUBLISH_UDF_FUNCTION_REQUESTED });
  return fetchLinkAs(fx._links.remove_share_udf)
    .then((payload) => {
      notify.success('Successfully Unpublished UDF : ' + fx.name);
      dispatch({ type: types.UN_PUBLISH_UDF_FUNCTION_SUCCEEDED, payload });
    })
    .catch((payload) => {
      dispatch({ type: types.UN_PUBLISH_UDF_FUNCTION_FAILED, payload });
      notify.error(payload.message);
    });
};

export const getFunctionDescription = (material) => (dispatch, getState) => {
  dispatch({ type: types.FETCH_FUNCTION_DESCRIPTION_REQUESTED });
  return fetchLinkAs(getMaterialLink(material?.href))
    .then((payload) => {
      dispatch({ type: types.FETCH_FUNCTION_DESCRIPTION_SUCCEEDED, payload });
    })
    .catch((payload) =>
      dispatch({ type: types.FETCH_FUNCTION_DESCRIPTION_SUCCEEDED, payload })
    );
};

export const getFunctionParameters = (fx) => (dispatch, getState) => {
  const {
    workspace: {
      solve,
      functions: { selections },
      datasets,
    },
  } = getState();

  if (Object.keys(selections).length === 0) return;
  let fx_selections_copy = {
    ...selections,
  };

  dispatch({ type: types.FETCH_FUNCTION_PARAMETERS_REQUESTED });
  return functions
    .getParameters(
      fx,
      fx_selections_copy,
      datasets.selections,
      get(solve, '_links.self')
    )
    .then((payload) =>
      dispatch({ type: types.FETCH_FUNCTION_PARAMETERS_SUCCEEDED, payload })
    )
    .catch((payload) => {
      dispatch({ type: types.FETCH_FUNCTION_PARAMETERS_FAILED, payload });
      notify.error('Error', payload.message);
    });
};

export const setColumnSelections = (column) => (dispatch, getState) => {
  const {
    workspace: {
      functions: { selections },
      datasets: { selected_table_reference },
    },
  } = getState();
  let current_selections = { ...selections };

  if (current_selections[selected_table_reference] === undefined)
    current_selections[selected_table_reference] = [];

  const columnIndex = current_selections[selected_table_reference].findIndex(
    (item) => item.index === column.index
  );
  if (columnIndex === -1) {
    current_selections[selected_table_reference].push(column);
  } else {
    current_selections[selected_table_reference] = current_selections[
      selected_table_reference
    ].filter((item) => item.index !== column.index);
  }

  if (current_selections[selected_table_reference].length === 0)
    delete current_selections[selected_table_reference];
  dispatch({ type: types.SET_COLUMN_SELECTION, payload: current_selections });
  dispatch(setDatasetSelection());
};
export const setColumnSelectionsFromToolbar =
  (dataset_reference, column) => (dispatch, getState) => {
    const {
      workspace: {
        functions: { selections },
      },
    } = getState();
    let current_selections = { ...selections };

    if (current_selections[dataset_reference] === undefined)
      current_selections[dataset_reference] = [];

    const columnIndex = current_selections[dataset_reference].findIndex(
      (item) => item.index === column.index
    );
    if (columnIndex < 0) {
      current_selections[dataset_reference].push(column);
    } else {
      current_selections[dataset_reference] = current_selections[
        dataset_reference
      ].filter((item) => item.index !== column.index);
    }

    if (current_selections[dataset_reference].length === 0)
      delete current_selections[dataset_reference];
    dispatch({ type: types.SET_COLUMN_SELECTION, payload: current_selections });
    dispatch(setDatasetSelection());
  };

export const setAllColumnSelections =
  (current_dataset_ref) => (dispatch, getState) => {
    const {
      workspace: {
        datasets: {
          list: { by_uri },
        },
        functions: { selections },
      },
    } = getState();
    let current_selections = { ...selections };
    if (current_selections[current_dataset_ref] === undefined) {
      current_selections[current_dataset_ref] = [
        ...by_uri[current_dataset_ref].columns,
      ];
    } else {
      delete current_selections[current_dataset_ref];
    }
    dispatch({ type: types.SET_COLUMN_SELECTION, payload: current_selections });
    dispatch(setDatasetSelection());
  };

export const deleteColumnSelection =
  (current_dataset_ref) => (dispatch, getState) => {
    const {
      workspace: {
        functions: { selections },
      },
    } = getState();

    let current_selections = { ...selections };

    delete current_selections[current_dataset_ref];

    dispatch({ type: types.SET_COLUMN_SELECTION, payload: current_selections });
    dispatch(setDatasetSelection());
  };

export const formValueMultiChange = (name, value) => (dispatch, getState) => {
  return dispatch(formValueChanged(name, value));
};

export const removeSelection = (name) => (dispatch, getState) => {
  dispatch({ type: types.REMOVE_SELECTION, payload: name });
};

const formValueChanged = (name, value) => ({
  type: types.SET_FUNCTION_PARAMETERS,
  payload: { name, value },
});

const getTypedValue = (type, value) => {
  switch (type) {
    case 'int':
      const intValue = parseInt(value);
      return isNaN(intValue) ? value : intValue;
    case 'float':
      const floatValue = parseFloat(value);
      return isNaN(floatValue) ? value : floatValue;
    default:
      return value;
  }
};

const validateSpecialCharacters = (value, paramValidation) => {
  return !/[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~\s]/.test(value);
};
const validateBeginingWithNumber = (value, paramValidation) => {
  return !/^\d/.test(value);
};

const validateParams = (value, paramValidation) => {
  switch (paramValidation.type) {
    case 'SPECIAL_CHARACTER':
      return validateSpecialCharacters(value, paramValidation);
    case 'START_WITH_NUMBER':
      return validateBeginingWithNumber(value, paramValidation);
    default:
      return true;
  }
};

export const setSelectedFunctionParameters =
  (name, value) => (dispatch, getState) => {
    const {
      workspace: {
        functions: { parameters, execution },
      },
    } = getState();
    const { type, multi_select } = parameters.list
      .filter((p) => p.name === name)
      .shift();
    const is_array = type === 'select' && multi_select;
    if (!is_array) {
      if (type !== 'select' && parameters.list.length > 0) {
        const function_params = parameters.list.filter(
          (function_param) => function_param.name === name
        );
        const validations = function_params[0].validations
          ? function_params[0].validations
          : [];
        const validationFailed = validations.some((validation) => {
          if (!validateParams(value, validation)) {
            return true;
          }
          return false;
        });
        if (validationFailed) {
          if (!!execution.selected_parameters[name]) return;
          return dispatch(formValueChanged(name, ''));
        }
      }
      return dispatch(formValueChanged(name, getTypedValue(type, value)));
    }

    dispatch(formValueChanged(name, value));
  };

export const cleanHeaders = (selectedDatasets, all_headers) =>
  fromPairs(
    toPairs(all_headers).filter(
      ([key, value]) => selectedDatasets.indexOf(key) >= 0
    )
  );

export const executeFunction = () => (dispatch, getState) => {
  dispatch({ type: types.FUNCTION_EXECUTION_REQUESTED });
  const {
    workspace: { solve, functions, datasets },
  } = getState();
  const { current_function } = functions.execution;
  const param = {
    selections: functions.selections,
    all_headers: cleanHeaders(datasets.selections, datasets.columns),
    parameters: functions.execution.selected_parameters,
    function_id: functions.execution.current_function.function_id,
  };
  notify.success('Initiated', `${current_function.name} Function Initiated`);
  return fetchLinkAs(solve._links.create_user_step, param)
    .then((payload) => {
      dispatch({ type: types.FUNCTION_EXECUTION_SUCCEEDED, payload });
      dispatch(removeSelectedFunctionsAndParameters());
      dispatch(removeColumnSelection());
    })
    .catch((payload) => {
      notify.error('Something went wrong', payload.message);
    });
};

export const removeSelectedFunctionsAndParameters =
  () => (dispatch, getState) => {
    dispatch({ type: types.UNSET_CURRENT_FUNCTION });
    dispatch({ type: types.UNSET_FUNCTION_PARAMETERS });
    dispatch({ type: types.UNSET_CURRENT_FUNCTION_CATEGORY });
    dispatch({ type: types.UNSET_PARAMETER_FLYOUT });
    dispatch({ type: types.UNSET_FUNCTION_DESCRIPTION });
  };

export const setSelectedFunction = (payload, flag) => (dispatch, getState) => {
  dispatch({ type: types.SET_CURRENT_FUNCTION, payload });
  dispatch(closeParameterFlyout());
  if (flag) {
    dispatch({ type: types.SET_PARAMETER_FLYOUT });
  }
};
export const setProDetailsFlyout = () => (dispatch) => {
  dispatch({ type: types.SET_PRO_DETAILS_FLYOUT });
};
export const closeProDetailsFlyout = () => (dispatch) => {
  dispatch({ type: types.UNSET_PRO_DETAILS_FLYOUT });
};
export const setSelectedFunctionCategory =
  (payload) => (dispatch, getState) => {
    dispatch({ type: types.SET_CURRENT_FUNCTION_CATEGORY, payload });
  };
export const closeParameterFlyout = () => (dispatch, getState) => {
  dispatch({ type: types.UNSET_PARAMETER_FLYOUT });
  dispatch({ type: types.UNSET_FUNCTION_PARAMETERS });
};

export const removeColumnSelection = () => (dispatch, getState) => {
  dispatch({ type: types.UNSET_COLUMN_SELECTION });
};

export const resetFunctionExecution = () => (dispatch) => {
  dispatch({ type: types.RESET_FUNCTION_EXECUTION });
};

export const deleteUdf = (link, ref) => (dispatch, getState) => {
  fetchLink(link)
    .then(() => {
      dispatch({ type: types.DELETE_UDF_SUCCEEDED, payload: ref });
    })
    .catch(() => {
      dispatch({ type: types.DELETE_UDF_FAILED });
    });
};

export const renameUdf = (link, udf_name, ref) => (dispatch, getState) => {
  const params = {
    name: udf_name,
  };
  dispatch({ type: types.RENAME_UDF_REQUESTED });
  fetchLink(link, params)
    .then(() => {
      dispatch({
        type: types.RENAME_UDF_SUCCEEDED,
        payload: { ref: ref, name: udf_name },
      });
    })
    .catch((error) => {
      dispatch({ type: types.RENAME_UDF_FAILED, error });
    });
};
