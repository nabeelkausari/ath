import Chip from '@mui/material/Chip';
import cx from 'classnames';
import React from 'react';

import useStyles from './Level.styles';

const Level = ({ level = '', customClass = '', ...props }) => {
  const styles = useStyles();
  const tag = level?.toLowerCase() + ' level';
  return (
    <>
      <Chip
        variant="outlined"
        size="small"
        label={tag}
        className={cx(styles.levels, customClass)}
      />
    </>
  );
};

export default Level;
