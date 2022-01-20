import { Card } from '@mui/material';
import Box from '@mui/material/Box';
import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import AntSwitch from '../../../../components/Switch/Switch';
import { PALETTE_PRIMARY_MAIN } from "../../../../config/theme";
import { courseType } from '../../../../utils/constants/components';
import CardSkeleton from '../../CardSkeleton/CardSkeleton';
import { AnalysisBox } from '../CommonComponents/CommonComponents';

import useStyles from './AnalysisBlock.styles';

const AnalysisBlock = ({ moduleView, setModuleView, selected }) => {
  const styles = useStyles();
  const {
    dashboard_performance_data: data,
    dashboard_performance_data_requested,
  } = useSelector((state) => state.performance);
  const analysisData = [
    { name: 'Overall', value: data.overall_score, color: PALETTE_PRIMARY_MAIN },
    {
      name: 'Data Cases',
      value: data.datacase_score,
      icon: courseType.SOLVE.icon1,
      color: '#D46159',
    },
    {
      name: 'Quizes',
      value: data.quiz_score,
      icon: courseType.QUIZ.icon1,
      color: '#F68B67',
    },
    {
      name: 'Coding',
      value: data.coding_case_score,
      icon: courseType.SOLVE.icon1,
      color: '#F6BC0C',
    },
  ];
  return (
    <Box className={styles.parent}>
      <Box className={styles.titleBox}>
        <Box className={styles.heading}>
          {selected?.metric || 'Overall Progress'}
        </Box>
        <Box display="flex" alignItems="center">
          <AntSwitch
            checked={moduleView}
            onChange={(e) => setModuleView(e.target.checked)}
            inputProps={{ 'aria-label': 'ant design' }}
            color={'secondary'}
          />
          <Box className={styles.secondary} marginLeft={1}>
            Group by Module
          </Box>
        </Box>
      </Box>

      {dashboard_performance_data_requested ? (
        <CardSkeleton cards={4} direction="row" height={100} width={'24%'} />
      ) : (
        <Card className={styles.container}>
          <AnalysisBox data={analysisData[0]} />
          <AnalysisBox data={analysisData[1]} />
          <AnalysisBox data={analysisData[2]} />
          <AnalysisBox data={analysisData[3]} />
        </Card>
      )}
    </Box>
  );
};

export default AnalysisBlock;
