import Box from '@mui/material/Box';
import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardPerformanceData } from '../../../../store/performance/actions';
import CardSkeleton from '../../CardSkeleton/CardSkeleton';
import { ProgressBox } from '../CommonComponents/CommonComponents';

import useStyles from './ProgressBlock.styles';

const ProgressBlock = ({ selected, setSelected }) => {
  const styles = useStyles();
  const { performance_metrics, performance_metrics_requested } = useSelector(
    (state) => state.performance
  );

  // useEffect(() => {
  //   setSelected(performance_metrics[0]);
  // }, [performance_metrics]);
  return (
    <Box className={styles.parent}>
      {performance_metrics_requested ? (
        <Box>
          <CardSkeleton cards={8} direction="row" height={128} width={128} />
        </Box>
      ) : (
        performance_metrics.map((item, k) => (
          <ProgressBox
            key={k}
            onClick={() => setSelected(item)}
            item={item}
            selected={item?.metric_key == selected?.metric_key}
          />
        ))
      )}
    </Box>
  );
};

export default ProgressBlock;
