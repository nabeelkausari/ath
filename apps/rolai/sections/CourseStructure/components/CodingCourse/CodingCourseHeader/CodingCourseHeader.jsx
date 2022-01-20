import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import cx from 'classnames';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import { showDialog } from '../../../../../store/global/actions';
import { UpArrowIcon } from '../../../../../common/images';
import LoadingButton from '@mui/lab/LoadingButton';
import useStyles from './CodingCourseHeader.styles';
import { useDispatch, useSelector } from 'react-redux';
import MilestoneProgressDialog from '../MilestoneProgressDialog/MilestoneProgressDialog';

import { submitAllMilestones } from '../../../../../store/courses/coding_course/actions';
const CodingCourseHeader = ({ lesson, ...props }) => {
  const styles = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const { coding_course } = useSelector((state) => state.courses);
  const list = coding_course?.milestone_details;
  const submitting = coding_course?.get_submit_all;
  const submitted = list?.filter((m, i)=> { return m.is_milestone_submitted === true });

  const handleSubmitAll = () => {
    dispatch(
      showDialog({
        options: {
          title: 'Confirmation',
          message: `You have completed only ${submitted.length}/${list?.length} milestone(s). Are you sure you want to submit?`,
          yes_button: {
            text: 'Submit',
            onClick: () => {
              dispatch(submitAllMilestones());
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
  }
  return (
    <Box className={styles.header}>
      <Box display="flex">
        <Box className={styles.backIconBox}><Image src={UpArrowIcon} width={12} height={16} onClick={()=>{router?.back()}} className={styles.backIcon}/></Box>
        <Typography className={styles.header_title_text} title={coding_course?.case_name}>
          {coding_course?.case_name}
        </Typography>
      </Box>
      <Box className={styles.rightSection}>
        <MilestoneProgressDialog />
        <LoadingButton
          loading={submitting}
          variant="contained"
          onClick={handleSubmitAll}
          disabled = {submitted?.length === list?.length}
        >
          Submit
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default CodingCourseHeader;
