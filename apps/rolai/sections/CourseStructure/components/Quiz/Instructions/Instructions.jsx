import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import cx from 'classnames';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Introduction } from '../../../../../common/images';
import Button from '../../../../../components/Button';
import ListData from '../../../../../components/ListData/ListData';
import ResponsiveDonut from '../../../../../components/ResponsiveDonut/ResponsiveDonut';
import {
  ACTIVE_QUIZ_ID,
  getQuizResultById,
  lockAndGetQuizResults,
} from '../../../../../store/courses/quiz/actions';
import { hideDialog, showDialog } from '../../../../../store/global/actions';
import { quiz_links } from '../../../../../utils/api/quizLinks';
import { getCookie } from '../../../../../utils/helpers/storage';
import QuizWindow from '../QuizWindow/QuizWindow';
import useStyles from './Instructions.styles';

export const hasAvailableAttempts = (instructions_by_id, quiz_id) =>
  instructions_by_id &&
  instructions_by_id[quiz_id] &&
  instructions_by_id[quiz_id].remainingAttempts > 0 &&
  instructions_by_id[quiz_id].remainingAttempts !==
    instructions_by_id[quiz_id].totalNoOfAttempts;

export const isAttemptsExhausted = (
  quiz_instructions_error,
  instructions_by_id,
  quiz_id
) =>
  (quiz_instructions_error &&
    quiz_instructions_error.quiz_id === quiz_id &&
    quiz_instructions_error.error.error_code === 'ATTEMPT_EXHAUSTED') ||
  (instructions_by_id &&
    instructions_by_id[quiz_id] &&
    instructions_by_id[quiz_id].remainingAttempts === 0);

const Instructions = ({ quiz_id }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [viewAnswers, setViewAnswers] = useState(false);
  const {
    instructions_by_id,
    abstract_quiz_results,
    quiz_instructions_error,
    active_quiz,
  } = useSelector((state) => state.courses.quiz);

  const attempts_exhausted = isAttemptsExhausted(
    quiz_instructions_error,
    instructions_by_id,
    quiz_id
  );
  const attempted = hasAvailableAttempts(instructions_by_id, quiz_id);

  useEffect(() => {
    const active_quiz_id = getCookie(ACTIVE_QUIZ_ID);
    if ((attempts_exhausted || attempted) && active_quiz_id !== quiz_id)
      dispatch(
        getQuizResultById(quiz_links.getAbstractResult(quiz_id), quiz_id)
      );
  }, [quiz_id, attempts_exhausted, attempted]);

  const proceedViewAnswers = () => {
    setViewAnswers(true);

    dispatch(
      lockAndGetQuizResults(
        quiz_links.getFinalResult(quiz_id),
        quiz_id,
        abstract_quiz_results?._links?.lock_quiz
      )
    );
  };

  const handleViewAnswers = () => {
    if (!attempts_exhausted) {
      dispatch(
        showDialog({
          options: {
            title: 'Do you want to view answers?',
            message:
              'Note: Viewing answers will lock the quiz and you cannot take this quiz later',
            yes_button: {
              text: 'Yes, View Answers & Lock the Quiz',
              onClick: proceedViewAnswers,
            },
            no_button: {
              text: 'Cancel',
              onClick: () => dispatch(hideDialog()),
            },
          },
        })
      );
    } else {
      proceedViewAnswers();
    }
  };

  if (abstract_quiz_results && abstract_quiz_results.quiz_id === quiz_id) {
    return (
      <Box className={styles.results}>
        <Typography variant="h2" className={styles.result_title}>
          Congratulations!
        </Typography>
        <Typography variant="body1" className={styles.result_message}>
          You have successfully completed quiz
        </Typography>
        <Typography variant="body1" className={styles.result_sub_title}>
          You have scored
        </Typography>
        <ResponsiveDonut
          percentage={Math.round(
            (abstract_quiz_results.user_score /
              abstract_quiz_results.total_score) *
              100
          )}
          percentageValue={`${abstract_quiz_results.user_score} / ${abstract_quiz_results.total_score}`}
        />
        <Button
          variant={attempts_exhausted ? 'contained' : 'outlined'}
          onClick={handleViewAnswers}
          className={styles.view_answers}
        >
          View Answers
        </Button>

        <QuizWindow
          minimizeView={() => setViewAnswers(false)}
          minimized={!viewAnswers}
          title="Answers"
          answersView={true}
        />
      </Box>
    );
  } else if (instructions_by_id[quiz_id]) {
    return (
      <Box className={cx(styles.instructions)}>
        <Box className={styles.instructionsIcon}>
          <Image src={Introduction} width={23} height={28} />
        </Box>
        <Box className={styles.quiz_instructions_block}>
          <Box className={styles.title}>Introduction</Box>
          <Box className={styles.quiz_instructions}>
            <ListData
              data={instructions_by_id[quiz_id].general}
              customClass={styles.list}
              isIcon={false}
              isNumber={true}
            />
          </Box>
        </Box>
      </Box>
    );
  } else if (active_quiz.active_quiz_id === quiz_id) {
    return (
      <Box p={2} textAlign="center">
        <Typography variant="h6">This quiz is running</Typography>
      </Box>
    );
  } else {
    return null;
  }
};

export default Instructions;
