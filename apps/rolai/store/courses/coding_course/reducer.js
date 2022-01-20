import * as types from "./types";

const initialState = {
  fetch_case_loading: null,
  fetch_case_succeeded: null,
  fetch_case_failed: null,
  single_milestone_data_loading: null,
  single_milestone_data_succeeded: null,
  single_milestone_data_failed: null,
  mode_data_loading:null,
  mode_data_succeeded:null,
  mode_data_failed:null,
  mode_output_loading:null,
  mode_output_succeeded:null,
  mode_output_failed:null,
  get_submit_output_loading:null,
  get_submit_output_succeeded:null,
  get_submit_output_failed:null,
  get_final_submit_loading:null,
  get_final_submit_succeeded:null,
  get_final_submit_failed:null,
  compare_steps_loading:null,
  compare_steps_succeeded:null,
  compare_steps_failed:null,
  get_submit_all:null,
  compare_steps_data:{},
  result_data:{ status:'' },
  user_id:null,
  case_id: null,
  is_submit_success:false,
  is_submit_loading:false,
  updatedMode:'',
  is_milestone_submitted:false,
  lis_result_sourcedid:'',
  lis_outcome_service_url:'',
  milestone_data : {},
  is_status_running:false,
  is_reset:false,
  data_dictionary_content:'',
  ui_data_content:'',
};

const codingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_CASE_REQUESTED:
      return {
        ...state,
        fetch_case_loading: true,
        fetch_case_succeeded: null,
        fetch_case_failed: null
      };
    case types.FETCH_CASE_SUCCEEDED:
      return {
        ...state,
        fetch_case_loading: false,
        fetch_case_succeeded: true,
        fetch_case_failed: false,
        ...payload,
      };
    case types.FETCH_CASE_FAILED:
      return {
        ...state,
        fetch_case_loading: false,
        fetch_case_succeeded: false,
        fetch_case_failed: true
      };
    
    case types.SINGLE_MILESTONE_DATA_REQUESTED:
      return {
        ...state,
        single_milestone_data_loading: true,
        single_milestone_data_succeeded: null,
        single_milestone_data_failed: null
      };
    case types.SINGLE_MILESTONE_DATA_SUCCEEDED:
      const updateMileStoneList = state.milestone_details.map((milestone) => {
        return payload['milestone_id'] === milestone['milestone_id'] ? 
        {...milestone,
          score_percentage : payload['score_percentage'],
          is_milestone_submitted:payload['is_milestone_submitted'],
          sequence_id:payload['sequence_id']
        }
        : milestone;
      });
      return {
        ...state,
        single_milestone_data_loading: false,
        single_milestone_data_succeeded: true,
        single_milestone_data_failed: false,
        milestone_data:{ ...payload },
        result_data:payload['output'],
        milestone_details: updateMileStoneList,
        updatedMode : payload?.output?.output?.mode || '',
        is_status_running:false,
        is_submit_success:false,
      };
    case types.SINGLE_MILESTONE_DATA_FAILED:
      return {
        ...state,
        single_milestone_data_loading: false,
        single_milestone_data_succeeded: false,
        single_milestone_data_failed: true
      };
    case types.GET_DATA_DICTIONARY_SUCCEEDED:
      return {
        ...state,
        data_dictionary_content:payload
      };
    case types.GET_DATA_PREVIEW_SUCCEEDED:
      return {
        ...state,
        ui_data_content:payload
      };
    case types.MODE_DATA_REQUESTED:
      return {
        ...state,
        mode_data_loading:true,
        mode_data_succeeded:null,
        mode_data_failed:null,
      };
    case types.MODE_DATA_SUCCEEDED:
      return {
        ...state,
        mode_data_loading:false,
        mode_data_succeeded:true,
        mode_data_failed:false,
      };
    case types.MODE_DATA_FAILED:
      return {
        ...state,
        mode_data_loading:false,
        mode_data_succeeded:false,
        mode_data_failed:true,
      };
    case types.MODE_OUTPUT_REQUESTED:
      return {
        ...state,
        mode_output_loading:true,
        mode_output_succeeded:null,
        mode_output_failed:null,
      };
    case types.MODE_OUTPUT_SUCCEEDED:
      return {
        ...state,
        mode_output_loading:false,
        mode_output_succeeded:true,
        mode_output_failed:false,
        result_data: payload,
        is_status_running: payload?.status === "running" ? true : false
      };
    case types.MODE_OUTPUT_FAILED:
      return {
        ...state,
        mode_output_loading:false,
        mode_output_succeeded:false,
        mode_output_failed:true,
      };
    case types.GET_SUBMIT_OUTPUT_REQUESTED:
      return {
        ...state,
        get_submit_output_loading:true,
        get_submit_output_succeeded:null,
        get_submit_output_failed:null,
      };
    case types.GET_SUBMIT_OUTPUT_SUCCEEDED:
      return {
        ...state,
        get_submit_output_loading:false,
        get_submit_output_succeeded:true,
        get_submit_output_failed:false,
        result_data: payload,
        updatedMode: payload?.output?.status === 'correct' ? 'evaluate' : state.updatedMode,
        is_submit_success : payload?.['status'] !== 'running' && payload?.['output']?.['status'] !== 'correct' ? true : false,
        milestone_data:{
          ...state.milestone_data,
          is_milestone_submitted:(payload?.output?.status === 'correct' || payload?.output?.status === 'success' )? true : state.milestone_data.is_milestone_submitted
        },
        is_status_running: payload?.['status'] === 'running' ? true : false,
        is_submit_loading: payload?.['status'] === 'running' ? true : false,
      };
    case types.GET_SUBMIT_OUTPUT_FAILED:
      return {
        ...state,
        get_submit_output_loading:false,
        get_submit_output_succeeded:false,
        get_submit_output_failed:true,
      };
    case types.IS_SUBMIT_LOADING:
      return {
        ...state,
        is_submit_loading:payload
      };
    case types.IS_SUBMIT_SUCCESS:
      return {
        ...state,
        is_submit_success:payload
      };
    case types.COMPARE_STEPS_REQUESTED:
      return {
        ...state,
        compare_steps_loading:true,
        compare_steps_succeeded:null,
        compare_steps_failed:null,
      };
    case types.COMPARE_STEPS_SUCCEEDED:
      return {
        ...state,
        compare_steps_loading:false,
        compare_steps_succeeded:true,
        compare_steps_failed:false,
        compare_steps_data: payload,
      };
    case types.COMPARE_STEPS_FAILED:
      return {
        ...state,
        compare_steps_loading:false,
        compare_steps_succeeded:false,
        compare_steps_failed:true,
      };
    case types.GET_SUBMIT_ALL_REQUESTED:
      return {
        ...state,
        get_submit_all:true,
      };
    case types.GET_SUBMIT_ALL_SUCCEEDED:
      return {
        ...state,
        get_submit_all: false,
      };
    case types.GET_SUBMIT_ALL_FAILED:
      return {
        ...state,
        get_submit_all:false,
      };

    case types.CURRENT_VALUE:
      return {
        ...state,
        milestone_data: {
          ...state.milestone_data,
          [payload.key]: payload.value
        }
      };
    case types.ON_CONSOLE_EDITOR_DATA_CHANGE:
      return {
        ...state,
        milestone_data: {
          ...state.milestone_data,
          template_code: payload
        }
      };
    case types.UPDATED_MODE:
      return {
        ...state,
        updatedMode:payload
      };
    case types.UPDATE_USER_ID:
      return {
        ...state,
        user_id : payload,
      };
    case types.UPDATE_CASE_ID:
      return {
        ...state,
        case_id : payload,
      };
    default:
      return state;
  }
};
export default codingReducer;