import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Material from '../../../../components/Material/Material';
import {
  ACTIVE_QUIZ_ID,
  checkForActiveQuiz,
  getQuizInstructions,
  getQuizQuestions,
  timerStart,
} from '../../../../store/courses/quiz/actions';
import { quiz_links } from '../../../../utils/api/quizLinks';
import { getCookie } from '../../../../utils/helpers/storage';
import AssessmentOverview from '../AssessmentOverview/AssessmentOverview';
import CourseOverview from '../CourseOverview/CourseOverview';
import LessonHeader from '../LessonHeader/LessonHeader';
import { getContentData } from '../ModuleLessons/ModuleLessons';
import ActiveQuizBar from '../Quiz/ActiveQuizBar/ActiveQuizBar';
import Instructions from '../Quiz/Instructions/Instructions';
import ReadingMaterial from '../ReadingMaterial/ReadingMaterial';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import useStyles from './StructureCard.styles';

const StructureCard = ({}) => {
  const styles = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const [lesson, setLesson] = useState(null);
  const [minimized, setMinimized] = useState(false);

  const { course_syllabus } = useSelector((state) => state.courses);

  const { active_quiz, quiz_over, quiz_questions_succeeded } = useSelector(
    (state) => state.courses.quiz
  );

  useEffect(() => {
    if (
      course_syllabus &&
      course_syllabus.length > 0 &&
      router?.query?.seq_id
    ) {
      if (!isNaN(router.query.seq_id)) {
        for (let i = 0; i < course_syllabus.length; i++) {
          const seq_id_found = course_syllabus[i].module_contents.find(
            (m) => Number(m.module_seq_id) === Number(router.query.seq_id)
          );
          if (seq_id_found) {
            setLesson(getContentData(seq_id_found));
            break;
          }
        }
      }
    }
  }, [router?.query?.seq_id, course_syllabus]);

  useEffect(() => {
    if (lesson && lesson.type === 'QUIZ') {
      dispatch(getQuizInstructions(lesson._links.start, lesson.id));
    }
  }, [lesson?.type, lesson?.id]);

  useEffect(() => {
    const quiz_id = getCookie(ACTIVE_QUIZ_ID);
    if (quiz_id && !active_quiz.id) {
      dispatch(checkForActiveQuiz(quiz_links.getQuizStatus(quiz_id), quiz_id));
    }
  }, []);

  useEffect(() => {
    if (active_quiz?.active_quiz_id) {
      let quiz_questions_link = quiz_links.getQuestionsLink(
        active_quiz.active_quiz_id
      );
      dispatch(
        getQuizQuestions(quiz_questions_link, active_quiz.active_quiz_id)
      );
    }
  }, [active_quiz?.active_quiz_id]);

  useEffect(() => {
    const quiz_id = getCookie(ACTIVE_QUIZ_ID);
    if (quiz_questions_succeeded && quiz_id) {
      dispatch(timerStart(active_quiz.remaining_duration));
    }
  }, [quiz_questions_succeeded]);

  const handleMinimizeView = () => {
    setMinimized(!minimized);
  };
  if (router?.query?.seq_id === 'overview') return <CourseOverview />;
  if (router?.query?.seq_id === 'assessment_overview')
    return <AssessmentOverview />;

  return (
    <Box className={styles.baseCard}>
      <LessonHeader lesson={lesson} />

      {lesson && lesson.type.toUpperCase() === 'PDF' && (
        <ReadingMaterial {...lesson} />
      )}
      {lesson && lesson.type.toUpperCase() === 'VIDEO' && (
        <VideoPlayer {...lesson} />
      )}
      {lesson && lesson.type.toUpperCase() === 'APPLY' && (
        <Box className={styles.content}>
          <Material
            editorClassName="editor-content-overview"
            controlled
            material_link={lesson?._links?.details}
          />
        </Box>
      )}
      {lesson && lesson.type.toUpperCase() === 'SOLVE' && (
        <Box className={styles.content}>
          <Material
            editorClassName="editor-content-overview"
            controlled
            material_link={lesson?._links?.details}
          />
        </Box>
      )}
      {lesson && lesson.type.toUpperCase() === 'QUIZ' && (
        <Box className={styles.content}>
          <Instructions quiz_id={lesson.id} />
        </Box>
      )}
      {lesson && lesson.type.toUpperCase() === 'CODING_CASE' && (
        <Box className={styles.content}>
          <Material
            editorClassName="editor-content-overview"
            controlled
            material_link={lesson?._links?.learn}
          />
        </Box>
      )}
      {/* {lesson &&
        (lesson?.type === 'QUIZ' ||
          lesson?.type === 'SOLVE' ||
          lesson?.type === 'APPLY' ||
          lesson?.type === 'CODING_CASE') && (
          <Box className={styles.content}>
            <Material
              material_link={lesson?._links?.learn}
              // update_link={update_links?.self}
            />
          </Box>
        )} */}
      {/* {!quiz_over && active_quiz && active_quiz.active_quiz_id && (
        <ActiveQuizBar
          minimizeView={handleMinimizeView}
          minimized={minimized}
          active_quiz_id={active_quiz.active_quiz_id}
          {...lesson}
        />
      )} */}
    </Box>
  );
};

export default StructureCard;
