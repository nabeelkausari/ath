import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  learningTrack: {
    padding: theme.spacing(1, 0),
  },
  cardList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    '& > .hidden': {
      visibility: 'hidden',
      padding: 0,
      width: 340,
      margin: theme.spacing(2, 1),
      marginBottom: theme.spacing(2),
      boxShadow: '0px 4px 25px #153B7D14',
    },
  },
}));

export default useStyles;
