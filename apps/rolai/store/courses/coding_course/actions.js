import * as types from "./types";
import axios from 'axios';
import {API_GATEWAY_URI} from "../../../utils/constants";
import { notify } from '../../../utils/helpers/notification';

const CODING_COURSE_URI = API_GATEWAY_URI +'/coding_course/';
let headers = {}; let params = {}; let case_id = '';

export const getCaseData = (caseId,body,headers) => (dispatch, getState) => {
  headers=headers; params=body; case_id=caseId;
  dispatch({ type: types.FETCH_CASE_REQUESTED });
  axios
  .get( CODING_COURSE_URI+`case/${case_id}`, params )
  .then( payload => {
    dispatch({ type: types.FETCH_CASE_SUCCEEDED, payload:payload['data'] });
    dispatch(getMileStoneData());
  })
  .catch(error => {
    notify.error(error?.message);
    dispatch({ type: types.FETCH_CASE_FAILED, error });
  });
}

export const getMileStoneData = (id) => (dispatch, getState) => {
  const { courses:{coding_course:{milestone_details, milestone_data}} } = getState();
  const milestone_id = id || milestone_details.length>0 && milestone_details[0]?.milestone_id;
  dispatch({ type: types.SINGLE_MILESTONE_DATA_REQUESTED });
  return axios
  .get( CODING_COURSE_URI+'case/'+case_id+'/milestone/'+ milestone_id, params )
  .then(payload => {
    dispatch({ type: types.SINGLE_MILESTONE_DATA_SUCCEEDED, payload: payload?.data });
    dispatch(getDataDictionary());
    dispatch(getDataPreview());
    if (payload?.data?.is_milestone_submitted) dispatch(getCompareSteps());
  })
  .catch(error => {
    notify.error(error?.message);
    dispatch({ type: types.SINGLE_MILESTONE_DATA_FAILED, error });
  });
}

export const getDataDictionary = () => (dispatch, getState) => {
  const { courses:{coding_course:{milestone_data:{ data_dictionary_path}}} } = getState();
  if(data_dictionary_path && data_dictionary_path !== ''){
    axios
    .get( data_dictionary_path )
    .then(payload => {
      dispatch({ type: types.GET_DATA_DICTIONARY_SUCCEEDED, payload:payload['data'] });
    })
    .catch(error => {
      notify.error(error?.message);
    });
  }else dispatch({ type: types.GET_DATA_DICTIONARY_SUCCEEDED, payload:''});
}

export const getDataPreview = () => (dispatch, getState) => {
  const { courses:{coding_course:{milestone_data:{ ui_data_path}}} } = getState();
  if(ui_data_path && ui_data_path !== ''){
    axios
    .get( ui_data_path )
    .then(payload => {
      dispatch({ type: types.GET_DATA_PREVIEW_SUCCEEDED, payload:payload['data'] });
    })
    .catch(error => {
      notify.error(error?.message);
    });
  }else dispatch({ type: types.GET_DATA_PREVIEW_SUCCEEDED, payload:'' });
}

export const getModeData = (mode, paramsData) => (dispatch, getState) => {
  const { courses:{coding_course:{milestone_data:{milestone_id}}} } = getState();
  dispatch({ type: types.MODE_DATA_REQUESTED });
  axios
  .post(CODING_COURSE_URI+'case/'+case_id+'/milestone/'+milestone_id+'/parse', paramsData ,{ headers : headers} )
  .then(response  => {
    dispatch({ type: types.MODE_DATA_SUCCEEDED, payload:response['data'] });
    if(response['data'].status === 'success'){
      dispatch(getModeOutput(mode,paramsData));
    }
  })
  .catch(error => {
    notify.error(error?.message);
    dispatch({ type: types.MODE_DATA_FAILED, error });
  });
}

export const getModeOutput = (mode) => (dispatch, getState) => {
  const { courses:{coding_course:{milestone_data:{milestone_id}}} } = getState();
  dispatch({ type: types.MODE_OUTPUT_REQUESTED });
  axios
  .get(CODING_COURSE_URI+'case/'+case_id+'/milestone/'+milestone_id+'/parse', params )
  .then(payload  => {
    dispatch({ type: types.MODE_OUTPUT_SUCCEEDED, payload : payload?.data });
    dispatch(UpdatedMode(mode));
    if (payload?.data?.status === 'running') {
      setTimeout(() => {
        dispatch(getModeOutput(mode));
      }, 1000);
    }
  }).catch(error => {
    notify.error(error?.message);
    dispatch({ type: types.MODE_OUTPUT_FAILED, error });
  });
}

export const ResetCode = () => (dispatch, getState) => {
  const { courses:{coding_course:{milestone_data:{milestone_id}}} } = getState();
  axios
  .delete(CODING_COURSE_URI+'case/'+case_id+'/milestone/'+milestone_id+'/parse',params)
  .then(payload  => {
    dispatch(getMileStoneData(milestone_id));
  }).catch(error => {
    notify.error(error?.message);
  });
}

export const onSubmitCode = (data) => (dispatch, getState) => {
  const { courses:{coding_course:{milestone_data:{milestone_id}}} } = getState();
  dispatch(isSubmitLoading(true));
  axios
  .post(CODING_COURSE_URI+'case/'+case_id+'/milestone/'+milestone_id+'/parse', data,{headers} )
  .then(payload  => {
    if(payload['data']['status'] === 'success') dispatch(getSubmitOutput(data));
  }).catch(error => {
    notify.error(error?.message);
    dispatch(isSubmitLoading(false));
  });
}

export const getSubmitOutput = () => (dispatch, getState) => {
  const { courses:{coding_course:{milestone_data:{milestone_id}}} } = getState();
  dispatch({ type: types.GET_SUBMIT_OUTPUT_REQUESTED });
  axios
  .get(CODING_COURSE_URI+'case/'+case_id+'/milestone/'+milestone_id+'/parse',params )
  .then(payload  => {
    dispatch({ type: types.GET_SUBMIT_OUTPUT_SUCCEEDED, payload:payload?.data });
    if (payload?.data?.status === 'running') {
      setTimeout(() => {
        dispatch(getSubmitOutput());
      }, 2000);
    }else if(payload?.data?.output?.status == 'correct' || payload?.data?.output?.status == 'success')
      dispatch(updateMileStoneStatus());
  }).catch(error => {
    dispatch({ type: types.GET_SUBMIT_OUTPUT_FAILED, error });
    dispatch(isSubmitLoading(false));
  });
}

export const updateMileStoneStatus = () => (dispatch, getState) => {
  const { courses:{coding_course:{milestone_data:{milestone_id}}} } = getState();
  dispatch(getMileStoneData(milestone_id))
  .then(() => {
    dispatch(nextMilestone());
  })
}

export const nextMilestone = () => (dispatch, getState) => {
  const { courses:{coding_course:{milestone_details,milestone_data:{ milestone_id}}} } = getState();
  let nextMileStoneId = milestone_id, previousMileStoneId = milestone_id ;
  const isNextMileStone = milestone_details.some((milestone,index,milestones) => {
    if(milestone['milestone_id'] > parseInt(milestone_id) &&
      milestone['is_milestone_submitted'] !==true )
    {
      nextMileStoneId = milestones[index]['milestone_id'];
      return true;
    }
    return false;
  });
  const isPreviousMileStone = milestone_details.some((milestone,index,milestones) => {
    if(milestone['milestone_id'] < parseInt(milestone_id) &&
      milestone['is_milestone_submitted'] !==true ){
        previousMileStoneId = milestones[index]['milestone_id'];
        return true;
    }
    return false;
  });
  if(isNextMileStone){
    dispatch(getMileStoneData(nextMileStoneId));
  }else if(isPreviousMileStone){
    dispatch(getMileStoneData(previousMileStoneId));
  }
}

export const getCompareSteps = () => (dispatch, getState) => {
  const { courses:{coding_course:{milestone_data:{ milestone_id}}} } = getState();
  dispatch({ type: types.COMPARE_STEPS_REQUESTED });
  axios
  .get(CODING_COURSE_URI+`case/${case_id}/milestone/${milestone_id}/compare`, params)
  .then(payload  => {
    dispatch({ type: types.COMPARE_STEPS_SUCCEEDED, payload:payload['data'] });
  })
  .catch(error => {
      notify.error(error?.message);
      dispatch({ type: types.COMPARE_STEPS_FAILED });
  });
}

export const saveCode = () => (dispatch, getState) => {
  const { courses:{coding_course:{milestone_data:{ milestone_id,template_code}}} } = getState();
  const payload = {
    "user_id": params?.params?.user_id,
    "mode": "save",
    "code": template_code
  };
  axios
  .post( CODING_COURSE_URI+'case/'+case_id+'/milestone/'+ milestone_id+'/parse', payload , { params:params.params })
  .then(payload => {})
  .catch(error => {
    notify.error(error?.message);
  });
}

export const submitAllMilestones = () => (dispatch) => {
  const payload ={
    user_id: params?.params?.user_id,
    mode:'evaluate'
  }
  dispatch(saveCode());
  axios
  .post(CODING_COURSE_URI+'case/'+case_id+'/submit', payload )
  .then(payload  => {
    if(payload['data']['status'] === 'success') dispatch(getsubmitAllMilestones());
  }).catch(error => {
    notify.error(error?.message);
  });
}

export const getsubmitAllMilestones = () => (dispatch) => {
  dispatch({ type: types.GET_SUBMIT_ALL_REQUESTED });
  axios
  .get(CODING_COURSE_URI+'case/'+case_id+'/submit',params, {headers} )
  .then(payload  => {
    dispatch({ type: types.GET_SUBMIT_ALL_SUCCEEDED });
    if (payload?.data?.status === 'running') {
      setTimeout(() => {
        dispatch(getsubmitAllMilestones());
      }, 2000);
    }else if(payload?.data?.status == 'completed')
      dispatch(getCaseData(case_id,params,headers));
  }).catch(error => {
    notify.error(error?.message);
    dispatch({ type: types.GET_SUBMIT_ALL_FAILED });
  });
}

export const onConsoleEditorDataChange = (data) => (dispatch) => {
  dispatch({ type: types.ON_CONSOLE_EDITOR_DATA_CHANGE,payload:data });
}

export const UpdatedMode = (mode) => (dispatch) => {
  dispatch({ type: types.UPDATED_MODE,payload:mode });
}

export const isSubmitLoading = (isLoading) => (dispatch) => {
  dispatch({ type: types.IS_SUBMIT_LOADING, payload : isLoading });
}

export const isSubmitSuccess = (isSuccess) => (dispatch) => {
  dispatch({ type: types.IS_SUBMIT_SUCCESS, payload : isSuccess });
}
