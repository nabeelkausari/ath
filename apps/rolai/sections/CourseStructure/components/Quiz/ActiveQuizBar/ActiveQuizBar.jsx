import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import React, { Component } from 'react';
import { useSelector } from 'react-redux';

import {
  EstimatedTimeIconWhite,
  MaximizeIcon,
} from '../../../../../common/images';
import ProgressBar from '../../../../../components/ProgressBar/ProgressBar';
import {
  getMinutesLeft,
  getQuizProgressValue,
  getSecondsLeft,
} from '../../../../../utils/helpers/quiz';
import QuizWindow from '../QuizWindow/QuizWindow';

const QuizBar = ({ minimizeView, minimized }) => {
  const { time_left, active_quiz } = useSelector((state) => state.courses.quiz);

  const minutes_left = getMinutesLeft(time_left);
  const seconds_left = getSecondsLeft(time_left);
  return (
    <Box className="quiz-bar">
      <Box className="quiz-bar__wrapper">
        <Box>
          <Box className="quiz-bar__info-wrapper">
            <Box className="quiz-bar__title">Quiz</Box>
            <Box className="quiz-bar__sub_title">
              <Typography variant="caption" className="progress_text">
                Progress
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {active_quiz?.selected_options
                  ? Object.keys(active_quiz.selected_options).length
                  : 0}
                /{active_quiz?.questions?.length}
              </Typography>
            </Box>
          </Box>
          <ProgressBar
            value={getQuizProgressValue(time_left, active_quiz.duration)}
            isText={false}
          />
        </Box>
        <Box className="quiz-bar__action-wrapper">
          {minimized && (
            <Box className="quiz-bar__time_container">
              <Box className="quiz-bar__clock-wrapper">
                <Image src={EstimatedTimeIconWhite} width={17} height={17} />
              </Box>
              <Box pl={1} className="quiz-bar__time_left">
                <Typography variant="caption">Time Left</Typography>
                <Typography variant="subtitle2">
                  {' '}
                  {minutes_left}m : {seconds_left}s{' '}
                </Typography>
              </Box>
            </Box>
          )}
          <Box className="expand_button" onClick={minimizeView}>
            <Image src={MaximizeIcon} width={15} height={15} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

class ActiveQuizBar extends Component {
  state = {
    pos1: 0,
    pos2: 0,
    pos3: 0,
    pos4: 0,
    top: '85%',
    right: '2rem',
  };
  quiz_bar;
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { pos1, pos2 } = this.state;
    var rt = window.innerWidth - this.quiz_bar.getBoundingClientRect().right;
    let posCondition =
      this.quiz_bar.offsetTop - pos2 > 1 &&
      rt + pos1 > 1 &&
      this.quiz_bar.offsetTop - pos2 <
        window.innerHeight - this.quiz_bar.offsetHeight &&
      rt + pos1 < window.innerWidth - this.quiz_bar.offsetWidth;
    console.log(
      // this.quiz_bar.offsetTop,
      // rt,
      // pos1,
      // pos2,
      // window.innerHeight,
      rt + pos1,
      window.innerWidth,
      this.quiz_bar.offsetWidth,
      posCondition
    );
    if ((pos1 !== prevState.pos1 || pos2 !== prevState.pos2) && posCondition) {
      this.setState({
        top: this.quiz_bar.offsetTop - pos2 + 'px',
        right: rt + pos1 + 'px',
      });
    }
  }

  getProgressWidth = () => {
    const { time_left, active_quiz } = this.props;
    if (!active_quiz) return;
    let progress =
      (
        ((active_quiz.duration - time_left) / active_quiz.duration) *
        100
      ).toString() + '%';
    return progress;
  };

  dragMouseDown = (e) => {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    this.setState({ pos3: e.clientX, pos4: e.clientY });
    document.onmouseup = this.closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = this.elementDrag;
  };

  elementDrag = (e) => {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    this.setState((state) => ({
      pos1: state.pos3 - e.clientX,
      pos2: state.pos4 - e.clientY,
      pos3: e.clientX,
      pos4: e.clientY,
    }));
  };

  closeDragElement = () => {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  };

  render() {
    const { top, right } = this.state;
    const { minimizeView, active_quiz_id, minimized, title } = this.props;
    if (!active_quiz_id) return null;
    return (
      <Box
        className="quiz-bar-container"
        ref={(elem) => (this.quiz_bar = elem)}
        onMouseDown={this.dragMouseDown}
        style={{ top, right }}
      >
        <QuizWindow
          active_quiz_id={active_quiz_id}
          minimized={minimized}
          minimizeView={minimizeView}
          title={title}
        />
        <QuizBar {...this.props} />
      </Box>
    );
  }
}

export default ActiveQuizBar;
