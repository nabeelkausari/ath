import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import welcomeIco from '../../../../assets/Dashboard/Home/Welcome-Image.png';
import { getWhereYouLeft } from '../../../../store/dashboard/actions';
import CardSkeleton from '../../CardSkeleton/CardSkeleton';
import {
  EmptyScreen,
  DashboardHomeProgressBar,
} from '../../Components/DashboardComponents/DashboardComponents';
import HeaderComponent from '../../Components/Header/header';
import SimpleCard from '../../Components/SimpleCardDashboard/simpleCard';

import useStyles from './leftSection.styles';

const LeftSection = ({}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { my_profile, my_profile_succeeded } = useSelector(
    (state) => state.auth
  );
  const { where_you_left, where_you_left_requested } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getWhereYouLeft());
    }
  }, [my_profile_succeeded]);

  return (
    <Box className={styles.parent}>
      <Box className={styles.welcome}>
        <Box>Hello {my_profile?.name}!</Box>
        <Box>Its good to see you again</Box>
        <Box className={styles.welcomeIco}>
          <Image src={welcomeIco} />
        </Box>
      </Box>

      <HeaderComponent
        title={'CONTINUE WHERE YOU LEFT'}
        link={where_you_left[0] && '/dashboard/my-courses'}
      />
      <Box className={styles.container}>
        {where_you_left_requested || where_you_left_requested == null ? (
          <>
            <CardSkeleton cards={5} />
          </>
        ) : where_you_left[0] ? (
          where_you_left.map((item, k) => (
            <SimpleCard
              key={k}
              item={{
                ...item,
                description: item.lastAccessContentTitle,
                type:
                  item.resourceType === 'TRACK' ? 'Learning Track' : 'Course',
                pillColor:
                  item.resourceType === 'TRACK' ? '#1F7044' : '#AA8713',
                pillBg: item.resourceType === 'TRACK' ? '#D8F9E7' : '#F9F0D1',
                heading: item.title,
              }}
              RightComponent={() => RightComponent({ item })}
            />
          ))
        ) : (
          <EmptyScreen name="WHERE_LEFT" style={{ height: '65.1vh' }} />
        )}
      </Box>
    </Box>
  );
};

export default LeftSection;

const RightComponent = ({ item }) => {
  const styles = useStyles();
  const router = useRouter();
  return (
    <>
      <DashboardHomeProgressBar value={item.progressPercent || 0} />
      <Button
        variant={'outlined'}
        className={styles.resumeBtn}
        onClick={() =>
          item.resourceType === 'COURSE'
            ? router.push(
                `/courses/${item.courseId}/lesson/${item.moduleSeqId}`
              )
            : router.push(`/tracks/${item.trackId}`)
        }
      >
        {item.resourceType === 'TRACK' ? 'View Details' : 'Resume'}
      </Button>
    </>
  );
};
