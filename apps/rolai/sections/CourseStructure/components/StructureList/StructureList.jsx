import { Menu, MenuItem, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { DriveEtaRounded } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import cx from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { FilterIcon } from '../../../../common/images';
import Button from '../../../../components/Button/Button';
import ContentCount from '../../../../components/ContentCount/ContentCount';
import ProgressBar from '../../../../components/ProgressBar/ProgressBar';
import { courseType } from '../../../../utils/constants/components';
import ModuleLessons from '../ModuleLessons/ModuleLessons';
import Popup from '../Popup/Popup';
import useStyles from './StructureList.styles';
import AssessmentDetails from '../AssessmentDetails/AssessmentDetails';
const StructureList = ({}) => {
  const styles = useStyles();
  const router = useRouter();
  const [expanded, setExpanded] = useState(null);

  const [filterData, setFilterData] = useState({
    opened: false,
    selected: 'ALL',
    items: [],
  });
  const [course_syllabusFiltered, setCourse_syllabusFiltered] = useState([]);
  const { course_syllabus, course_syllabus_assessments } = useSelector(
    (state) => state.courses
  );

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (
      course_syllabus &&
      course_syllabus.length > 0 &&
      router?.query?.seq_id
    ) {
      if (!isNaN(router.query.seq_id)) {
        for (let i = 0; i < course_syllabus.length; i++) {
          const seq_id_found = course_syllabus[i].module_contents.find(
            (m) => Number(m.module_seq_id) === Number(router.query.seq_id)
          );
          if (seq_id_found) {
            setExpanded(i);
            break;
          }
        }
      }
    }
  }, [router?.query?.seq_id, course_syllabus?.length]);

  useEffect(() => {
    let filtered =
      filterData.selected === 'ALL'
        ? course_syllabus
        : course_syllabus
            .map((i, k) => ({
              ...i,
              module_contents: i.module_contents.filter(
                (m, n) => m.type === filterData.selected
              ),
            }))
            .filter((i, k) => i.module_contents.length > 0);
    setCourse_syllabusFiltered(filtered);
  }, [filterData.selected]);

  useEffect(() => {
    let items = ['ALL'];
    course_syllabus.forEach((i, k) =>
      i.module_contents.forEach((m, n) => {
        if (items.indexOf(m.type) === -1) items = [...items, m.type];
      })
    );
    setFilterData({ ...filterData, opened: false, selected: 'ALL', items });
    setCourse_syllabusFiltered([...course_syllabus]);
  }, [JSON.stringify(course_syllabus)]);
  return (
    <Box className={styles.moduleWrapper}>
      <Card
        className={cx([
          styles.OverviewCard,
          router?.query?.seq_id === 'overview' && styles.OverviewCardSelected,
        ])}
      >
        <CardContent>
          <Box
            onClick={() =>
              router.push(
                `/courses/${router?.query?.course_id}/lesson/overview`
              )
            }
            flex={1}
            px={2}
            py={1}
          >
            <Typography variant="subtitle2">Overview</Typography>
          </Box>
          <Typography px={2} py={1} component="div" id="filter-button">
            <Image
              src={FilterIcon}
              width={11}
              height={14}
              onClick={() =>
                setFilterData({ ...filterData, opened: !filterData.opened })
              }
            />
            <Menu
              className={styles.filterBody}
              id="filter-menu"
              classes={{ paper: styles.filterPaper }}
              anchorEl={document.getElementById('filter-button')}
              open={filterData.opened}
              transformOrigin={{ horizontal: 200, vertical: -10 }}
              onClose={() =>
                setFilterData({
                  ...filterData,
                  opened: !filterData.opened,
                })
              }
              // MenuListProps={{
              //   'aria-labelledby': 'basic-button',
              // }}
            >
              {/* <Box className={styles.filterBody}> */}
              <Box className={styles.filterHeading}>Type</Box>
              {filterData.items.map((item, k) => (
                <div
                  key={k}
                  className={
                    filterData.selected === item && styles.filterSelected
                  }
                  onClick={() =>
                    setFilterData({ ...filterData, selected: item })
                  }
                >
                  {courseType[item]?.name || item}
                </div>
              ))}
              {/* </Box> */}
              {/* <MenuItem onClick={handleLogout}>Logout</MenuItem> */}
            </Menu>
            {/* {filterData.opened && (

            )} */}
          </Typography>
        </CardContent>
      </Card>

      {course_syllabusFiltered &&
        course_syllabusFiltered.map((module, i) => {
          return (
            <Card key={i}>
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
                    <Box display="flex" className={styles.moduleProgress}>
                      <Typography variant="caption" color="textSecondary">
                        MODULE{' '}
                        <Typography
                          variant="caption"
                          color="textPrimary"
                          fontWeight="500"
                        >
                          {module.ui_sequence_number}
                        </Typography>
                      </Typography>
                      {module?.progress_status === 'NOT_STARTED' ? (
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          component="div"
                          fontStyle="italic"
                        >
                          {'Not Started'}
                        </Typography>
                      ) : (
                        <>
                          {module?.progress_percent >= 0 && (
                            <Box className={styles.progressWrapper}>
                              <ProgressBar value={module?.progress_percent} />
                            </Box>
                          )}
                        </>
                      )}
                    </Box>
                    <Typography variant="body2" className={styles.moduleTitle}>
                      {module.title}
                    </Typography>
                    <Box className={styles.lessonsCount}>
                      <Button
                        className={cx([
                          styles.viewIcons,
                          expanded === i ? styles.expandIcon : '',
                        ])}
                      >
                        <ArrowForwardIosIcon className={styles.smallIcon} />
                      </Button>
                      <Typography
                        className={styles.lessonsCountText}
                        variant="caption"
                        color="textSecondary"
                      >
                        {module?.module_contents?.length} Lessons:
                      </Typography>
                      <ContentCount
                        displayTitle={false}
                        customClass={styles.count}
                        course={module}
                      />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails className={styles.details}>
                    <ModuleLessons
                      index={i}
                      lessons={[
                        ...module.module_contents.sort(
                          (a, b) => a.module_seq - b.module_seq
                        ),
                      ]}
                    />
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          );
        })}

      {course_syllabus_assessments &&
        course_syllabus_assessments.map((assessment, i) => {
          return (
            <Card
              key={i}
              className={cx([
                styles.OverviewCard,
                router?.query?.seq_id === 'assessment_overview' &&
                  styles.OverviewCardSelected,
              ])}
            >
              <CardContent>
                <Box
                  onClick={() =>
                    router.push(
                      `/courses/${router?.query?.course_id}/lesson/assessment_overview`
                    )
                  }
                  flex={1}
                  px={2}
                  py={1}
                >
                  <Box display="flex" className={styles.moduleProgress}>
                    <Typography variant="caption" color="textSecondary">
                      ASSESSMENT{' '}
                      <Typography
                        variant="caption"
                        color="textPrimary"
                        fontWeight="500"
                      >
                        {i + 1}
                      </Typography>
                    </Typography>
                    {assessment?.progress_status && (
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        component="div"
                        fontStyle="italic"
                      >
                        {assessment?.progress_status === 'NOT_STARTED'
                          ? 'Not Started'
                          : 'Completed'}
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="body2" className={styles.moduleTitle}>
                    {assessment.title}
                  </Typography>
                  <Box className={styles.lessonsCount}>
                    <AssessmentDetails
                      customClass={styles.count}
                      assessment={assessment}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          );
        })}
    </Box>
  );
};

export default StructureList;
