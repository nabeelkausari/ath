import { Button, Skeleton, Stack } from '@mui/material';

const CardSkeleton = ({
  height = '13vh',
  width = '100%',
  borderRadius = 2,
  variant = 'rectangular',
  cards = 1,
  horizantal = false,
  direction = 'column',
  sx = {},
}) => (
  <Stack spacing={2.5} width={'100%'} direction={direction} sx={sx}>
    {Array.from({ length: cards }).map((item, k) => (
      <Skeleton
        key={k}
        height={height}
        width={width}
        variant={variant}
        sx={{ borderRadius }}
      />
    ))}
  </Stack>
);

export default CardSkeleton;
