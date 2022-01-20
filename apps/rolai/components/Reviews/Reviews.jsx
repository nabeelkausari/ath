import Typography from '@mui/material/Typography';
import React from 'react';

import useStyles from './Reviews.styles';

const Reviews = (props) => {
  const { reviews, customClass } = props;
  const styles = useStyles();

  return (
    <Typography variant="caption" component="div" className={customClass}>
      {reviews} Reviews
    </Typography>
  );
};

export default Reviews;
