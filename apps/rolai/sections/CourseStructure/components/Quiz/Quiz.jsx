import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import cx from 'classnames';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EstimatedTimeIcon, MinimizeIcon } from '../../../../common/images';
import Button from '../../../../components/Button/Button';
import ProgressBar from '../../../../components/ProgressBar/ProgressBar';
import {
  ACTIVE_QUIZ_ID,
  checkForActiveQuiz,
  getQuizQuestions,
  selectOptionForQuestion,
  selectOptionInternal,
  submitQuiz,
  timerStart,
  timerStop,
} from '../../../../store/courses/quiz/actions';
import { quiz_links } from '../../../../utils/api/quizLinks';
import {
  getMinutesLeft,
  getQuizProgressValue,
  getSecondsLeft,
} from '../../../../utils/helpers/quiz';
import { getCookie } from '../../../../utils/helpers/storage';
import useStyles from './Quiz.styles';
import QuizQuestionCard from './QuizQuestionCard/QuizQuestionCard';
import { CardSkeletonQuiz } from './QuizWindow/QuizWindow';

const Quiz = ({ minimizeView, title }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { active_quiz, time_left, quiz_over, quiz_questions_requested } =
    useSelector((state) => state.courses.quiz);

  const handleSubmit = () => {
    let resLink = quiz_links.getAbstractResult(active_quiz.id);
    dispatch(submitQuiz(active_quiz._links.submit, resLink, active_quiz.id));
    dispatch(timerStop());
  };

  useEffect(() => {
    if (time_left === 0) {
      handleSubmit();
    }
  }, [time_left]);

  const onOptionSelect = (answered_question) => {
    dispatch(
      selectOptionInternal(
        answered_question.question_id,
        answered_question.option.id,
        answered_question.question_type
      )
    );
    dispatch(
      selectOptionForQuestion(
        answered_question.option._links.answer_all_type,
        answered_question.question_id
      )
    );
  };

  const minutes_left = getMinutesLeft(time_left);
  const seconds_left = getSecondsLeft(time_left);

  return (
    <Box className={cx(styles.quiz)}>
      {!quiz_over && (
        <>
          <Box className={styles.quiz_title_section}>
            <Box display="flex">
              <Box>
                <Typography className={styles.quiz_title_text} title={title}>
                  {title}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {active_quiz?.questions?.length} Questions
                </Typography>
              </Box>
              <Box className={styles.expand_button} onClick={minimizeView}>
                <Image src={MinimizeIcon} width={15} height={15} />
              </Box>
            </Box>
            <Box>
              <Button onClick={minimizeView} variant="text">
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </Box>
          </Box>
          <Box className={styles.quiz_questions_block}>
            <Box className={styles.quiz_questions}>
              <Box className={styles.quiz__header}>
                <Box className={styles.quiz__header_info_wrapper}>
                  <Box className={styles.quiz__title}>
                    Quiz
                    <Typography
                      className={styles.total_points}
                      component="span"
                    >
                      Total Points{' '}
                      <Typography
                        className={styles.total_points_count}
                        component="span"
                      >
                        {active_quiz?.total_score}
                      </Typography>
                    </Typography>
                  </Box>
                  <Box className={styles.timeContainer}>
                    <Box className={styles.clockWrapper}>
                      <Image src={EstimatedTimeIcon} width={17} height={17} />
                    </Box>
                    <Box pl={1}>
                      <Typography variant="caption" color="textSecondary">
                        Time Left
                      </Typography>
                      <Typography variant="subtitle2">
                        {minutes_left}m : {seconds_left}s{' '}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <ProgressBar
                  isText={false}
                  value={getQuizProgressValue(time_left, active_quiz.duration)}
                />
              </Box>
              {quiz_questions_requested ? (
                <Box>
                  <CardSkeletonQuiz />
                  <CardSkeletonQuiz />
                  <CardSkeletonQuiz />
                </Box>
              ) : (
                <Box>
                  {active_quiz?.id &&
                    active_quiz.questions.map((question, index) => (
                      <QuizQuestionCard
                        key={index}
                        question={question}
                        index={index}
                        onOptionSelect={onOptionSelect}
                        selected_option={
                          active_quiz?.selected_options[question.id]
                        }
                      />
                    ))}
                </Box>
              )}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Quiz;
