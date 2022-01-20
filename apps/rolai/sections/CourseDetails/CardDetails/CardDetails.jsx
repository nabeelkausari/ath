import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import cx from 'classnames';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

import { futureskills_logo } from '../../../common/images';
import CardTitle from '../../../components/CardTitle/CardTitle';
import ContentCount from '../../../components/ContentCount/ContentCount';
import CourseEnroller from '../../../components/Course/CourseEnroller';
import Level from '../../../components/Level/Level';
import ListData from '../../../components/ListData/ListData';
import Rating from '../../../components/Rating/Rating';
import Reviews from '../../../components/Reviews/Reviews';
import useStyles from './CardDetails.styles';

const CardDetails = ({ isTrack = false, course, ...props }) => {
  const styles = useStyles();
  return (
    <Card className={styles.root}>
      <CardContent className={styles.cardList}>
        <CardContent className={styles.contentBlock}>
          <CardTitle title={course.title} customClass={styles.cardTitle} />
          {!isTrack ? (
            <>
              <Box className={cx(styles.BoxflexWrap)} pb={2.5}>
                <Level level={course.level} />
                <Box className={styles.rating}>
                  <Rating rating={course.avg_rating} starSpacing={1} />
                </Box>
                <Reviews
                  reviews={course.reviews}
                  customClass={styles.reviewDetails}
                />
              </Box>
              <ContentCount course={course} customClass={styles.contentCountTrack} />
            </>
          ) : (
            <Box
              className={cx(styles.BoxflexWrap, styles.courseStatus)}
              pt={0.5}
              pb={2.5}
            >
              <Level level={course.level} customClass={styles.level} />
              <ContentCount course={course} customClass={styles.contentCount} />
            </Box>
          )}
          <Typography className={styles.learnText}>
            {course?.overview?.header}
          </Typography>
          <ListData data={course?.overview?.data} />
          {/* <Box className={styles.cardList} py={2}>
            <AuthorDetails />
            <AuthorDetails />
          </Box> */}
          <CardActions>
            <CourseEnroller course={course} />
            {course.has_certificate && (
              <Box className={styles.recommendContainer}>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  component="div"
                  className={styles.recommend}
                >
                  Certificate Recommended & Validated by
                </Typography>
                <Image src={futureskills_logo} width={65} height={30} />
              </Box>
            )}
          </CardActions>
        </CardContent>
        <CardContent>
          <Box
            style={{ backgroundImage: `url(${course.background_image})` }}
            className={styles.rightImage}
          />
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default CardDetails;
