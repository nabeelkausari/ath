import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBack from '@mui/icons-material/ArrowBack';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showDialog } from '../../../../../store/global/actions';
import { submitApply } from '../../../../../store/workspace/actions';
import CourseMilestoneProgressDialog from '../CourseMilestoneProgressDialog/CourseMilestoneProgressDialog';
import useStyles from './WorkspaceHeader.styles';

const WorkspaceHeader = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { current_lesson } = useSelector((state) => state.courses);
  const { project } = useSelector((state) => state.cases);
  const { solve } = useSelector((state) => state.workspace);

  const is_case = router?.query?.project_id !== undefined;
  const is_apply = current_lesson?.type?.toUpperCase() === 'APPLY';
  const title = is_case ? project?.name : current_lesson?.title;

  const handleSubmit = () => {
    dispatch(
      showDialog({
        options: {
          title: 'Confirmation',
          message: `Your score for this lesson will be frozen 
                  ${
                    is_apply && current_lesson?.milestones?.length
                      ? ' and all milestones will be submitted'
                      : ''
                  } once you submit`,
          yes_button: {
            text:
              is_apply && current_lesson?.milestones?.length
                ? 'Submit All Milestones'
                : 'Submit',
            onClick: () => {
              dispatch(submitApply());
              return true;
            },
          },
          no_button: {
            text: "Don't Submit",
          },
          items_centered: true,
        },
      })
    );
  };

  return (
    <Box className={styles.header}>
      <Box display="flex">
        <ArrowBack
          onClick={() => router.back()}
          color="#5064E3"
          className={styles.backIcon}
        />
        <Typography className={styles.header_title_text} title={title}>
          {title}
        </Typography>
      </Box>
      {!is_case && (
        <Box className={styles.rightSection}>
          {is_apply && <CourseMilestoneProgressDialog />}
          <LoadingButton
            // loading={submitting}
            variant="contained"
            onClick={handleSubmit}
            disabled={!solve?._links?.submit}
          >
            Submit
          </LoadingButton>
        </Box>
      )}
    </Box>
  );
};

export default WorkspaceHeader;
