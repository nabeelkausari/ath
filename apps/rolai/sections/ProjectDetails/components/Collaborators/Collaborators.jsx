import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Image from 'next/image';
import React from 'react';

import { WhatLearnIcon } from '../../../../common/images';
import ListData from '../../../../components/ListData/ListData';
import useStyles from './Collaborators.styles';

const Collaborators = ({ about, overview }) => {
  const styles = useStyles();

  return (
    <Box className={styles.collaborators}>
      <Typography variant="h4" pb={2}>
        Collaborators
      </Typography>
      <Box py={3} px={4}>
        <Card className={styles.collaboratorsCard}>
          <CardContent className={styles.cardContent}></CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Collaborators;
