import { Card } from '@mui/material';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import React, { Component } from 'react';

import {
  PALETTE_SECONDARY_MAIN,
  PALETTE_TEXT_MAIN,
} from '../../../../config/theme';
import Chip from '../../Components/DashboardHomeChip/Chip';
import HeaderComponent from '../../Components/Header/header';
import useStyles from './ProjectCard.styles';

const ProjectCard = ({ item }) => {
  const styles = useStyles();
  const router = useRouter();
  const insights_only = item.permission && item.permission === CONFIGURED;

  return (
    <Card
      className={styles.card}
      onClick={() => {
        router.push(
          `/projects/${item.id}/workspace/${item.id}${
            insights_only ? '/insights' : '/datasets'
          }`
        );
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Box>
          {/* <Box className={styles.heading}>Fundamentals of Data Analytics</Box> */}
          <Chip
            name={'My Project'}
            color={PALETTE_TEXT_MAIN}
            backgroundColor={PALETTE_SECONDARY_MAIN}
          />
          <Box className={styles.description}>{item.name}</Box>
        </Box>
      </Box>
    </Card>
  );
};

export default ProjectCard;
