import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import cx from 'classnames';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import gfm from 'remark-gfm';

import Button from '../../../../../components/Button/Button';
import {
  getMileStoneData,
  saveCode,
} from '../../../../../store/courses/coding_course/actions';
import useStyles from './Instructions.styles';

const Instructions = ({ ...props }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { coding_course } = useSelector((state) => state.courses);
  const description = coding_course?.milestone_data?.description || '';
  const instruction = coding_course?.milestone_data?.instruction || '';
  const id = coding_course?.milestone_data?.milestone_id;
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const selectedMilestone = (e) => {
    dispatch(saveCode());
    dispatch(getMileStoneData(e?.target?.value));
  };
  return (
    <Box className={styles.instructionsSection}>
      <Box display="flex" className={styles.milestone_list}>
        <Typography variant="subtitle2" pr={1}>
          {' '}
          Milestone{' '}
        </Typography>
        {coding_course?.milestone_details?.map((milestone, i) => {
          const average =
            milestone?.is_milestone_submitted &&
            milestone?.score_percentage < 50
              ? true
              : false;
          const good =
            milestone?.is_milestone_submitted &&
            milestone?.score_percentage >= 50 &&
            milestone?.score_percentage <= 100
              ? true
              : false;
          return (
            <Button
              key={i}
              className={cx(
                styles.milestone__button,
                average && styles.average,
                good && styles.good,
                parseInt(id) === milestone['milestone_id'] && styles.active
              )}
              onClick={selectedMilestone}
              value={milestone['milestone_id']}
            >
              {milestone['sequence_id']}
            </Button>
          );
        })}
      </Box>
      <Typography variant="subtitle2">
        {' '}
        {coding_course?.milestone_data?.milestone_name}{' '}
      </Typography>
      <Collapse in={checked} collapsedSize={100}>
        <Typography component="div" className={styles.instructionsData}>
          <ReactMarkdown
            children={description}
            remarkPlugins={[[gfm, { singleTilde: false }]]}
          />
        </Typography>
      </Collapse>
      {description && (
        <Button
          variant="text"
          onClick={handleChange}
          className={styles.viewMoreBtn}
        >
          {checked ? 'View Less' : 'View More'}
        </Button>
      )}
      <Typography variant="subtitle2"> Instructions </Typography>
      <Typography component="div" className={styles.instructionsData}>
        <ReactMarkdown
          children={instruction}
          remarkPlugins={[[gfm, { singleTilde: false }]]}
        />
      </Typography>
    </Box>
  );
};

export default Instructions;
