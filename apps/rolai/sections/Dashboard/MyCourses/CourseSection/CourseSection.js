import Box from '@mui/material/Box';
import React, { Component } from 'react';

import useStyles from './CourseSection.styles';

const CourseSection = () => {
  const styles = useStyles();
  return <Box className={styles.parent}></Box>;
};

export default CourseSection;
