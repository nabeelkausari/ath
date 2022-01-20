import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import StarRatings from 'react-star-ratings';

import { EnrolledIcon, TickMarkIcon } from '../../../common/images';
import Button from '../../../components/Button/Button';
import CourseEnroller from '../../../components/Course/CourseEnroller';
import Level from '../../../components/Level/Level';
import { isLoading } from '../../../utils/helpers/helperFunctions';
import MyOrganisationSection from '../MyOrganisationSection/MyOrganisationSection';
import useStyles from './Courses.styles';

const CourseCardItem = ({ item: course }) => {
  const styles = useStyles();
  const enrolled = course?._links.resume || course?._links.start;
  return (
    <Card className={styles.root}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography
            color="textPrimary"
            component="h4"
            className={styles.header}
            title={course?.title}
          >
            {course?.title}
          </Typography>
          {enrolled && (
            <Box className={styles.enrolled}>
              <Image
                src={EnrolledIcon}
                width={12}
                height={12}
              />
              <Typography variant="subtitle2" className={styles.enrolledText}>
                Enrolled
              </Typography>
            </Box>
          )}
        </Box>
        <Box mt={1} display="flex">
          {course?.level && <Level level={course?.level} />}
          <Box
            display="flex"
            justifyContent="space-between"
            className={styles.reviewBlock}
          >
            <Typography component="div">
              <StarRatings
                rating={course?.avg_rating || 0}
                starRatedColor="#FF9E30"
                starHoverColor="#FF9E30"
                numberOfStars={5}
                name="rating"
                starDimension="12px"
                className={styles.starRating}
                isSelectable="false"
                starSpacing="0px"
              />
            </Typography>
            {/*{course?.reviews && (*/}
            <Typography
              variant="caption"
              component="div"
              className={styles.reviewsCount}
              pl={1}
            >
              {course?.reviews} Reviews
            </Typography>
            {/*)}*/}
          </Box>
        </Box>
      </CardContent>
      <CardContent className={styles.listConatiner}>
        <Typography color="textPrimary" className={styles.contentHeader}>
          {course?.overview?.header}
        </Typography>
        <Typography component={'div'}>
          <List className={styles.listView}>
            <>
              {(course?.overview?.data || []).map((value, i) => (
                <ListItem className={styles.listItem} key={i}>
                  <ListItemIcon className={styles.listIcon}>
                    <Image src={TickMarkIcon} width={10} height={8} />
                  </ListItemIcon>
                  <ListItemText
                    secondary={value ? value : null}
                    className={styles.listText}
                  />
                </ListItem>
              ))}
            </>
          </List>
        </Typography>
        <Typography
          className={styles.highlights}
          color="textSecondary"
          variant="caption"
        >
          {/*{track.description}*/}
        </Typography>
      </CardContent>
      {/*<CardHeader*/}
      {/*  avatar={*/}
      {/*    <Avatar aria-label="person" className={styles.avatar}>*/}
      {/*      <Image*/}
      {/*        src={course?.background_image}*/}
      {/*        width={10}*/}
      {/*        height={10}*/}
      {/*      />*/}
      {/*    </Avatar>*/}
      {/*  }*/}
      {/*  title={course?.author.name}*/}
      {/*  subheader="Assistant professor, Stanford University"*/}
      {/*  classes={{*/}
      {/*    title: styles.personTitle,*/}
      {/*    subheader: styles.personSubHeader,*/}
      {/*  }}*/}
      {/*/>*/}
      <CardActions className={styles.courseActions}>
        <CourseEnroller course={course} />

        <Link href={`/courses/${course.course_id}`} passHref>
          <Button
            component="a"
            variant="outlined"
            className={styles.cardButtons}
          >
            View Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

const Courses = ({ viewAll = false, hideArrows }) => {
  const courses = useSelector((state) => state.courses);

  if (!courses) return null;

  const loading =
    isLoading(courses.my_org_courses_requested) &&
    (!courses.my_org_courses || courses.my_org_courses.length === 0);

  return (
    <MyOrganisationSection
      Component={CourseCardItem}
      loading={loading}
      items={courses.my_org_courses}
      viewAll={viewAll}
      hideArrows={hideArrows}
      cardHeight={490}
      viewAllLink="/my-organization/courses"
      header="Courses"
    />
  );
};

export default Courses;
