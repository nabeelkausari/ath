import { Card } from '@mui/material';
import Box from '@mui/material/Box';
import React, { Component } from 'react';
import { EmptyScreen } from '../../Components/DashboardComponents/DashboardComponents';
import HeaderComponent from '../../Components/Header/header';
import WeekComponent from '../WeekComponent/WeekComponent';
import useStyles from './WeekSection.styles';

const week_data = [
  { day: 'mon', date: 2, active: true, badge: 2 },
  { day: 'mon', date: 2, active: false, badge: 2 },
  { day: 'mon', date: 2, active: false },
  { day: 'mon', date: 2, active: false, badge: 0 },
  { day: 'mon', date: 2, active: false, badge: 2 },
  { day: 'mon', date: 2, active: false, badge: 0 },
  { day: 'mon', date: 2, active: false, badge: 2 },
];
const WeekSection = () => {
  const styles = useStyles();
  return (
    <Box className={styles.parent}>
      <HeaderComponent title={'MY CURRENT WEEK'} />
      <Card className={styles.card}>
        {false ? (
          <>
            <Box className={styles.left}>
              {week_data.map((item, k) => (
                <WeekComponent key={k} item={item} />
              ))}
            </Box>
            <Box className={styles.right}></Box>
          </>
        ) : (
          <EmptyScreen name={'WEEK'} imgWidth={'18vh'} />
        )}
      </Card>
    </Box>
  );
};

export default WeekSection;
