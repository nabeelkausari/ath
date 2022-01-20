import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import Box from '@mui/material/Box';
import React, { Component, useState } from 'react';
import { CustomTable } from '../CommonComponents/CommonComponents';
import Image from 'next/image';
import useStyles from './ModuleBox.styles';
import dropdownDark from '../../../../../../assets/icons/dropdown-dark.svg';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import cx from 'classnames';
import { ProgressBar } from '../../../../../Dashboard/Components/DashboardComponents/DashboardComponents';

const ModuleBox = ({ selected, setSelected, module, index }) => {
  const styles = useStyles();
  return (
    <Accordion
      expanded={selected}
      className={styles.parent}
      // onChange={setSelected}
    >
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={styles.titleBox}
        onClick={setSelected}
      >
        <Box display="flex">
          <Box className={cx([styles.round, selected && styles.activeRound])}>
            <KeyboardArrowRightRoundedIcon />
          </Box>

          <Box className={styles.title}>
            <Box>
              MODULE <span>{index + 1}</span>
            </Box>
            <Box>{module.title}</Box>
          </Box>
        </Box>
        {module.status == 'STARTED' ? (
          <ProgressBar value={Math.round(module.progress * 100) || 0} />
        ) : (
          <Box sx={{ fontStyle: 'italic', fontSize: '12px', opacity: '.6' }}>
            {module.status == 'COMPLETED' ? 'Completed' : 'Not Started'}
          </Box>
        )}
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>
        <CustomTable data={module.contents} />
      </AccordionDetails>
    </Accordion>
  );
};

export default ModuleBox;
