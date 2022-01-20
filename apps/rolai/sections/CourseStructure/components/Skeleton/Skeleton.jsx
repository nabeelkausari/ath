import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import React from 'react';

const CardSkeletonItem = () => (
  <Stack margin={3} flex={1}>
    <Box display="flex">
      <Box pr={2}>
        <Skeleton
          variant="rectangular"
          style={{ borderRadius: '5px', margin: '10px 0px' }}
          width={400}
          height={40}
        />
        <Skeleton
          variant="rectangular"
          style={{ borderRadius: '5px', margin: '10px 0px' }}
          width={400}
          height={150}
        />
        <Skeleton
          variant="rectangular"
          style={{ borderRadius: '5px', margin: '10px 0px' }}
          width={400}
          height={150}
        />
        <Skeleton
          variant="rectangular"
          style={{ borderRadius: '5px', margin: '10px 0px' }}
          width={400}
          height={150}
        />
      </Box>
      <Box flex={1}>
        <Skeleton
          variant="rectangular"
          style={{ borderRadius: '5px', margin: '10px 0px', flex: 1 }}
          height={520}
        />
      </Box>
    </Box>
  </Stack>
);

const CardSkeleton = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    }}
  >
    {[0].map((item) => (
      <CardSkeletonItem key={item} />
    ))}
  </div>
);

export default CardSkeleton;
