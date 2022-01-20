import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useRouter } from 'next/router';
import React from 'react';

import CardTitle from '../../../components/CardTitle/CardTitle';
import CoursePill from '../../../components/CoursePill/CoursePill';
import Enrolled from '../../../components/Enrolled/Enrolled';
import Level from '../../../components/Level/Level';
import Rating from '../../../components/Rating/Rating';
import Reviews from '../../../components/Reviews/Reviews';
import useStyles from './ExploreCourseCard.styles';

const ExploreCourseCard = ({ item }) => {
  const styles = useStyles();
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/courses/${item.id}`)}
      className={styles.root}
    >
      <CardContent className={styles.cardData}>
        <Box className={styles.flexBetween}>
          <CoursePill label={item.type} />
          {item.status === 'ENROLLED' && <Enrolled />}
        </Box>
        <CardTitle title={item?.title} customClass={styles.title} />
        <Box className={styles.flexWrap}>
          <Rating rating={item?.ratingStars} />
          <Reviews reviews={item?.reviews} customClass={styles.reviews} />
        </Box>
        <Level level={item?.level} />
      </CardContent>
    </Card>
  );
};

export default ExploreCourseCard;
