import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import cx from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from '../../../../components/Select';
import get from 'lodash/get';

import Button from '../../../../components/Button/Button';
import useStyles from './Quiz.styles';
import QuizQuestionCard from './QuizQuestionCard/QuizQuestionCard';
import { fetchAttemptsDetails } from '../../../../store/courses/quiz/actions';
import { CardSkeletonQuiz } from './QuizWindow/QuizWindow';

const QuizAnswers = ({ minimizeView }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const {
    attempts_by_quiz_id,
    attempt_details_by_uri,
    selected_attempt_reference,
    quiz_attempts_requested,
    quiz_result_requested,
  } = useSelector((state) => state.courses.quiz);
  const { current_lesson } = useSelector((state) => state.courses);

  const attempt_details =
    Object.keys(attempt_details_by_uri).length > 0 &&
    attempt_details_by_uri[selected_attempt_reference];

  const getUserSelectedOption = (options) => {
    const option = options.find((option) => option.is_user_option);
    return option ? option.id : '';
  };

  const handleAttemptChange = ({ value }) => {
    dispatch(fetchAttemptsDetails(value));
  };
  const attempts = get(attempts_by_quiz_id[current_lesson?.id], 'attempts');
  const options =
    attempts &&
    attempts.map((item, index) => ({
      label: `Attempt ${index + 1}`,
      value: item,
    }));
  let selected_option = null;

  let selected_options =
    options &&
    options.filter(
      (option) => option.value.href === selected_attempt_reference
    );

  if (selected_options) {
    selected_option = selected_options[0];
  }
  return (
    <Box className={cx(styles.quiz)}>
      <Box className={styles.quiz_title_section}>
        <Box display="flex">
          <Box>
            <Typography
              className={styles.quiz_title_text}
              title={current_lesson?.title}
            >
              <b>Quiz Answers:</b> {current_lesson?.title}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {!quiz_attempts_requested && attempt_details?.questions?.length}{' '}
              Questions
            </Typography>
          </Box>
        </Box>
        <Box display="flex">
          <Box className={styles.scoreSection}>
            <Typography variant="body1">Total score&nbsp;</Typography>
            <Typography className={styles.userScore}>
              {!quiz_attempts_requested && attempt_details?.user_score}
            </Typography>
            /<Typography>{attempt_details?.total_score}</Typography>
          </Box>
          <Select
            value={selected_option}
            options={options}
            onChange={handleAttemptChange}
            className={styles.attempts}
          />
          <Button onClick={minimizeView}>Close</Button>
        </Box>
      </Box>
      {quiz_result_requested || quiz_attempts_requested ? (
        <Box>
          <CardSkeletonQuiz />
          <CardSkeletonQuiz />
          <CardSkeletonQuiz />
        </Box>
      ) : (
        <Box className={styles.quiz_questions_block}>
          <Box className={styles.quiz_questions}>
            <Box>
              {attempt_details &&
                attempt_details.questions
                  .sort((a, b) => a.sequence - b.sequence)
                  .map((question, index) => (
                    <QuizQuestionCard
                      key={index}
                      question={question}
                      index={index}
                      onOptionSelect={() => {}}
                      selected_option={getUserSelectedOption(question.options)}
                    />
                  ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default QuizAnswers;
