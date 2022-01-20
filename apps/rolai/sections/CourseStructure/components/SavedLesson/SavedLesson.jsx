import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useRouter } from 'next/router';
import React from 'react';
import { VideosIcon } from '../../../../common/images';
import Image from 'next/image';

import CardTitle from '../../../../components/CardTitle/CardTitle';
import useStyles from './SavedLesson.styles';

const SavedLesson = ({ item, type }) => {
  const styles = useStyles();
  const router = useRouter();
  return (
    <Card className={styles.root}>
      <CardContent className={styles.cardData}>
        <Box style={{ minHeight: 45 }} className={styles.flexBetween}>
          <CardTitle title={item?.title} className={styles.cardTitle} />
        </Box>
        {!type && (
          <Typography className={styles.read} mb={2}>
            12 mins read
          </Typography>
        )}
        <Button
          style={{ paddingLeft: 0 }}
          onClick={() =>
            router.push(
              `/courses/${router?.query?.course_id}/lesson/${item.module_seq_id}`
            )
          }
        >
          View Lesson
        </Button>
      </CardContent>
    </Card>
  );
};

export default SavedLesson;
