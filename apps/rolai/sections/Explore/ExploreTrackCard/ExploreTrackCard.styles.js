import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  courses: {
    padding: theme.spacing(1, 0),
  },
  flexBetween: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  root: {
    width: 280,
    borderRadius: 15,
    padding: theme.spacing(1.5, 2.5),
    margin: theme.spacing(2, 2, 2, 1),
    boxShadow: '0px 2px 5px #153B7D14',
    cursor: 'pointer',
  },
  cardData: {
    '&:last-child': {
      padding: theme.spacing(0),
    },
  },
}));

export default useStyles;
