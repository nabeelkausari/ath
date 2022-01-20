import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import cx from 'classnames';
import React from 'react';

import Quiz from '../Quiz';
import QuizAnswers from '../QuizAnswers';

const QuizWindow = ({
  minimized,
  active_quiz_id,
  minimizeView,
  title,
  answersView = false,
}) => {
  return (
    <Box
      className={cx('quiz-bar__quiz', {
        'quiz-bar__quiz--visible': !minimized,
      })}
    >
      {answersView ? (
        <QuizAnswers minimizeView={minimizeView} title="Quiz Answers" />
      ) : (
        <Quiz
          minimizeView={minimizeView}
          quiz_id={active_quiz_id}
          title={title}
          answersView={answersView}
        />
      )}
    </Box>
  );
};
export default QuizWindow;

export const CardSkeletonQuiz = () => {
  return (
    <Box margin={4}>
      <Skeleton
        variant="rectangular"
        style={{ margin: '10px' }}
        // width={'100%'}
        height={50}
      />
      <Skeleton
        variant="rectangular"
        style={{ margin: '10px' }}
        // width={'100%'}
        height={200}
      />
    </Box>
  );
};
