import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import cx from 'classnames';
import React from 'react';

import { CheckBoxList } from '../../../../../components/CheckBox/CheckBoxList';
import EditorView from '../../../../../components/Editor/EditorView';
import RadioGroup from '../../../../../components/Radio/radio';
import useStyles from './QuizQuestionCard.styles';

const QuizQuestionCard = ({
  selected_option,
  question,
  index,
  no_marks,
  className,
  quiz_active,
  onOptionSelect,
}) => {
  const styles = useStyles();

  const getRadioOptions = () => {
    let radio_options = [];
    question.options.forEach((option) => {
      if (quiz_active) {
        radio_options.push({
          label: option.text,
          value: option.id,
        });
      } else {
        radio_options.push({
          label: option.is_answer ? `${option.text} (CORRECT)` : option.text,
          value: option.id,
          wrong: option.is_user_option && option.is_answer === false,
          correct: !option.is_user_option && option.is_answer,
          user_selected_correct: option.is_user_option && option.is_answer,
        });
      }
    });

    return radio_options;
  };

  const handleOptionSelect = (selected_id) => {
    let option = getOption(selected_id);
    onOptionSelect(option);
  };

  const getOption = (selected_id) => {
    let answered_question = {
      question_id: question.id,
      question_type: question.question_type,
    };
    question.options.forEach((option) => {
      if (option.id === selected_id) {
        answered_question.option = option;
      }
    });
    return answered_question;
  };
  const getOptions = () => {
    if (!question.options) return null;
    switch (question.question_type) {
      case 'SINGLE_SELECT':
        return (
          <RadioGroup
            radio_list={getRadioOptions()}
            onSelect={handleOptionSelect}
            selected_id={selected_option}
          />
        );
      case 'MULTI_SELECT':
        return (
          <CheckBoxList
            checkbox_list={getRadioOptions()}
            onSelect={handleOptionSelect}
            selected_options={selected_option}
          />
        );
      default:
        return null;
    }
  };
  return (
    <Box key={index} className={styles.question_wrapper}>
      <Box className={styles.question__title_wrapper}>
        <Box className={styles.question__title}>
          <Typography className={styles.questionNumber}>{index + 1}</Typography>
          <Typography
            component="div"
            fontWeight={500}
            className={styles.question}
          >
            <EditorView content={question.text} />
          </Typography>
        </Box>
        {!no_marks && (
          <Typography
            // variant='caption'
            color="textSecondary"
            className={styles.question__marks}
          >
            {question.score} Points
          </Typography>
        )}
      </Box>
      {question.options && (
        <div className={styles.question__options_wrapper}>{getOptions()} </div>
      )}
    </Box>
  );
};

export default QuizQuestionCard;
