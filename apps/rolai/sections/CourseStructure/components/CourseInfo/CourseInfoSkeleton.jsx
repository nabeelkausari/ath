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
            style={{ borderRadius: '10px', margin: '10px 0px' }}
            width={200}
            height={250}
          />
        </Box>
        <Box>
          <Skeleton
            variant="rectangular"
            style={{ borderRadius: '10px', margin: '10px 0px' }}
            height={400}
            width={900}
          />
        </Box>
      </Box>
    </Stack>
  </div>
);

export default CardSkeleton;
