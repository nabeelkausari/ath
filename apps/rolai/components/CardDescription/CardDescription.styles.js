import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 3,
    wordBreak: 'break-word',
    overflow: 'hidden',
    fontSize: '14px !important',
  },
}));

export default useStyles;
