import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

import StructureCard from './components/StructureCard/StructureCard';
import useStyles from './CourseStructure.styles';

const CourseStructure = ({}) => {
  const styles = useStyles();

  return <StructureCard />;
};

export default CourseStructure;
