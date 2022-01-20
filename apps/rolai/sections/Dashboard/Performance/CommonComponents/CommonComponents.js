import Box from '@mui/material/Box';
import React, { Component } from 'react';
import cx from 'classnames';

import {
  useAnalysisBoxStyles,
  useProgressBoxStyles,
} from './CommonComponents.styles';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Image from 'next/image';
import { DatasetsIcon } from '../../../../common/images';
import { LinearProgress } from '@mui/material';
import { ProgressBar } from '../../Components/DashboardComponents/DashboardComponents';
import { floor } from '../../../../utils/helpers/helperFunctions';

export const ProgressBox = ({ onClick, selected, item }) => {
  const styles = useProgressBoxStyles();
  return (
    <Box
      className={cx([styles.parent, selected && styles.active])}
      onClick={onClick}
    >
      <Box style={{ width: 50, height: 50 }}>
        <CircularProgressbarWithChildren
          value={floor(item.percentage)}
          text={`${floor(item.percentage)}%`}
          strokeWidth={10}
          styles={{
            path: { stroke: '#2DE352', strokeLinecap: 'butt' },
            trail: { stroke: '#EEEEEE' },
            text: {
              fontSize: 25,
              fill: 'black',
            },
          }}
        ></CircularProgressbarWithChildren>
      </Box>
      <Box className="text-active">{item.metric}</Box>
    </Box>
  );
};

export const AnalysisBox = ({ data }) => {
  const styles = useAnalysisBoxStyles();
  if (data.value == undefined) return null;
  return (
    <Box
      className={styles.parent}
      style={{ borderRight: !data.icon ? '1px solid #70707011' : 'none' }}
    >
      {data.icon && (
        <Box className={styles.parentIcon}>
          <Image src={data.icon} width={24} height={24} />
        </Box>
      )}
      <Box>
        <Box className={styles.info}>
          <Box>{floor(data.value)}%</Box>
          <Box>{data.name}</Box>
        </Box>
        <ProgressBar
          istext={false}
          value={floor(data.value)}
          color={data.color}
          style={{ height: 8, width: 123 }}
        />
      </Box>
    </Box>
  );
};
