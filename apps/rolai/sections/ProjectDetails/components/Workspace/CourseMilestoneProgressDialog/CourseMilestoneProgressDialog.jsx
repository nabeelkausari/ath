import { Menu, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import cx from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../../components/Button/Button';
import Material from '../../../../../components/Material/Material';
import MilestoneProgress from '../../../../../components/MilestoneProgress/MilestoneProgress';
import { updateMilestonesInCurrentLesson } from '../../../../../store/courses/actions';
import useStyles from './CourseMilestoneProgressDialog.styles';

const CourseMilestoneProgressDialog = ({}) => {
  const styles = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const [opened, setOpened] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const is_course = router.query?.course_id !== undefined;

  const { current_lesson } = useSelector((state) => state.courses);
  const { internal_solve_succeeded, solve } = useSelector(
    (state) => state.workspace
  );

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (
      is_course &&
      internal_solve_succeeded &&
      current_lesson.type.toUpperCase() === 'APPLY'
    ) {
      dispatch(updateMilestonesInCurrentLesson(solve?.milestones));
    }
  }, [internal_solve_succeeded, is_course, current_lesson.type]);

  return (
    <Box className={styles.milestoneProgress}>
      <Box className={styles.milestoneSteps}>
        <MilestoneProgress
          lesson={current_lesson}
          onArrowClick={() => {
            setOpened(true);
          }}
        />
        <Menu
          className={styles.milestoneBody}
          id="milestone-menu"
          // anchorEl={document.getElementById('milestone-button')}
          open={opened}
          transformOrigin={{ horizontal: 200, vertical: 10 }}
          onClose={() => setOpened(false)}
        >
          {current_lesson?.milestones?.map((milestone, i) => (
            <Accordion
              expanded={expanded === i}
              onChange={handleChange(i)}
              key={i}
              className={styles.milestoneAccordion}
            >
              <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                className={styles.accSummary}
              >
                <Typography
                  variant="body2"
                  component="div"
                  className={styles.milestoneNumber}
                >
                  Milestone {milestone?.sequence_number}
                  <Button
                    variant="text"
                    className={cx([
                      styles.arrowButton,
                      expanded === i ? styles.expandIcon : '',
                    ])}
                  >
                    <ArrowForwardIosIcon className={styles.arrowIcon} />
                  </Button>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body2"
                  component="div"
                  className={styles.description}
                >
                  <Material
                    editorClassName="editor-milestone-overview"
                    controlled
                    material_link={milestone._links.material}
                  />
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Menu>
      </Box>
    </Box>
  );
};

export default CourseMilestoneProgressDialog;
