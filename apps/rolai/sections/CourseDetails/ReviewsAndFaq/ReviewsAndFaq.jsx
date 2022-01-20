import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import React, { useState } from 'react';

import Faq from './Faq/Faq';
import Reviews from './Reviews/Reviews';
import useStyles from './ReviewsAndFaq.styles';

const ReviewsAndFaq = ({ reviews, course }) => {
  const styles = useStyles();
  const [tab, setTab] = useState('reviews');
  const handleTab = (e, newTab) => {
    if (newTab !== null) setTab(newTab);
  };

  return (
    <Box className={styles.reviewsAndFaq}>
      <Typography variant="h4" pb={3}>
        Reviews and FAQ
      </Typography>
      <ToggleButtonGroup
        value={tab}
        exclusive
        onChange={handleTab}
        aria-label="review and faq"
        className={styles.buttons}
      >
        <ToggleButton value="reviews" aria-label="reviews">
          Reviews
        </ToggleButton>
        <ToggleButton value="faq" aria-label="faq">
          FAQ
        </ToggleButton>
      </ToggleButtonGroup>

      {tab === 'reviews' && <Reviews reviews={reviews} course={course} />}
      {tab === 'faq' && <Faq />}
    </Box>
  );
};
export default ReviewsAndFaq;
