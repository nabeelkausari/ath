import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import React from 'react';

const CardSkeleton = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <Stack margin={3}>
      <Box display="flex">
        <Box pr={10}>
          <Skeleton
            variant="rectangular"
            style={{ borderRadius: '5px', marginBottom: '10px' }}
            width={250}
            height={40}
          />
          <Skeleton
            variant="rectangular"
            style={{ borderRadius: '5px', margin: '10px 0px' }}
            width={450}
            height={200}
          />
        </Box>
        <Box mt={5}>
          <Skeleton
            variant="rectangular"
            style={{ borderRadius: '5px', margin: '10px 0px' }}
            width={600}
            height={100}
          />
          <Skeleton
            variant="rectangular"
            style={{ borderRadius: '5px', margin: '10px 0px' }}
            width={600}
            height={200}
          />
        </Box>
      </Box>
    </Stack>
  </div>
);

export default CardSkeleton;
