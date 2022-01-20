import Box from '@mui/material/Box';
import React, { Component } from 'react';

import useStyles from './ProgressPieChart.styles';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressPieChart = ({ width = 184, data = [] }) => {
  const styles = useStyles();

  return (
    <Box className={styles.parent}>
      <Box className={styles.pieParent}>
        {data.map((i, k) => (
          <Box
            className={styles.pieBox}
            key={k}
            style={{ width: width - 28 * k, height: width - 28 * k }}
          >
            <CircularProgressbar
              value={i.value}
              text={``}
              strokeWidth={3.5 + k * 0.9}
              styles={{
                path: { stroke: i.color, strokeLinecap: 'butt' },
                trail: { stroke: '#EEEEEE' },
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProgressPieChart;
