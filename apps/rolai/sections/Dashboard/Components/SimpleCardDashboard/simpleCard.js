import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Tooltip,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import cx from 'classnames';
import Image from 'next/image';
import React, { Component, useState } from 'react';

import { ReadingMaterialIcon } from '../../../../common/images';
import { courseType } from '../../../../utils/constants/components';
import Chip from '../DashboardHomeChip/Chip';
import useStyles from './simpleCard.styles';
// const iconMapper = {
//   QUIZ: QuizIcon,
//   VIDEO: VideosIcon,
//   PDF: ReadingMaterialIcon,
//   SOLVE: DatasetsIcon,
// };

const SimpleCard = ({
  item = {},
  RightComponent,
  onSelect,
  selected,
  ExapandComponent,
}) => {
  const styles = useStyles();

  return (
    // <Card
    //   className={[styles.parent, selected && styles.active]}
    //   style={{ cursor: onSelect && 'pointer' }}
    //   onClick={() => {
    //     onSelect && onSelect();
    //   }}
    // >
    <Accordion
      className={`${styles.parent} ${selected ? styles.active : ''}`}
      onClick={() => {
        onSelect && onSelect();
      }}
      expanded={ExapandComponent && selected}
    >
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{ cursor: onSelect ? 'pointer' : 'initial' }}
        sx={{ padding: 0 }}
        className={cx([
          styles.mainBlock,
          onSelect && selected && styles.borderLeft,
          onSelect && styles.onSelect,
        ])}
      >
        <Box className={styles.left}>
          <Chip
            name={item.type}
            color={item.pillColor}
            backgroundColor={item.pillBg}
          />
          <Tooltip title={item.heading} placement="top" arrow>
            <Box className={styles.heading}>{item.heading}</Box>
          </Tooltip>

          {item.description && (
            <Box className={styles.description}>
              {item.contentType && courseType[item.contentType]?.icon1 && (
                <Box minWidth={'1.6vh'} height={'1.6vh'} className={styles.img}>
                  <Image src={courseType[item.contentType].icon1} />
                </Box>
              )}
              <span>{item.description}</span>
            </Box>
          )}
        </Box>
        {RightComponent && (
          <Box className={styles.rightComp}>
            <RightComponent />
          </Box>
        )}
      </AccordionSummary>

      {ExapandComponent && selected && (
        <AccordionDetails>
          <ExapandComponent />
        </AccordionDetails>
      )}
    </Accordion>
  );
};

export default SimpleCard;
