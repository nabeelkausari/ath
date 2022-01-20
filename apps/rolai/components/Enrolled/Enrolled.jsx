import Typography from '@mui/material/Typography';
import Image from 'next/image';
import React from 'react';

import { EnrolledIcon } from '../../common/images';
import useStyles from './Enrolled.styles';

const Enrolled = (props) => {
  const styles = useStyles();

  return (
    <Typography variant="subtitle2" className={styles.enrolled}>
      <Image src={EnrolledIcon} width={12} height={12} />
      Enrolled
    </Typography>
  );
};

export default Enrolled;
