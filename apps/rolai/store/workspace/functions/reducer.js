import { byUri } from '../../../utils/helpers/byUri';
import * as types from './types';

const initialState = {
  functions_categories_requested: null,
  functions_categories_succeeded: null,
  functions_categories_failed: null,
  categories: {
    items: [],
    by_uri: {},
    list_updated: null,
  },

  functions_requested: null,
  functions_succeeded: null,
  functions_failed: null,
  list: {
    items: [],
    by_uri: {},
  },
  suggestions: {
    items: [],
    fetch_suggestions_loading: null,
    fetch_suggestions_succeeded: null,
    fetch_suggestions_error: null,
  },
  description: {
    info: {},
    fetch_description_loading: null,
    fetch_description_succeeded: null,
    fetch_description_error: null,
  },
  selections: {},
  parameters: {
    list: [],
    fetch_function_parameters_loading: null,
    fetch_function_parameters_succeeded: null,
    fetch_function_parameters_error: null,
  },
  execution: {
    selected_parameters: {},
    current_function: {},
    current_function_category: {},
  },
  parameter_flyout_open: false,
  pro_details_flyout_open: false,
  execution_step: null,
  execution_check_count: 0,

  function_execution_loading: null,
  function_execution_succeeded: null,
  function_execution_failed: null,

  rename_udf_loading: null,
  rename_udf_succeeded: null,
  rename_udf_failed: null,

  delete_udf_loading: null,
  delete_udf_succeeded: null,
  delete_udf_failed: null,
};

const functionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_FUNCTIONS_CATEGORIES:
      return {
        ...state,
        functions_categories_requested: true,
        functions_categories_succeeded: null,
        functions_categories_failed: null,
      };

    case types.GET_FUNCTIONS_CATEGORIES_SUCCESS:
      return {
        ...state,
        functions_categories_requested: false,
        functions_categories_succeeded: true,
        categories: { items: payload, by_uri: byUri(payload) },
      };

    case types.GET_FUNCTIONS_CATEGORIES_ERROR:
      return {
        ...state,
        functions_categories_requested: false,
        functions_categories_failed: true,
      };

    case types.GET_FUNCTIONS:
      return {
        ...state,
        functions_requested: true,
        functions_succeeded: null,
        functions_failed: null,
      };

    case types.GET_FUNCTIONS_SUCCESS:
      return {
        ...state,
        functions_requested: false,
        functions_succeeded: true,
        list: { items: payload, by_uri: byUri(payload) },
      };

    case types.GET_FUNCTIONS_ERROR:
      return {
        ...state,
        functions_requested: false,
        functions_failed: true,
      };

    case types.FETCH_FUNCTION_SUGGESTIONS_REQUESTED:
      return {
        ...state,
        suggestions: {
          ...state.suggestions,
          fetch_suggestions_loading: true,
        },
      };

    case types.FETCH_FUNCTION_SUGGESTIONS_SUCCEEDED:
      return {
        ...state,

        suggestions: {
          ...state.suggestions,
          fetch_suggestions_loading: false,
          fetch_suggestions_succeeded: true,
          items: payload,
        },
      };

    case types.FETCH_FUNCTION_SUGGESTIONS_FAILED:
      return {
        ...state,
        suggestions: {
          ...state.suggestions,
          fetch_suggestions_loading: false,
          fetch_suggestions_succeeded: false,
          fetch_suggestions_error: payload,
        },
      };

    case types.FETCH_FUNCTION_DESCRIPTION_REQUESTED:
      return {
        ...state,
        description: {
          ...state.description,
          fetch_description_loading: true,
        },
      };

    case types.FETCH_FUNCTION_DESCRIPTION_SUCCEEDED:
      return {
        ...state,
        description: {
          ...state.description,
          fetch_description_loading: false,
          fetch_description_succeeded: true,
          info: payload,
        },
      };

    case types.FETCH_FUNCTION_DESCRIPTION_FAILED:
      return {
        ...state,
        description: {
          ...state.description,
          fetch_description_loading: false,
          fetch_description_error: payload,
        },
      };

    case types.SET_COLUMN_SELECTION:
      return {
        ...state,
        selections: payload,
      };

    case types.UNSET_COLUMN_SELECTION:
      return {
        ...state,
        selections: {},
      };

    case types.FETCH_FUNCTION_PARAMETERS_REQUESTED:
      return {
        ...state,
        parameters: {
          ...state.parameters,
          fetch_function_parameters_loading: true,
        },
      };

    case types.FETCH_FUNCTION_PARAMETERS_SUCCEEDED:
      return {
        ...state,
        parameters: {
          ...state.parameters,
          fetch_function_parameters_loading: false,
          fetch_function_parameters_succeeded: true,
          list: payload,
        },
      };

    case types.FETCH_FUNCTION_PARAMETERS_FAILED:
      return {
        ...state,
        parameters: {
          ...state.parameters,
          fetch_function_parameters_loading: false,
          fetch_function_parameters_error: payload,
        },
      };

    case types.SET_CURRENT_FUNCTION:
      return {
        ...state,
        execution: {
          ...state.execution,
          current_function: payload,
        },
      };

    case types.SET_FUNCTION_PARAMETERS:
      return {
        ...state,
        execution: {
          ...state.execution,
          selected_parameters: {
            ...state.execution.selected_parameters,
            [payload.name]: payload.value,
          },
        },
      };

    case types.REMOVE_SELECTION:
      let parameters = { ...state.execution.selected_parameters };
      delete parameters[payload];
      return {
        ...state,
        execution: {
          ...state.execution,
          selected_parameters: {
            ...parameters,
          },
        },
      };

    case types.UNSET_CURRENT_FUNCTION:
      return {
        ...state,
        execution: {
          ...state.execution,
          current_function: {},
        },
      };

    case types.UNSET_FUNCTION_PARAMETERS:
      return {
        ...state,
        parameters: {
          ...state.parameters,
          list: [],
        },
        execution: {
          ...state.execution,
          selected_parameters: {},
        },
      };

    case types.UNSET_FUNCTION_DESCRIPTION:
      return {
        ...state,
        description: {
          ...state.description,
          info: {},
        },
      };

    case types.SET_CURRENT_FUNCTION_CATEGORY:
      return {
        ...state,
        execution: {
          ...state.execution,
          current_function_category: payload,
        },
      };

    case types.UNSET_CURRENT_FUNCTION_CATEGORY:
      return {
        ...state,
        execution: {
          ...state.execution,
          current_function_category: {},
        },
      };

    case types.SET_PARAMETER_FLYOUT:
      return {
        ...state,
        parameter_flyout_open: true,
        pro_details_flyout_open: false,
      };

    case types.UNSET_PARAMETER_FLYOUT:
      return {
        ...state,
        parameter_flyout_open: false,
      };

    case types.SET_PRO_DETAILS_FLYOUT:
      return {
        ...state,
        pro_details_flyout_open: true,
        parameter_flyout_open: false,
      };

    case types.UNSET_PRO_DETAILS_FLYOUT:
      return {
        ...state,
        pro_details_flyout_open: false,
      };

    case types.FUNCTION_EXECUTION_REQUESTED:
      return {
        ...state,
        function_execution_loading: true,
        function_execution_failed: null,
        function_execution_succeeded: null,
      };

    case types.FUNCTION_EXECUTION_SUCCEEDED:
      return {
        ...state,
        function_execution_loading: false,
        function_execution_failed: null,
        function_execution_succeeded: true,
        executed_step: payload,
      };

    case types.FUNCTION_EXECUTION_FAILED:
      return {
        ...state,
        function_execution_loading: false,
        function_execution_succeeded: false,
        function_execution_failed: payload,
      };

    case types.RESET_FUNCTION_EXECUTION:
      return {
        ...state,
        function_execution_loading: null,
        function_execution_succeeded: null,
        function_execution_failed: null,
      };

    case types.PUBLISH_UDF_FUNCTION_REQUESTED:
      return {
        ...state,
        list: {
          ...state.list,
          list_updated: null,
        },
      };

    case types.PUBLISH_UDF_FUNCTION_SUCCEEDED:
      const index = state.list.items.findIndex(
        (fx) => fx.function_id === payload.function_id
      );
      const new_fx_list = [
        ...state.list.items.slice(0, index),
        payload,
        ...state.list.items.slice(index + 1),
      ];
      return {
        ...state,
        list: {
          items: new_fx_list,
          by_uri: byUri(new_fx_list),
          list_updated: true,
        },
      };

    case types.PUBLISH_UDF_FUNCTION_FAILED:
      return {
        ...state,
        list: {
          ...state.list,
          list_updated: null,
        },
      };

    case types.UN_PUBLISH_UDF_FUNCTION_REQUESTED:
      return {
        ...state,
        list: {
          ...state.list,
          list_updated: null,
        },
      };

    case types.UN_PUBLISH_UDF_FUNCTION_SUCCEEDED:
      const fx_index = state.list.items.findIndex(
        (fx) => fx.function_id === payload.function_id
      );
      const new_function_list = [
        ...state.list.items.slice(0, fx_index),
        payload,
        ...state.list.items.slice(fx_index + 1),
      ];
      return {
        ...state,
        list: {
          items: new_function_list,
          by_uri: byUri(new_function_list),
          list_updated: true,
        },
      };

    case types.UN_PUBLISH_UDF_FUNCTION_FAILED:
      return {
        ...state,
        list: {
          ...state.list,
          list_updated: null,
        },
      };

    case types.RENAME_UDF_REQUESTED:
      return {
        ...state,
        rename_udf_loading: true,
        rename_udf_succeeded: null,
        rename_udf_failed: null,
        list: {
          ...state.list,
          list_updated: null,
        },
      };
    case types.RENAME_UDF_SUCCEEDED:
      const renamed_functions_list = [...state.list.items];
      renamed_functions_list.forEach((fx) => {
        if (fx._links.self.href === payload.ref) {
          fx.name = payload.name;
        }
      });

      return {
        ...state,
        rename_udf_loading: null,
        rename_udf_succeeded: true,
        rename_udf_failed: false,
        list: {
          ...state.list,
          items: renamed_functions_list,
          by_uri: byUri(renamed_functions_list),
          list_updated: true,
        },
      };
    case types.RENAME_UDF_FAILED:
      return {
        ...state,
        rename_udf_loading: null,
        rename_udf_succeeded: false,
        rename_udf_failed: true,
        list: {
          ...state.list,
          list_updated: null,
        },
      };

    case types.DELETE_UDF_REQUESTED:
      return {
        ...state,
        delete_udf_loading: true,
        delete_udf_succeeded: null,
        delete_udf_failed: null,
        list: {
          ...state.list,
          list_updated: null,
        },
      };
    case types.DELETE_UDF_SUCCEEDED:
      let update_functions_list = [...state.list.items];
      update_functions_list = update_functions_list.filter(
        (fx) => fx._links.self.href !== payload
      );

      return {
        ...state,
        delete_udf_loading: null,
        delete_udf_succeeded: true,
        delete_udf_failed: false,
        list: {
          ...state.list,
          items: update_functions_list,
          by_uri: byUri(update_functions_list),
          list_updated: true,
        },
      };
    case types.DELETE_UDF_FAILED:
      return {
        ...state,
        delete_udf_loading: null,
        delete_udf_succeeded: false,
        delete_udf_failed: true,
        list: {
          ...state.list,
          list_updated: null,
        },
      };

    default:
      return state;
  }
};

export default functionsReducer;
