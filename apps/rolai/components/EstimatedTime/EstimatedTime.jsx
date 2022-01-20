import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import React from 'react';

import { EstimatedTimeIcon } from '../../common/images';
import { toHM } from '../../utils/helpers/helperFunctions';
import useStyles from './EstimatedTime.styles';

const EstimatedTime = ({ seconds, ...props }) => {
  const styles = useStyles();
  return (
    <Box className={styles.timeContainer}>
      <Box className={styles.clockWrapper}>
        <Image src={EstimatedTimeIcon} width={17} height={17} />
      </Box>
      <Box pl={1}>
        <Typography variant="caption" color="textSecondary">
          Estimated Time
        </Typography>
        <Typography variant="subtitle2" color="textPrimary">
          {toHM(seconds || 0)}
        </Typography>
      </Box>
    </Box>
  );
};

export default EstimatedTime;
