import { Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import cx from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  BookmarkActiveIcon,
  BookmarkIcon,
  NoteIcon,
} from '../../../../common/images';
import Button from '../../../../components/Button/Button';
import MilestoneProgress from '../../../../components/MilestoneProgress/MilestoneProgress';
import {
  getSavedLessons,
  saveLesson,
  toggleCourseNotesPopup,
  undoSavedLesson,
} from '../../../../store/courses/actions';
import {
  handleCodingCase,
  markModuleContentAsViewed,
} from '../../../../store/courses/actions';
import {
  setActiveQuiz,
  setManualAttemptsUpdateRequired,
} from '../../../../store/courses/quiz/actions';
import { showDialog } from '../../../../store/global/actions';
import { fetchLinkAs } from '../../../../utils/api/fetch';
import { notify } from '../../../../utils/helpers/notification';
import LessonDuration from '../LessonDuration/LessonDuration';
import { hasAvailableAttempts } from '../Quiz/Instructions/Instructions';
import useStyles from './LessonHeader.styles';

const LessonHeader = ({}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [showPrimaryAction, setShowPrimaryAction] = useState(true);
  const [saved, setSaved] = useState(false);
  const router = useRouter();
  const { query } = router;

  const { current_lesson: lesson, saved_lessons } = useSelector(
    (state) => state.courses
  );
  const { instructions_by_id, active_quiz } = useSelector(
    (state) => state.courses.quiz
  );

  useEffect(() => {
    dispatch(getSavedLessons(query.course_id));
  }, []);

  useEffect(() => {
    setSaved(saved_lessons.find((i) => i.module_seq_id === query.seq_id));
  }, [saved_lessons, query.seq_id]);

  useEffect(() => {
    let _showPrimaryAction = true;
    if (lesson.type === 'QUIZ') {
      if (
        (instructions_by_id[lesson.id] &&
          instructions_by_id[lesson.id].remainingAttempts === 0) ||
        !instructions_by_id[lesson.id] ||
        active_quiz?.active_quiz_id
      ) {
        _showPrimaryAction = false;
      }
    }
    setShowPrimaryAction(_showPrimaryAction);
  }, [
    lesson?.id,
    instructions_by_id[lesson.id]?.remainingAttempts,
    active_quiz?.active_quiz_id,
  ]);

  const openPopup = () => {
    dispatch(toggleCourseNotesPopup());
  };
  const bookmarkLesson = () => {
    saved
      ? dispatch(undoSavedLesson(saved))
      : dispatch(saveLesson(query.course_id, query.seq_id));
  };
  const handleMarkAsViewed = () => {
    dispatch(
      showDialog({
        options: {
          title: 'Mark as Done',
          message: `Please confirm if you have viewed the ${lesson?.type}?`,
          yes_button: {
            text: 'Yes',
            onClick: () => {
              dispatch(markModuleContentAsViewed(lesson?._links?.viewed));
              return true;
            },
          },
          no_button: {
            text: 'No',
          },
          items_centered: true,
        },
      })
    );
  };

  const handleWorkspace = () => {
    return router.push(`${router.asPath}/workspace/${lesson.solve_id}`);
  };

  const getPrimaryAction = () => {
    switch (lesson?.type) {
      case 'QUIZ':
        return () => {
          dispatch(setManualAttemptsUpdateRequired());
          dispatch(setActiveQuiz({ active_quiz_id: lesson.id, lesson }));
        };
      case 'CODING_CASE':
        return () => handleCodingCase();
      case 'Apply':
      case 'Solve':
        return handleWorkspace;
      default:
        return () => {};
    }
  };

  const getPrimaryActionText = () => {
    const started = lesson?.progress_status !== 'NOT_STARTED';
    switch (lesson?.type) {
      case 'QUIZ':
        return hasAvailableAttempts(instructions_by_id, lesson.id)
          ? 'Retake'
          : 'Start';
      case 'CODING_CASE':
        return started ? 'Resume' : 'Start';
      default:
        return started ? 'Resume' : 'Start';
    }
  };

  const handleCodingCase = () => {
    fetchLinkAs(lesson?._links?.self)
      .then((payload) => {
        handleConsoleRedirection(payload);
      })
      .catch((error) => console.log(error.message));
  };

  const handleConsoleRedirection = (data) => {
    const ath_app =
      window.location.hostname.split('.')[1] === 'rolai' ||
      window.location.hostname.split('.')[1] === 'analyttica' ||
      window.location.hostname.split('.')[0] === 'localhost';
    data['parameters']['ath_app'] = ath_app;
    fetch(data['launchUrl'], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify(data['parameters']),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res?.redirectUrl && res['redirectUrl'] !== '') {
          window.open(res['redirectUrl'], '_self');
        } else {
          notify.error('signature verification failed');
        }
      })
      .catch((error) => {
        notify.error('Something went wrong');
      });
  };
  return (
    <>
      <Box
        className={styles.lessonHeaderContainer}
        pb={lesson?.milestones?.length > 0 ? 3 : 4}
      >
        <Box className={styles.lessonTitlewrapper}>
          {lesson?.icon && (
            <Box className={styles.clockWrapper}>
              <Image src={lesson.icon} width={16} height={20} />
            </Box>
          )}
          <Box pl={1}>
            <Tooltip title={lesson?.title} placement="top">
              <Typography variant="h5" className={styles.lesson_header}>
                {lesson?.title}
              </Typography>
            </Tooltip>
            <LessonDuration content={lesson} />
          </Box>
        </Box>
        <Box className={styles.lessonActionWrapper}>
          <Typography component="div" className={styles.actionsBtn}>
            {(lesson?.type === 'PDF' || lesson?.type === 'VIDEO') && (
              <>
                {lesson?.view_count <= 0 && (
                  <Button
                    className={styles.markAsDone}
                    onClick={handleMarkAsViewed}
                  >
                    Mark as Done
                  </Button>
                )}
              </>
            )}
            {showPrimaryAction &&
              lesson?.type !== 'PDF' &&
              lesson?.type !== 'VIDEO' && (
                <Button onClick={getPrimaryAction()}>
                  {getPrimaryActionText()}
                </Button>
              )}
          </Typography>
          {(lesson?.type === 'PDF' || lesson?.type === 'VIDEO') && (
            <Tooltip title="Save Lesson" placement="top">
              <Typography
                component="div"
                className={styles.actionsBtn}
                onClick={bookmarkLesson}
              >
                <Image
                  src={saved ? BookmarkActiveIcon : BookmarkIcon}
                  width={40}
                  height={40}
                />
              </Typography>
            </Tooltip>
          )}
          <Tooltip title="Add Notes" placement="top">
            <Typography
              component="div"
              onClick={openPopup}
              className={cx([styles.notesWrapper, styles.actionsBtn])}
            >
              <Image src={NoteIcon} width={40} height={40} />
              {lesson?.total_notes_count > 0 && (
                <Typography className={styles.notesCount}>
                  {lesson.total_notes_count}
                </Typography>
              )}
            </Typography>
          </Tooltip>
        </Box>
      </Box>
      {(lesson?.type?.toUpperCase() === 'APPLY' ||
        lesson?.type?.toUpperCase() === 'CODING_CASE') &&
        lesson?.milestones && (
          <Box className={styles.milestoneProgress}>
            <MilestoneProgress lesson={lesson} showDetails={false} />
          </Box>
        )}
    </>
  );
};

export default LessonHeader;
