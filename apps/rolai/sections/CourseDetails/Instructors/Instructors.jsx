import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import React from 'react';

import { CourseIcon } from '../../../common/images';
import AuthorDetails from '../../../components/AuthorDetails/AuthorDetails';
import Button from '../../../components/Button/Button';
import useStyles from './Instructors.styles';

const Instructors = ({}) => {
  const styles = useStyles();
  return (
    <Box className={styles.instructors}>
      <Typography variant="h4" pb={2}>
        Instructors
      </Typography>
      <Box className={styles.instructorsDetails}>
        <Image
          src={CourseIcon}
          width={100}
          height={100}
          className={styles.instructorImage}
        />
        <Typography component="div" className={styles.instructorsContent}>
          <Typography variant="subtitle2">{'Dr. Stacey Syphus'}</Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            component="p"
            pb={2}
          >
            {'Assistant professor of computer science at Stanford University'}
          </Typography>
          <Typography>
            <Typography variant="subtitle2" component="span">
              Teaches 5 lessons
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              component="span"
            >
              {' '}
              {'In this course'}
            </Typography>
          </Typography>
          <Button variant="text">Link to Bio</Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Instructors;
