import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  courses: {
    padding: theme.spacing(1, 0),
  },
  title: {
    minHeight: 50,
    margin: theme.spacing(1, 0),
    fontWeight: 'normal',
  },
  cardList: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexBetween: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  root: {
    width: 280,
    borderRadius: 15,
    padding: theme.spacing(1, 2.2),
    margin: theme.spacing(1),
    boxShadow: '0px 2px 5px #153B7D14',
    cursor: 'pointer',
  },
  cardData: {
    '&:last-child': {
      padding: theme.spacing(1, 0),
    },
  },
  reviews: {
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
