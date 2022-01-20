import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { useSelector } from 'react-redux';

import CardTitle from '../../../../components/CardTitle/CardTitle';
import CourseProgress from '../../../../components/CourseProgress/CourseProgress';
import EstimatedTime from '../../../../components/EstimatedTime/EstimatedTime';
import useStyles from './ModuleTitleBar.styles';

const ModuleTitleBar = ({}) => {
  const styles = useStyles();
  const { course } = useSelector((state) => state.courses);
  if (!course?.title) return null;

  return (
    <Box className={styles.titleBar}>
      <Toolbar className={styles.content}>
        <Box>
          <Typography component="div">
            <CardTitle title={course?.title} customClass={styles.title} />
            <Typography variant="body2" color="textSecondary">
              {`${course?.modules_count} Modules `}
              {course?.components_count && (
                <span style={{ marginLeft: 10 }}>
                  {course?.components_count} Lessons
                </span>
              )}
            </Typography>
          </Typography>
        </Box>
        <Box display="flex">
          <EstimatedTime seconds={course?.estimated_duration_sec} />
          <CourseProgress
            progress_percent={course?.progress_percent}
            progress_status={course?.progress_status}
          />
        </Box>
      </Toolbar>
    </Box>
  );
};

export default ModuleTitleBar;
