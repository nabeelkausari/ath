import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import cx from 'classnames';
import Image from 'next/image';
import React, { useState } from 'react';

import { EnrolledIcon } from '../../../../common/images';
import LessonDuration from '../LessonDuration/LessonDuration';
import useStyles from './ModuleLessons.styles';

const ModuleLesson = ({ content, onClick, isSelectedLesson }) => {
  const styles = useStyles();
  return (
    <Box
      onClick={onClick}
      className={cx([styles.lessonsWrapper, isSelectedLesson && styles.active])}
    >
      <Box className={styles.lessonsIcon}>
        <Image src={content.icon} width={11} height={14} />
      </Box>

      <Typography component="div" className={styles.lessonTitleContainer}>
        <Typography
          variant="body2"
          className={
            (styles.lessonsTitle, isSelectedLesson && styles.selectedTitle)
          }
        >
          {content?.title}
        </Typography>
        <LessonDuration content={content} />
      </Typography>
      {content.type !== 'MATERIAL' && (
        <>
          {content.completed ? (
            <Image src={EnrolledIcon} width={14} height={14} />
          ) : (
            <Typography className={styles.lessonStatus}> </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default ModuleLesson;
