import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from 'next/image';
import React from 'react';

import { RightArrow } from '../../../common/images';
import Button from '../../../components/Button/Button';
import ContentCount from '../../../components/ContentCount/ContentCount';
import { toHM } from '../../../utils/helpers/helperFunctions';
import useStyles from './Syllabus.styles';

const Syllabus = ({ course, syllabus }) => {
  const styles = useStyles();
  return (
    <Box className={styles.syllabus}>
      <Typography variant="h4" pb={3.5}>
        Syllabus
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        A multi-dimensional course divided into{' '}
        <Typography component="span" color="textPrimary" fontWeight={500}>
          {course.modules_count} modules
        </Typography>{' '}
        and{' '}
        <Typography component="span" color="textPrimary" fontWeight={500}>
          {course.components_count} lessons
        </Typography>
      </Typography>

      {syllabus?.map((module, i) => (
        <Box key={i}>
          <Card className={styles.root}>
            <CardContent className={styles.cardContent}>
              <Box className={styles.leftContainer}>
                <Typography variant="body2" color="textSecondary">
                  Module
                </Typography>
                <Typography fontWeight="medium" variant="h4" color="primary">
                  {module.ui_sequence_number}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Estimated Time
                </Typography>
                <Typography variant="subtitle1" fontWeight={500}>
                  {toHM(module.estimated_duration_sec || 0)}
                </Typography>
              </Box>
              <Box className={styles.syllabusContent}>
                <Typography fontWeight="500" gutterBottom>{module.title}</Typography>
                <Typography variant="body2" color="textSecondary" pb={2}>
                  {module.description}
                </Typography>
                <Typography component="div">
                  <ContentCount
                    course={module}
                    customClass={styles.contentCount}
                  />
                </Typography>
              </Box>
              <Box alignSelf="flex-end">
                {/* <Button variant="outlined" className={styles.rightArrowBtn}>
                <Image
                  src={RightArrow}
                  width={12}
                  height={12}
                  className={styles.rightArrow}
                />
              </Button> */}
                {/*<Button variant="outlined" className={styles.rightArrowBtn}>*/}
                {/*  <ArrowForwardIosIcon className={styles.rightArrowBtnIcon} />*/}
                {/*</Button>*/}
              </Box>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};
export default Syllabus;
