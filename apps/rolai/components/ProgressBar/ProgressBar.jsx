import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

import useStyles from './ProgressBar.styles';

const ProgressBar = ({ isText = true, value = 0 }) => {
  const styles = useStyles();
  if (isNaN(value)) value = 0;
  return (
    <Box display="flex" alignItems="center">
      <Box className={styles.root}>
        <LinearProgress variant="determinate" value={value} />
      </Box>
      {isText && (
        <Box minWidth={28}>
          <Typography variant="caption" color="textPrimary">{`${Math.round(
            value
          )}%`}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProgressBar;
