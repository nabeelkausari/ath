import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import cx from 'classnames';
import Image from 'next/image';
import React from 'react';

import { CapIcon } from '../../common/images';
import useStyles from './CourseCaseCount.styles';

const CourseCaseCount = ({ count, customClass = '', icon = CapIcon }) => {
  const styles = useStyles();

  return (
    <Box display="flex" className={cx([styles.countSnippet, customClass])}>
      <Typography component="div" className={styles.countIcon}>
        <Image src={icon} width={16} height={16} />
      </Typography>
      <Typography className={styles.countText} variant="caption">
        {isNaN(count) ? count : `${count} courses`}
      </Typography>
    </Box>
  );
};

export default CourseCaseCount;
