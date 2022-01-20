import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import cx from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  DatasetsIcon,
  QuizIcon,
  ReadingMaterialIcon,
  VideosIcon,
  WhatLearnIcon,
} from '../../../../common/images';
import {
  setCurrentLesson,
  updateLastAccessLesson,
} from '../../../../store/courses/actions';
import ModuleLesson from './ModuleLesson';
import useStyles from './ModuleLessons.styles';

export const getContentData = (content) => {
  switch (content.type) {
    case 'MATERIAL':
      return {
        content_reference: content.module_seq_id,
        type: content.type,
        ...content.data,
        title: 'Overview',
        icon: WhatLearnIcon,
      };
    case 'PDF':
      return {
        content_reference: content.module_seq_id,
        ...content.data,
        title: content?.data?.title,
        icon: ReadingMaterialIcon,
        type: content.type,
        completed: content?.data?.view_count && content?.data?.view_count > 0,
      };
    case 'VIDEO':
      return {
        content_reference: content.module_seq_id,
        ...content.data,
        title: content.data.title,
        icon: VideosIcon,
        completed: content?.data?.view_count && content?.data?.view_count > 0,
      };
    case 'APPLY':
      return {
        content_reference: content.module_seq_id,
        ...content.data,
        title: content.data.title || 'Practice Simulation',
        icon: DatasetsIcon,
        completed:
          content?.data?.progress_status?.toUpperCase() === 'COMPLETED',
      };
    case 'SOLVE':
      return {
        content_reference: content.module_seq_id,
        ...content.data,
        title: content.data.title || 'Solve',
        icon: DatasetsIcon,
        completed:
          content?.data?.progress_status?.toUpperCase() === 'COMPLETED',
      };
    case 'WEBINAR':
      return {
        content_reference: content.module_seq_id,
        type: content.type,
        ...content.data,
        title: content?.data?.name,
        // icon: WebinarIcon,
        icon: DatasetsIcon,
        completed: content?.data?.viewed,
      };
    case 'QUIZ':
      return {
        content_reference: content.module_seq_id,
        type: content.type,
        ...content.data,
        title: content?.data?.details?.name || 'Quiz',
        icon: QuizIcon,
        completed:
          content?.data?.progress_status?.toUpperCase() === 'COMPLETED',
      };
    case 'CODING_CASE':
      return {
        content_reference: content.module_seq_id,
        type: content.type,
        ...content.data,
        title: content?.data?.name || 'Coding Case',
        icon: DatasetsIcon,
        completed:
          content?.data?.progress_status?.toUpperCase() === 'COMPLETED',
      };
  }
};

const ModuleLessons = ({ lessons = [], index }) => {
  const styles = useStyles();
  const router = useRouter();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const dispatch = useDispatch();

  const {
    course_succeeded,
    course_syllabus_succeeded,
    course_syllabus,
    course,
  } = useSelector((state) => state.courses);
  const handleLesson = (lesson) => {
    dispatch(
      updateLastAccessLesson(router.query.course_id, lesson.module_seq_id)
    );
    return router.push(
      `/courses/${router.query.course_id}/lesson/${lesson.content_reference}`
    );
  };

  useEffect(() => {
    if (router?.query?.seq_id) {
      setSelectedLesson(router.query.seq_id);
      const currentSelectedLesson = lessons.find(
        (l) => Number(router.query.seq_id) === Number(l.module_seq_id)
      );
      if (!isNaN(router.query.seq_id) && currentSelectedLesson) {
        dispatch(
          setCurrentLesson(getContentData(currentSelectedLesson), index)
        );
      }
    }
  }, [router?.query?.seq_id, course, JSON.stringify(course_syllabus)]);

  return (
    <Box className={styles.lessonsContainer}>
      {lessons.map((lesson, i) => {
        const isSelectedLesson =
          Number(selectedLesson) === Number(lesson.module_seq_id);
        return (
          <ModuleLesson
            key={i}
            isSelectedLesson={isSelectedLesson}
            onClick={() => handleLesson(getContentData(lesson))}
            content={getContentData(lesson)}
          />
        );
      })}
    </Box>
  );
};

export default ModuleLessons;
