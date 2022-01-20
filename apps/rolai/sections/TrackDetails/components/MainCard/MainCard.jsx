import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import cx from 'classnames';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

import { CapIcon, RightArrow } from '../../../../common/images';
import Button from '../../../../components/Button';
import CardDescription from '../../../../components/CardDescription/CardDescription';
import CardTitle from '../../../../components/CardTitle/CardTitle';
import CourseCaseCount from '../../../../components/CourseCaseCount/CourseCaseCount';
import Level from '../../../../components/Level/Level';
import Rating from '../../../../components/Rating/Rating';
import Reviews from '../../../../components/Reviews/Reviews';
import useStyles from './MainCard.styles';

const MainCard = ({ track, courses_count }) => {
  const styles = useStyles();
  return (
    <Card className={styles.root}>
      <CardContent className={styles.cardList}>
        <CardContent className={styles.contentBlock}>
          <CardTitle title={track.title} customClass={styles.cardTitle} />
          <Box className={cx(styles.BoxflexWrap)} pb={2.5}>
            <Level level={track.level} />
            <Box className={styles.rating}>
              <Rating rating={track.rating} starSpacing={1} />
            </Box>
            <Reviews
              reviews={track.reviews}
              customClass={styles.reviewDetails}
            />
          </Box>
          <CourseCaseCount
            count={courses_count}
            icon={CapIcon}
            customClass={styles.courseCount}
          />
          <CardDescription
            description={track.overview}
            customClass={styles.description}
          />
        </CardContent>
        <CardContent>
          <Box
            style={{ backgroundImage: `url(${track.icon_url})` }}
            className={styles.rightImage}
          />
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default MainCard;
