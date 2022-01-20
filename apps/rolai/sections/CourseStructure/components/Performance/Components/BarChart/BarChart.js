import Box from '@mui/material/Box';
import React, { Component } from 'react';
import { PALETTE_PRIMARY_MAIN, PALETTE_SECONDARY_LIGHT } from "../../../../../../config/theme";

import useStyles from './BarChart.styles';

const BarChart = ({ performance_metrics = [] }) => {
  const styles = useStyles();

  return (
    <Box className={styles.parent}>
      {performance_metrics
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 2)
        .map((i, k) => (
          <Box key={k} className={styles.barParent}>
            <Box>{i.metric}</Box>

            <Box
              className={styles.bar}
              style={{
                backgroundImage: `linear-gradient(to right, ${PALETTE_PRIMARY_MAIN} ${i.percentage}% , ${PALETTE_SECONDARY_LIGHT} 0%)`,
              }}
            />
            <Box>{Math.round(i.percentage)}%</Box>
          </Box>
        ))}
    </Box>
  );
};

export default BarChart;
