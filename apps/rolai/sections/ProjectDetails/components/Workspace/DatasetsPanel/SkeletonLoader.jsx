import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import React from 'react';

const CardSkeletonItem = () => (
  <Stack>
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={40}
    />
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={20}
    />
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={20}
    />
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={20}
    />
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={20}
    />
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={20}
    />
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={20}
    />
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={20}
    />
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={20}
    />
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={20}
    />
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={20}
    />
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={20}
    />
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={20}
    />
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={20}
    />
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={20}
    />
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={20}
    />
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={20}
    />
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={20}
    />
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={20}
    />
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={20}
    />
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={20}
    />
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={20}
    />
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={20}
    />
    <Skeleton
      variant="rectangular"
      style={{margin:'2px', }}
      width={80}
      height={20}
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
    {[0,1,2,3,4,5,6,7,8].map((item) => (
      <CardSkeletonItem key={item} />
    ))}
  </div>
);

export default CardSkeleton;
