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
  cardTitle: {
    maxWidth: '90%',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  root: {
    width: 280,
    borderRadius: 15,
    padding: theme.spacing(1.5, 2.5),
    margin: theme.spacing(2, 2, 2, 1),
    boxShadow: '0px 2px 5px #153B7D14',
    cursor: 'pointer',
  },
  icon: {
    minWidth: '16px',
    marginLeft: 1,
  },
  cardData: {
    '&:last-child': {
      padding: theme.spacing(0),
    },
    '& h4': {
      width: '90%',
    },
  },
  read: {
    opacity: 0.7,
    fontSize: '75%',
  },
}));

export default useStyles;
