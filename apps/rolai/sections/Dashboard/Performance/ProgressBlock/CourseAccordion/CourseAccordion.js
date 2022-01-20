import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
} from '@mui/material';
import Box from '@mui/material/Box';
import cx from 'classnames';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import dropdownDark from '../../../../../assets/icons/dropdown-dark.svg';
import { CustomTable } from '../../../../CourseStructure/components/Performance/Components/CommonComponents/CommonComponents';
import ModuleBox from '../../../../CourseStructure/components/Performance/Components/ModuleBox/ModuleBox';
import useStyles from './CourseAccordion.styles';

const CourseAccordion = ({
  selectedCourse,
  setSelectedCourse,
  moduleView,
  course,
}) => {
  const styles = useStyles();
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected(undefined);
  }, [selectedCourse]);

  return (
    <Accordion expanded={selectedCourse} className={styles.parent}>
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={styles.titleBox}
        onClick={setSelectedCourse}
      >
        <Box
          className={cx([styles.round, selectedCourse && styles.activeRound])}
        >
          <KeyboardArrowRightRoundedIcon />
        </Box>
        <Box className={styles.title}>
          <Box>{course.title}</Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails className={styles.details}>
        {moduleView ? (
          course.modules &&
          course.modules.map((module, k) => (
            <ModuleBox
              key={k}
              index={k}
              module={module}
              selected={selected == k}
              setSelected={(e) => {
                setSelected((old) => (old == k ? undefined : k));

                e.stopPropagation();
              }}
            />
          ))
        ) : (
          <Card className={styles.table}>
            <CustomTable
              data={[].concat.apply(
                [],
                course.modules.map((module) =>
                  module.contents.map((elem) => ({
                    ...elem,
                  }))
                )
              )}
            />
          </Card>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default CourseAccordion;
