import Chip from '@mui/material/Chip';
import React from 'react';

import useStyles from './CoursePill.styles';

const CoursePill = ({ label, ...props }) => {
  const styles = useStyles();

  return <Chip label={label || 'Course'} className={styles.coursePill} />;
};

export default CoursePill;
