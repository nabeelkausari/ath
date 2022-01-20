import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useRouter } from 'next/router';
import React from 'react';

import CardDescription from '../../../components/CardDescription/CardDescription';
import CardTitle from '../../../components/CardTitle/CardTitle';
import CoursePill from '../../../components/CoursePill/CoursePill';
import useStyles from './ExploreProjectCard.styles';

const ExploreProjectCard = ({ item }) => {
  const styles = useStyles();
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/projects/${item.id}`)}
      className={styles.root}
    >
      <CardContent className={styles.cardData}>
        <CoursePill label={item.categories[0]} />
        <CardTitle title={item?.title} customClass={styles.title} />
        {item?.overview && <CardDescription description={item.overview} />}
      </CardContent>
    </Card>
  );
};

export default ExploreProjectCard;
