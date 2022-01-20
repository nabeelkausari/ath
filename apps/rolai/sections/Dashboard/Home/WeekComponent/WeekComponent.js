import { Badge } from '@mui/material';
import Box from '@mui/material/Box';
import React, { Component } from 'react';

import useStyles from './WeekComponent.styles';

const WeekComponent = ({ item: { date, day, active, badge } }) => {
  const styles = useStyles();
  return (
    <Box className={styles.parent}>
      <Badge
        badgeContent={badge}
        color="primary"
        overlap="circular"
        classes={{ badge: styles.customBadge }}
      >
        <Box className={[styles.date, active && styles.active]}>{date}</Box>
      </Badge>
      <Box className={styles.day}>{day}</Box>
    </Box>
  );
};

export default WeekComponent;
