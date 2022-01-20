import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  reviewsAndFaq: {
    padding: theme.spacing(0, 6),
  },
  buttons: {
    '& .MuiButton-root': {
      width: 100,
      height: 36,
    },
  },
  root: {
    minHeight: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: theme.spacing(4, 0),
    boxShadow: '0px 5px 25px #153B7D0F',
    borderRadius: 25,
    padding: '16px 8px',
  },
  content: {
    width: '70%',
    alignSelf: 'baseline',
  },
  review: {
    fontSize: 24,
    fontWeight: 300,
    minHeight: 150,
  },
  leftQuote: {
    alignSelf: 'start',
  },
  rightQuote: {
    alignSelf: 'flex-end',
    transform: 'scaleX(-1)',
  },
}));

export default useStyles;
