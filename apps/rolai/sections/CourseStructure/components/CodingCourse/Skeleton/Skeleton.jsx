import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import React from 'react';

const CardSkeletonItem = () => (
  <Stack flex={1}>
    <Box flex={1}>
      <Skeleton
        variant="rectangular"
        style={{ borderRadius: '5px', flex: 1 }}
        height={80}
      />
    </Box>
    <Box display="flex" m={3}>
      <Box flex={1}>
        <Skeleton
          variant="rectangular"
          style={{ borderRadius: '5px', margin: '10px 0px 20px 0px', flex: 1 }}
          height={330}
        />
        <Skeleton
          variant="rectangular"
          style={{ borderRadius: '5px', margin: '10px 0px', flex: 1 }}
          height={330}
        />
      </Box>
      <Box pl={5}>
        <Skeleton
          variant="rectangular"
          style={{ borderRadius: '5px', margin: '10px 0px' }}
          width={300}
          height={680}
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
    }}
  >
    {[0].map((item) => (
      <CardSkeletonItem key={item} />
    ))}
  </div>
);

export default CardSkeleton;
