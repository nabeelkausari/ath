import { Card } from '@mui/material';
import Box from '@mui/material/Box';
import React, { Component } from 'react';
import Image from 'next/image';
import useStyles from './LessonComponent.styles';
import WatchIco from '../../../../assets/Dashboard/My-Library/watch.svg';
import { useRouter } from 'next/router';

const LessonComponent = ({
  course_id,
  item: { title, info, module_seq_id },
  type = 'video',
}) => {
  const styles = useStyles();
  const router = useRouter();
  return (
    <Card className={styles.parent}>
      <Box className={styles.heading}>{title}</Box>
      <Box className={styles.infoBox}>
        {type == 'reading' ? (
          <>
            <Box className={styles.info}>{info}</Box>
            <Box
              className={styles.button1}
              onClick={() =>
                router.push(`/courses/${course_id}/lesson/${module_seq_id}`)
              }
            >
              {'View lesson'}
            </Box>
          </>
        ) : (
          <>
            <Box
              className={styles.button2}
              onClick={() =>
                router.push(`/courses/${course_id}/lesson/${module_seq_id}`)
              }
            >
              <Image src={WatchIco} width={20} className={styles.watch} />
              <span> {'Watch lesson'}</span>
            </Box>
            <Box className={styles.info}>{info}</Box>
          </>
        )}
      </Box>
    </Card>
  );
};

export default LessonComponent;
