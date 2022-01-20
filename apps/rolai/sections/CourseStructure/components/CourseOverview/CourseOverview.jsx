import { Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import cx from 'classnames';
import Image from 'next/image';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Button from '../../../../components/Button/Button';
import ContentCount from '../../../../components/ContentCount/ContentCount';
import EstimatedTime from '../../../../components/EstimatedTime/EstimatedTime';
import Material from '../../../../components/Material/Material';
import LessonHeader from '../LessonHeader/LessonHeader';
import useStyles from './CourseOverview.styles';

const CourseOverView = ({ link }) => {
  const styles = useStyles();
  const [expanded, setExpanded] = useState(null);

  const { course_syllabus, course } = useSelector(
    (state) => state.courses
  );

  const handleChange = (panelId) => (event, isExpanded) => {
    setExpanded(isExpanded ? panelId : false);
  };
  return (
    <Box className={styles.courseOverview}>
      <Typography variant="h5" fontWeight="300" py={1} fontSize="24">
        {' '}
        Course Overview{' '}
      </Typography>
      {/* <Typography
        variant="body2"
        color="textSecondary"
        className={styles.overviewSubTitle}
      >
        Get started with this applied course focusing on the building blocks of
        analytics and statistics. The multi dimensional course is divided into{' '}
        {course?.modules_count} modules and {course?.components_count} lessons,
        and provides 13 hands-on data cases across different domains and
        techniques.
      </Typography> */}
      <Typography
        variant="body2"
        color="textSecondary"
        className={styles.overviewSubTitle}
      >
        {course.description}
      </Typography>
      <Box mt={1}>
        {course_syllabus &&
          course_syllabus?.map((lesson, i) => {
            return (
              <Card key={i} className={styles.lessonWrapper}>
                <CardContent>
                  <Accordion
                    expanded={expanded === i}
                    onChange={handleChange(i)}
                    key={i}
                    className={styles.accordion}
                  >
                    <AccordionSummary
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                      className={styles.accSummary}
                    >
                      <Box className={styles.moduleSequenceWrapper}>
                        <Typography
                          color="textSecondary"
                          component="div"
                          className={styles.moduleSequence}
                        >
                          Module &nbsp;
                          <Typography
                            variant="caption"
                            color="textPrimary"
                            fontWeight="500"
                            component="span"
                          >
                            {lesson.sequence_number}
                          </Typography>
                        </Typography>
                        <EstimatedTime
                          seconds={lesson?.estimated_duration_sec}
                        />
                      </Box>
                      <Box pr={3}>
                        <Typography variant="h5" pt={1.5} pb={0.8}>
                          {lesson?.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {lesson?.description}
                        </Typography>
                      </Box>
                      <Box className={styles.lessonsCount}>
                        <ContentCount
                          course={lesson}
                          displayDuration={true}
                          customClass={styles.contentCountWrapper}
                        />
                        <Button
                          variant="text"
                          color="primary"
                          className={styles.viewButton}
                        >
                          {expanded === i ? 'View Less' : 'View More'}
                        </Button>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails className={styles.details}>
                      {expanded === i && (
                        <Material
                          controlled
                          material_link={lesson._links.learn}
                          editorClassName="editor-course-overview"
                        />
                      )}
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
      </Box>
    </Box>
  );
};

export default CourseOverView;
