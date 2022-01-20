import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  accreditation: {},
  content: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  accreditationContent: {
    width: '70%',
    paddingRight: theme.spacing(4),
  },
  root: {
    width: 280,
    minHeight: 300,
    borderRadius: 15,
    margin: theme.spacing(2, 0),
    boxShadow: '0px 5px 25px #153B7D0F',
    '& .MuiCardContent-root:last-child': {
      alignItems: 'center',
    },
  },
  list: {
    padding: theme.spacing(1, 0),
  },
  recommendContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  recommendContent: {
    // width: '35%',
    padding: theme.spacing(1, 0),
  },
}));

export default useStyles;
