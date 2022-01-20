import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import React from 'react';

const CardSkeletonItem = () => (
  <Stack marginY={3} spacing={2}>
    <Skeleton
      variant="rectangular"
      style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
      width={340}
      height={50}
    />
    <Skeleton
      variant="rectangular"
      style={{
        borderBottomLeftRadius: '15px',
        borderBottomRightRadius: '15px',
      }}
      width={340}
      height={200}
    />
    <Skeleton
      variant="rectangular"
      style={{ borderRadius: '50px' }}
      width={100}
      height={40}
    />
  </Stack>
);

const CardSkeleton = ({ cards = 3 }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    {[...Array(cards)].map((item, i) => (
      <CardSkeletonItem key={i} />
    ))}
  </div>
);

export default CardSkeleton;
