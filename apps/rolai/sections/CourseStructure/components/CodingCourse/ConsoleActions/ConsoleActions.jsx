import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Button from '../../../../../components/Button/Button';
import useStyles from './ConsoleActions.styles';
import { showDialog } from '../../../../../store/global/actions';
import LoadingButton from '@mui/lab/LoadingButton';
import CompareSteps from '../CompareSteps/CompareSteps';
import {getModeData,
        UpdatedMode,
        onSubmitCode,
        isSubmitSuccess,
} from '../../../../../store/courses/coding_course/actions';
import { Typography } from '@mui/material';

const ConsoleActions = ({}) => {
  const styles = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const { coding_course } = useSelector((state) => state.courses);
  const data = coding_course?.milestone_data;
  const evaluate_msg = <Typography pb={1}>Your submission did not met the requirement,<br/> Are you sure you want to submit the code?</Typography>

  useEffect(() => {
    if (coding_course?.get_submit_output_succeeded && coding_course?.is_submit_success && coding_course?.updatedMode === 'evaluate') {
      dispatch(
        showDialog({
          options: {
            title: 'Confirmation',
            message: evaluate_msg,
            yes_button: {
              text: 'Continue',
              onClick: () => {
                updateMode('submit');
                return true;
              },
            },
            no_button: {
              text: 'Close',
              onClick: () => dispatch(isSubmitSuccess(false)),
            },
            items_centered: true,
          },
        })
      );
    }
  }, [coding_course?.get_submit_output_succeeded, coding_course?.is_submit_success]);

  const updateMode = (mode) => {
    const modeData = {
      case_id:data?.case_id,
      milestone_id:data?.milestone_id,
      user_id:router?.query?.user_id,
      mode:mode,
      code:data?.template_code
    }
    const show_code_msg = <Typography pb={1}>You will lose on the scoring if you see the answer,<br/> Are you sure you want to see the code?</Typography>
    if(mode === "show_code"){
      dispatch(
        showDialog({
          options: {
            title: 'Confirmation',
            message: show_code_msg,
            yes_button: {
              text: 'Continue',
              onClick: () => {
                dispatch(getModeData(mode, modeData));
                return true;
              },
            },
            no_button: {
              text: 'Close',
            },
            items_centered: true,
          },
        })
      );
    }else if (mode === "evaluate" || mode === "submit"){
      dispatch(isSubmitSuccess(false));
      dispatch(UpdatedMode(mode));
      dispatch(onSubmitCode(modeData));
    }else{
      dispatch(getModeData(mode, modeData));
    }
  }

  const handleCompareSteps = () => {
    dispatch(
      showDialog({
        options: {
          title: 'Compare Steps',
          component: CompareSteps,
          no_button: {
            text: 'Close',
          },
          fullScreen:true,
        }
      })
    );
  }
  return (
    <Box className={styles.ActionsWrapper}>
      <Box>
        <Button
          onClick={() => updateMode("hint")}
        >
          Show Hint
        </Button>
        <Button
          onClick={() => updateMode("run")}
          style={{marginLeft:'12px'}}
        >
          Run
        </Button>
      </Box>
      <Box>
          <Button
            variant="text"
            onClick={() => data?.is_milestone_submitted ? handleCompareSteps() :  updateMode("show_code") }
          >
            {data?.is_milestone_submitted ? "Show Solution" : "Show Code"}
          </Button>
        <LoadingButton
          loading={coding_course?.is_submit_loading}
          variant="outlined"
          onClick={()=> updateMode('evaluate') }
          disabled = {data?.is_milestone_submitted || coding_course?.is_submit_loading}
        >
          <span> Submit Milestone {data?.sequence_id || ''} </span>
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default ConsoleActions;
