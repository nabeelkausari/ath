import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  header: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 2,
    wordBreak: 'break-word',
    overflow: 'hidden',
    fontWeight: '500',
  },
}));

export default useStyles;
