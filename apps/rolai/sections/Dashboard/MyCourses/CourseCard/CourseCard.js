import { Button, Card, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import CourseEnroller from '../../../../components/Course/CourseEnroller';
import Level from '../../../../components/Level/Level';
import { toHM, toHMS } from '../../../../utils/helpers/helperFunctions';
import { TrackEnroller } from '../../../MyOrganisation/Tracks/Tracks';

import {
  CourseBlock,
  ProgressBar,
} from '../../Components/DashboardComponents/DashboardComponents';
import useStyles from './CourseCard.styles';
import { EnrolledIcon } from '../../../../common/images';

const CourseCard = ({ item = {}, type = 'TRACK' }) => {
  const styles = useStyles();
  const {
    title,
    level,
    progress_percent,
    description,
    course_id,
    detail,
    progress_status,
  } = item;
  console.log(item);
  return (
    <Card className={styles.parent}>
      {false && <Box className={styles.org}>Organization</Box>}
      <Box>
        <Tooltip title={title} placement="top" arrow>
          <Box className={styles.heading}>{title}</Box>
        </Tooltip>

        <Box mb={2} display="flex" flexWrap="wrap" alignItems="center">
          <Box mr={2}>
            <Level level={level} />
          </Box>
          {type == 'TRACK' && <CourseBlock value={description} />}
          <Box display="flex" mt={type == 'TRACK' ? 2 : 0}>
            {progress_status === 'COMPLETED' ? (
              <Box>
                <Image src={EnrolledIcon} />{' '}
                <span style={{ fontSize: 12, marginLeft: 2 }}>Completed</span>
              </Box>
            ) : (
              <>
                <ProgressBar value={progress_percent} />
                <Box className={styles.remaining}>
                  {toHM(item.estimated_duration_sec || 0)} Remaining
                </Box>
              </>
            )}
          </Box>
        </Box>

        <Box className={styles.details}>
          {type == 'TRACK' ? detail : description}
        </Box>
      </Box>
      <Box className={styles.buttonBlock}>
        {/* <Button variant={'contained'}>Resume</Button> */}

        {type === 'TRACK' ? (
          <>
            {item.enrolled ? (
              <Button variant="contained" className={styles.cardButtons}>
                Resume
              </Button>
            ) : (
              <>
                <TrackEnroller id={item.track_id} link={item._links.enroll} />
              </>
            )}
          </>
        ) : (
          <CourseEnroller course={item} page="dashboard" />
        )}

        <Link
          href={
            type === 'TRACK'
              ? `/tracks/${item.track_id}`
              : `/courses/${course_id}`
          }
          passHref
        >
          <Button variant={'outlined'}>View Details</Button>
        </Link>
      </Box>
    </Card>
  );
};

export default CourseCard;
