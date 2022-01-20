import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import React from 'react';

const CardSkeletonItem = () => (
  <Stack marginY={3} spacing={6}>
    <Skeleton
      variant="rectangular"
      style={{ borderRadius: '15px' }}
      width={1080}
      height={420}
    />
    <Skeleton
      variant="rectangular"
      style={{ borderRadius: '15px' }}
      width={1080}
      height={50}
    />
    <Skeleton
      variant="rectangular"
      style={{ borderRadius: '15px' }}
      width={1080}
      height={200}
    />
  </Stack>
);

const CardSkeleton = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    {[0].map((item) => (
      <CardSkeletonItem key={item} />
    ))}
  </div>
);

export default CardSkeleton;
