import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

import { reviews_quote } from '../../../../common/images';
import Rating from '../../../../components/Rating/Rating';
import useStyles from './Reviews.styles';

const Reviews = ({ reviews, course }) => {
  const styles = useStyles();

  if (!reviews) return null;
  const [review] = reviews;
  if (!review) return null;
  return (
    <Box className={styles.reviews}>
      <Card className={styles.root}>
        <CardContent className={styles.leftQuote}>
          <Image src={reviews_quote} width={76} height={50} />
        </CardContent>
        <CardContent className={styles.content}>
          <Rating rating={review?.rating} starSpacing={2} />
          <Typography className={styles.review}>{review?.comment}</Typography>
          <Typography pt={2}>
            <Typography component="span" variant="body1">
              -{review?.userName},
            </Typography>
            <Typography component="span" variant="caption">
              {/* Student,  */}
              {review?.userCity}
            </Typography>
          </Typography>
        </CardContent>
        <CardContent className={styles.rightQuote}>
          <Image src={reviews_quote} width={76} height={50} />
        </CardContent>
      </Card>
      {course && (
        <Typography align="right" variant="subtitle1">
          {course?.avg_rating}
          {' rating out of '}
          <Typography color="primary" component="span" variant="subtitle2">
            {course?.reviews + ' reviews'}
          </Typography>
        </Typography>
      )}
    </Box>
  );
};
export default Reviews;
