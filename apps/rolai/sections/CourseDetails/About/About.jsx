import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Image from 'next/image';
import React from 'react';

import { WhatLearnIcon } from '../../../common/images';
import ListData from '../../../components/ListData/ListData';
import Material from '../../../components/Material/Material';
import useStyles from './About.styles';

const About = ({ title, material, overview }) => {
  const styles = useStyles();

  return (
    <Box className={styles.about}>
      <Typography variant="h4" pb={2}>
        {title}
      </Typography>
      <Material
        controlled
        material_link={material}
        editorClassName="editor-course-overview"
      />
    </Box>
  );
};

export default About;
