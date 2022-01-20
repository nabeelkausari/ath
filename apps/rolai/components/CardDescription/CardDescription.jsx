import Typography from '@mui/material/Typography';
import cx from 'classnames';
import React from 'react';

import useStyles from './CardDescription.styles';

const CardDescription = ({ description = '', customClass = '' }) => {
  const styles = useStyles();

  return (
    <Typography
      component="p"
      variant="body2"
      className={cx(styles.content, customClass)}
    >
      {description}
    </Typography>
  );
};

export default CardDescription;
