import cx from 'classnames';
import React from 'react';
import StarRatings from 'react-star-ratings';

import useStyles from './Rating.styles';

const Rating = ({ rating, customClass = '', starSpacing = 0, ...props }) => {
  const styles = useStyles();
  return (
    <StarRatings
      name="rating"
      rating={rating || 0}
      starSpacing={`${starSpacing}px`}
      numberOfStars={5}
      starDimension="12px"
      starRatedColor="#FF9E30"
      className={cx(styles.starRating, customClass)}
    />
  );
};

export default Rating;
