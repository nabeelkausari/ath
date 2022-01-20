import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import cx from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { toHM } from '../../../../utils/helpers/helperFunctions';

import useStyles from './LessonDuration.styles';

const LessonDuration = ({ content }) => {
  const styles = useStyles();
  const { instructions_by_id } = useSelector((state) => state.courses.quiz);
  const is_apply = content?.type?.toUpperCase() === 'APPLY';

  const quizQuestionsText =
    instructions_by_id &&
    instructions_by_id[content?.id] &&
    instructions_by_id[content?.id].totalQuestions !== undefined
      ? `${instructions_by_id[content?.id].totalQuestions} questions`
      : '';
  const quizAttemptsText =
    instructions_by_id && instructions_by_id[content?.id]
      ? `${instructions_by_id[content?.id].remainingAttempts} attempt/s left`
      : '';

  return (
    <>
      {content?.type === 'PDF' && (
        <Typography variant="caption" color="textSecondary">
          {toHM(content.estimated_duration_sec || 0)} read
        </Typography>
      )}
      {content?.type === 'VIDEO' && (
        <Typography variant="caption" color="textSecondary">
          {toHM(content.estimated_duration_sec || 0)}
        </Typography>
      )}
      {content?.type !== 'PDF' && content?.type !== 'VIDEO' && (
        <Box className={cx(styles.contentIconsContainer)}>
          <Typography component="div" className={styles.contentIcons}>
            <Typography
              component="span"
              variant="caption"
              color="textSecondary"
            >
              {content?.type === 'QUIZ'
                ? `${content?.details?.quizDuration / 60} min`
                : toHM(content.estimated_duration_sec || 0)}
            </Typography>
          </Typography>

          {content?.type === 'QUIZ' && quizQuestionsText && (
            <Typography component="div" className={styles.contentIcons}>
              <Typography
                component="span"
                variant="caption"
                color="textSecondary"
              >
                {quizQuestionsText}
              </Typography>
            </Typography>
          )}

          {((content?.type !== 'QUIZ' && is_apply) ||
            content?.type === 'CODING_CASE') && (
            <Typography component="div" className={styles.contentIcons}>
              <Typography
                component="span"
                variant="caption"
                color="textSecondary"
              >
                {content?.milestones?.length} milestone/s
              </Typography>
            </Typography>
          )}
          {quizAttemptsText && (
            <Typography component="div" className={styles.contentIcons}>
              <Typography
                component="span"
                variant="caption"
                color="textSecondary"
              >
                {content?.type === 'QUIZ' && `${quizAttemptsText}`}
              </Typography>
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};

export default LessonDuration;
