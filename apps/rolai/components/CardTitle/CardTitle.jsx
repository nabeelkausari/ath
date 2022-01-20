import Typography from '@mui/material/Typography';
import cx from 'classnames';
import React from 'react';

import useStyles from './CardTitle.styles';

const CardTitle = ({ title = '', customClass = '' }) => {
  const styles = useStyles();
  return (
    <Typography
      component="h4"
      title={title}
      color="textPrimary"
      className={cx([styles.header, customClass])}
    >
      {title}
    </Typography>
  );
};

export default CardTitle;
