import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import React, { useState } from 'react';

import { CourseProgressIcon } from '../../common/images';
import Button from '../Button/Button';
import ProgressBar from '../ProgressBar/ProgressBar';
import useStyles from './CourseProgress.styles';

const CourseProgress = ({ progress_status, progress_percent }) => {
  const styles = useStyles();
  return (
    <Box className={styles.progressContainer}>
      <Box className={styles.progressWrapper}>
        <Image src={CourseProgressIcon} width={17} height={17} />
      </Box>
      <Box px={1}>
        <Typography variant="caption" color="textSecondary" component="div">
          Course Progress
        </Typography>
        {progress_status !== 'NOT_STARTED' ? (
          <Typography component="div" className={styles.progressContent}>
            <Box className={styles.progress}>
              <ProgressBar value={progress_percent} />
            </Box>
            {/*<Button variant="text" className={styles.view}>*/}
            {/*  View*/}
            {/*</Button>*/}
          </Typography>
        ) : (
          <Typography
            variant="caption"
            color="textSecondary"
            component="div"
            fontStyle="italic"
          >
            {'Not Started'}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CourseProgress;
