import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useRouter } from 'next/router';
import React from 'react';

import CardTitle from '../../../components/CardTitle/CardTitle';
import CourseCaseCount from '../../../components/CourseCaseCount/CourseCaseCount';
import Enrolled from '../../../components/Enrolled/Enrolled';
import Level from '../../../components/Level/Level';
import useStyles from './ExploreTrackCard.styles';

const ExploreTrackCard = ({ item }) => {
  const styles = useStyles();
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(`/tracks/${item.id}`)}
      className={styles.root}
    >
      <CardContent className={styles.cardData}>
        <Box style={{ minHeight: 45 }} className={styles.flexBetween}>
          <CardTitle title={item?.title} />
          {item.status === 'ENROLLED' && <Enrolled />}
        </Box>
        <Box className={styles.flexBetween}>
          <Level level={item?.level} />
          {item?.description && <CourseCaseCount count={item?.description} />}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExploreTrackCard;
