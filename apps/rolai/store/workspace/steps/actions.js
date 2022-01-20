import get from 'lodash/get';
import { any, flatten, keys, pathOr, values } from 'ramda';

import { fetchLink, fetchLinkAs } from '../../../utils/api/fetch';
import { getMaterialLink } from '../../../utils/api/material';
import { addIndexNumbers } from '../../../utils/helpers/helperFunctions';
import { notify } from '../../../utils/helpers/notification';
import { getWorkspaceSolveInternal } from "../actions";
// import { getScenarioDetails } from '../../../../cases/redux/actions';
// import { addUserStepForDataSets, getSolve } from '../../../redux/actions';
// import { getDatasets } from "../datasets/actions";
// import { resetCompareStep } from "./compareSteps/actions";
import * as types from './types';

export const getSteps = () => (dispatch, getState) => {
  const { solve } = getState().workspace;
  let user_steps_link = get(solve, '_links.user_steps');
  if (!user_steps_link) return console.log('steps link not found');
  dispatch({ type: types.GET_STEPS });
  return fetchLinkAs(user_steps_link)
    .then((payload) => {
      // payload.sort((a, b) => a.sequence_number - b.sequence_number);
      //
      // let steps = payload.map((step) => {
      //   if (workspace._links.create_reference_steps) {
      //     dispatch(
      //       addExpertStepMappings({
      //         step_reference: step._links.self.href,
      //         sequence_no: step.sequence_number,
      //         milestone: 1,
      //       })
      //     );
      //   }
      //
      //   // add dataset from step result to current scenario dataset
      //   //TODO need to remove below logic
      //   // dispatch(addUserStepForDataSets(step));
      //   return {
      //     ...step,
      //     from_master_run: master_run_status[workspace.solve_id] === 'INPROGRESS',
      //   };
      // });
      // let updated_steps = addIndexNumbers(steps);
      dispatch({
        type: types.GET_STEPS_SUCCESS,
        payload: payload
          .sort((a, b) => a.sequence_number - b.sequence_number)
          .filter((step) => step.status !== 'KILLED'),
      });
    })
    .catch((payload) => dispatch({ type: types.GET_STEPS_ERROR, payload }));
};

export const getSolveReferenceSteps = () => (dispatch, getState) => {
  dispatch({ type: types.FETCH_EXPERT_STEPS_REQUESTED });
  const {
    workspace: { solve },
  } = getState();
  let expert_steps_link = get(solve, '_links.expert_steps');
  if (!expert_steps_link) return console.log('expert steps link not found');
  return fetchLinkAs(expert_steps_link)
    .then((payload) => {
      payload.sort((a, b) => a.sequence_number - b.sequence_number);

      payload.forEach((step) => {
        // add dataset from step result to current scenario dataset
        //TODO need to remove below logic
        // dispatch(addUserStepForDataSets(step));
      });

      dispatch({ type: types.FETCH_EXPERT_STEPS_SUCCEEDED, payload });
    })
    .catch((payload) =>
      dispatch({ type: types.FETCH_EXPERT_STEPS_FAILED, payload })
    );
};

export const addExpertStepMappings =
  (expert_step_mapping) => (dispatch, getState) => {
    dispatch({
      type: types.ADD_EXPERT_STEP_MAPPING,
      payload: expert_step_mapping,
    });
  };

export const onMilestoneSelect =
  (step_reference, milestone) => (dispatch, getState) => {
    dispatch({
      type: types.UPDATE_EXPERT_STEP_MAPPING_MILESTONE,
      payload: { step_reference, milestone },
    });
  };

export const createReferenceSteps = () => (dispatch, getState) => {
  const {
    workspace: {
      solve,
      steps: { expert_step_mapping, list },
    },
  } = getState();
  const create_reference_step_link = solve._links.create_reference_steps;
  if (!create_reference_step_link)
    return console.log('create_reference_steps link not found');
  fetchLink(create_reference_step_link, expert_step_mapping)
    .then(() => {
      // dispatch(getSolve());
      dispatch(getSolveReferenceSteps());
      notify.success('Success', 'Reference steps have been created');
    })
    .catch((reason) => {
      notify.error('Something went wrong', reason.message);
    });
};
export const deleteReferenceSteps = () => (dispatch, getState) => {
  const {
    workspace: { solve },
  } = getState();
  const delete_reference_step_link = solve._links.delete_reference_steps;
  if (!delete_reference_step_link)
    return console.log('delete_reference_steps link not found');
  fetchLink(delete_reference_step_link)
    .then(() => {
      dispatch(getWorkspaceSolveInternal(false));
      notify.success('Success', 'Deleted the reference steps');
    })
    .catch((reason) => {
      notify.error('Something went wrong', reason.message);
    });
};

export const getPreviousStep = (execution_step) => (dispatch, getState) => {
  const {
    workspace: {
      steps: { list },
    },
  } = getState();
  dispatch({ type: types.PREVIOUS_STEP_REQUESTED });
  let link = get(execution_step, 'previous._links.result');
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.PREVIOUS_STEP_SUCCEEDED,
        payload: { previous: payload, current: execution_step },
      });
      if (!execution_step.is_error) {
        dispatch(
          addExpertStepMappings({
            step_reference: execution_step._links.self.href,
            sequence_no: execution_step.sequence_number,
            milestone: 1,
          })
        );
        notify.success(`Step ${list.length - 1} Executed`);
      } else {
        notify.error(`Step ${list.length - 1} (Error)`);
      }
    })
    .catch((payload) => {
      dispatch({ type: types.PREVIOUS_STEP_FAILED, payload });
      notify.error('Something went wrong', payload.message);
    });
};

export const initialExecutionStatusCheck = () => (dispatch, getState) => {
  dispatch({ type: types.INITIAL_EXECUTION_CHECK_REQUESTED });
  const {
    workspace: {
      steps: { list },
      functions: { executed_step },
    },
  } = getState();
  return fetchLinkAs(executed_step?._links?.result)
    .then((payload) => {
      let step = { ...payload, index_number: list.length };
      dispatch({
        type: types.INITIAL_EXECUTION_CHECK_SUCCEEDED,
        payload: step,
      });
    })
    .catch((payload) => {
      dispatch({ type: types.INITIAL_EXECUTION_CHECK_FAILED, payload });
      notify.error('Something went wrong', payload.message);
    });
};

export const killExec = (step) => (dispatch, getState) => {
  dispatch({
    type: types.KILL_EXECUTION_REQUESTED,
    payload: step._links.self.href,
  });
  fetchLink(step._links.kill)
    .then(() => {
      dispatch({
        type: types.KILL_EXECUTION_SUCCEEDED,
        payload: step._links.self.href,
      });
    })
    .catch((reason) => {
      console.log(reason);
    });
};

export const stepExecutionStatusCheck = (step) => (dispatch, getState) => {
  const {
    workspace: {
      steps: { killed_step_id },
    },
  } = getState();
  dispatch({ type: types.STEP_EXECUTION_CHECK_REQUESTED });
  let link = get(step, '_links.self');
  return fetchLinkAs(link)
    .then((payload) => {
      if (
        killed_step_id &&
        payload.status === 'KILLED' &&
        killed_step_id === payload._links.self.href
      ) {
        dispatch({ type: types.EXECUTION_KILLED });
      }
      dispatch({ type: types.STEP_EXECUTION_CHECK_SUCCEEDED, payload });
    })
    .catch((payload) => {
      dispatch({ type: types.STEP_EXECUTION_CHECK_FAILED, payload });
      notify.error('Something went wrong', payload.message);
    });
};

export const undoStep = (link) => (dispatch, getState) => {
  const {
    workspace: { solve },
  } = getState();
  dispatch({ type: types.UNDO_REQUESTED });
  fetchLink(link)
    .then(() => fetchLinkAs(solve._links.user_steps))
    .then((payload) => {
      // dispatch(getDatasets());
      payload.sort((a, b) => a.sequence_number - b.sequence_number);
      let steps = addIndexNumbers(payload);
      dispatch({ type: types.UNDO_SUCCEEDED, payload: steps });
    })
    .catch((payload) => {
      dispatch({ type: types.UNDO_FAILED, payload });
      notify.error(payload.message);
    });
};

export const redoStep = (link) => (dispatch, getState) => {
  const {
    workspace: { solve },
  } = getState();
  dispatch({ type: types.REDO_REQUESTED });
  fetchLink(link)
    .then(() => fetchLinkAs(solve._links.user_steps))
    .then((payload) => {
      // dispatch(getDatasets());
      payload.sort((a, b) => a.sequence_number - b.sequence_number);
      let steps = addIndexNumbers(payload);
      dispatch({ type: types.REDO_SUCCEEDED, payload: steps });
    })
    .catch((payload) => {
      dispatch({ type: types.REDO_FAILED, payload });
      notify.error(payload.message);
    });
};

export const reset = () => (dispatch, getState) => {
  const {
    workspace: { solve },
  } = getState();
  const reset_links = get(solve, '_links.reset');
  if (!reset_links) return console.log('reset link not found');
  dispatch({ type: types.RESET_REQUESTED });
  dispatch(resetFlyouts());
  fetchLink(reset_links)
    .then(() => {
      // dispatch(getScenarioDetails());
    })
    .then(() => {
      dispatch({ type: types.RESET_SUCCEEDED });
      dispatch(getSteps());
      // dispatch(getDatasets());
    })
    .catch((payload) => {
      dispatch({ type: types.RESET_FAILED, payload });
      notify.error(payload.message);
    });
};

export const rollback = (link) => (dispatch) => {
  dispatch({ type: types.ROLLBACK_REQUESTED });
  fetchLink(link)
    .then(() => {
      dispatch({ type: types.ROLLBACK_SUCCEEDED });
      dispatch(getSteps());
    })
    .catch((payload) => {
      dispatch({ type: types.ROLLBACK_FAILED, payload });
      notify.error(payload.message);
    });
};

export const getResultsError = (payload) => (dispatch, getState) => {
  dispatch({ type: types.FETCH_RESULTS_ERR0R_REQUESTED });
  const headers = new Headers();
  fetch(payload, { method: 'GET', headers }).then((response) => {
    console.log('RESPONSE', response);
  })``;
};

export const setCurrentStep = (step) => (dispatch, getState) => {
  const {
    workspace: {
      solve,
      functions,
      steps: {
        flyout: { primary },
      },
    },
  } = getState();
  const is_primary_open =
    primary.is_open && Object.keys(primary.step).length !== 0;
  const is_not_duplicate_step =
    get(primary, 'step._links.self.href') !== get(step, '_links.self.href');
  const is_full_screen = primary.is_full_screen;

  var function_url = '';
  if (step.functionId.includes('UDF')) {
    function_url = '';
  } else {
    function_url = functions.list.by_uri['/functions/' + step.functionId];
  }
  const selected_hrefs = keys(step.selections);
  const isDataSetSelected = (dataSetHref) =>
    any(
      (selected_href) => dataSetHref.indexOf(selected_href) >= 0,
      selected_hrefs
    );
  const table_names = solve.data_sets
    .filter((ds) =>
      isDataSetSelected(pathOr('', ['_links', 'self', 'href'], ds))
    )
    .filter((ds) =>
      step.selections[ds._links.self.href] !== undefined
        ? step.selections[ds._links.self.href].length !== 0
        : step.selections[ds.path] !== undefined
        ? step.selections[ds.path].length !== 0
        : false
    )
    .map((ds) => ds);

  if (is_full_screen) {
    dispatch({ type: types.CLOSE_FLYOUT_FULLSCREEN });
  }

  if (is_primary_open && is_not_duplicate_step) {
    dispatch({ type: types.SET_PREVIOUS_STEP });
  }

  dispatch({
    type: types.SET_CURRENT_STEP,
    payload: {
      step: {
        ...step,
        data_set_names: table_names,
        function_url: function_url,
      },
    },
  });
};

export const handleOutputFlyoutTabSelect =
  (view, index) => (dispatch, getState) => {
    dispatch({ type: types.SET_CURRENT_FLYOUT_TAB, payload: { view, index } });
  };

export const toggleOutputAccordion = (is_secondary) => (dispatch, getState) => {
  let flyout_index = is_secondary ? 'secondary' : 'primary';
  dispatch({
    type: types.TOGGLE_OUTPUT_ACCORDION,
    payload: { flyout_index: flyout_index },
  });
};

export const setCurrentTab = (payload) => (dispatch, getState) => {
  dispatch(setCurrentStep({ step: payload.step, case_id: payload.case_id }));
  dispatch({
    type: types.SET_CURRENT_FLYOUT_TAB,
    payload: { view: payload.key, index: 'primary' },
  });
};

export const hideFlyout = (close_secondary) => (dispatch, getState) => {
  const {
    workspace: {
      steps: {
        flyout: { secondary },
      },
    },
  } = getState();
  if (close_secondary) {
    dispatch({ type: types.CLOSE_FLYOUT_SECONDARY });
  } else if (secondary.is_open && !close_secondary) {
    dispatch({ type: types.SET_SECONDARY_STEP_AS_PRIMARY });
    dispatch({ type: types.CLOSE_FLYOUT_SECONDARY });
  } else {
    dispatch({ type: types.CLOSE_FLYOUT_PRIMARY });
  }
};

export const resetFlyouts = () => (dispatch, getState) => {
  dispatch({ type: types.CLOSE_FLYOUT_SECONDARY });
  dispatch({ type: types.CLOSE_FLYOUT_PRIMARY });
};

export const fetchUserCode = (step, secondary) => (dispatch) => {
  const flyout = secondary ? 'secondary' : 'primary';
  dispatch({ type: types.FETCH_USER_CODE_REQUESTED, payload: { flyout } });
  fetchLinkAs({
    href: step._links.get_step_user_code.href,
    method: 'GET',
    type: 'application/json',
  })
    .then((result) =>
      dispatch({
        type: types.FETCH_USER_CODE_SUCCEEDED,
        payload: { result, flyout },
      })
    )
    .catch((error) =>
      dispatch({
        type: types.FETCH_USER_CODE_FAILED,
        payload: { error, flyout },
      })
    );
};

export const fetchUserLearnR = (step, secondary) => (dispatch) => {
  const flyout = secondary ? 'secondary' : 'primary';
  dispatch({ type: types.FETCH_USER_R_CODE_REQUESTED, payload: { flyout } });
  fetchLinkAs({
    href: step._links.get_step_user_learn_r_code.href,
    method: 'GET',
    type: 'application/json',
  })
    .then((result) =>
      dispatch({
        type: types.FETCH_USER_R_CODE_SUCCEEDED,
        payload: { result, flyout },
      })
    )
    .catch((error) =>
      dispatch({
        type: types.FETCH_USER_R_CODE_FAILED,
        payload: { error, flyout },
      })
    );
};

export const fetchUserLearnPython = (step, secondary) => (dispatch) => {
  const flyout = secondary ? 'secondary' : 'primary';
  dispatch({
    type: types.FETCH_USER_PYTHON_CODE_REQUESTED,
    payload: { flyout },
  });
  fetchLinkAs({
    href: step._links.get_step_user_learn_python_code.href,
    method: 'GET',
    type: 'application/json',
  })
    .then((result) =>
      dispatch({
        type: types.FETCH_USER_PYTHON_CODE_SUCCEEDED,
        payload: { result, flyout },
      })
    )
    .catch((error) =>
      dispatch({
        type: types.FETCH_USER_PYTHON_CODE_FAILED,
        payload: { error, flyout },
      })
    );
};

export const getStepNote = (step, index) => (dispatch) => {
  dispatch({ type: types.FETCH_NOTES_REQUESTED, payload: { index } });
  fetchLinkAs(step._links.get_step_note)
    .then((payload) =>
      dispatch({
        type: types.FETCH_NOTES_SUCCEEDED,
        payload: { ...payload, index },
      })
    )
    .catch((payload) =>
      dispatch({
        type: types.FETCH_NOTES_FAILED,
        payload: { ...payload, index },
      })
    );
};

export const handleSave =
  (current_step, payload, callback, type) => (dispatch, getState) => {
    fetchLink(current_step._links.save_step_note, payload)
      .then(() => {
        if (callback) callback();
        dispatch(getStepNote(current_step, type));
      })
      .catch((payload) => console.log(payload));
  };

export const setFlyoutFullScreen = (index) => (dispatch, getState) => {
  const {
    workspace: {
      steps: {
        flyout: {
          primary: { is_full_screen },
        },
      },
    },
  } = getState();

  if (is_full_screen) {
    dispatch({ type: types.CLOSE_FLYOUT_FULLSCREEN });
  } else {
    if (index === 'secondary') {
      dispatch({ type: types.SET_SECONDARY_STEP_AS_PRIMARY });
    }
    dispatch({ type: types.CLOSE_FLYOUT_SECONDARY });
    dispatch({ type: types.SET_FLYOUT_FULLSCREEN });
  }
};

export const showStepDetails = (type) => (dispatch, getState) => {
  dispatch(resetFlyouts());
  dispatch({ type: types.SHOW_STEP_DETAILS, payload: type });
};
export const hideStepDetails = (is_secondary) => (dispatch, getState) => {
  dispatch({ type: types.HIDE_STEP_DETAILS, payload: { is_secondary } });
};
export const toggleStepDetailsFullscreen =
  (is_secondary) => (dispatch, getState) => {
    dispatch({ type: types.TOGGLE_FULL_SCREEN, payload: { is_secondary } });
  };

export const getFunctionDesc =
  (function_url, is_secondary) => (dispatch, getState) => {
    if (function_url) {
      let flyout_index = is_secondary ? 'secondary' : 'primary';
      dispatch({ type: types.FETCH_FUNCTION_DESC_REQUESTED });
      fetchLinkAs(getMaterialLink(function_url._links.material.href))
        .then((response) => {
          dispatch({
            type: types.FETCH_FUNCTION_DESC_SUCCEEDED,
            payload: { desc: response, flyout_index: flyout_index },
          });
        })
        .catch((response) => {
          dispatch({
            type: types.FETCH_FUNCTION_DESC_FAILED,
            payload: response,
          });
        });
    }
  };

export const postComment =
  (link, comment, recipients, is_secondary) => (dispatch, getState) => {
    let flyout_index = is_secondary ? 'secondary' : 'primary';
    dispatch({ type: types.NEW_COMMENT_POST_REQUESTED });
    fetchLinkAs(link, { comment, recipients })
      .then((payload) => {
        dispatch({
          type: types.NEW_COMMENT_POST_SUCCEEDED,
          payload: { ...payload, flyout_index },
        });
      })
      .catch((error) => {
        dispatch({ type: types.NEW_COMMENT_POST_FAILED });
        notify.error('Comment Post Failed');
      });
  };

export const postReply =
  (link, comment, recipients, is_secondary, discussion_index) =>
  (dispatch, getState) => {
    let flyout_index = is_secondary ? 'secondary' : 'primary';
    dispatch({ type: types.NEW_REPLY_POST_REQUESTED });
    fetchLinkAs(link, { comment, recipients })
      .then((payload) => {
        dispatch({
          type: types.NEW_REPLY_POST_SUCCEEDED,
          payload: { ...payload, flyout_index, discussion_index },
        });
      })
      .catch((error) => {
        dispatch({ type: types.NEW_REPLY_POST_FAILED });
        notify.error('Comment Post Failed');
      });
  };

export const deleteReply =
  (link, is_secondary, discussion_index, reply_index) =>
  (dispatch, getState) => {
    let flyout_index = is_secondary ? 'secondary' : 'primary';
    dispatch({ type: types.REPLY_DELETE_REQUESTED });
    fetchLink(link)
      .then(() => {
        dispatch({
          type: types.REPLY_DELETE_SUCCEEDED,
          payload: { flyout_index, discussion_index, reply_index },
        });
      })
      .catch((error) => {
        dispatch({ type: types.REPLY_DELETE_FAILED });
        notify.error('Reply Delete Failed');
      });
  };

export const deleteDiscussion =
  (link, is_secondary, discussion_index) => (dispatch, getState) => {
    let flyout_index = is_secondary ? 'secondary' : 'primary';
    dispatch({ type: types.COMMENT_DELETE_REQUESTED });
    fetchLink(link)
      .then(() => {
        dispatch({
          type: types.COMMENT_DELETE_SUCCEEDED,
          payload: { flyout_index, discussion_index },
        });
      })
      .catch((error) => {
        dispatch({ type: types.COMMENT_DELETE_FAILED });
        notify.error('Comment Delete Failed', error);
      });
  };

export const getComments = (link, is_secondary) => (dispatch, getState) => {
  let flyout_index = is_secondary ? 'secondary' : 'primary';
  dispatch({ type: types.FETCH_COMMENTS_REQUESTED });
  fetchLinkAs(link)
    .then((response) => {
      dispatch({
        type: types.FETCH_COMMENTS_SUCCEEDED,
        payload: { comments: response, flyout_index: flyout_index },
      });
    })
    .catch((error) => console.log(error));
};
export const resetSteps = () => (dispatch, getState) => {
  dispatch({ type: types.RESET_STEPS });
  // dispatch(resetCompareStep());
};
