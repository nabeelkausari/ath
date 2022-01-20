import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  reviewsAndFaq: {},
  buttons: {
    '& .MuiToggleButton-root': {
      width: 100,
      height: 36,
      fontWeight: 400,
      borderRadius: 25,
      textTransform: 'initial',
    },
    '& .Mui-selected': {
      border: '1px solid #5064e3',
      color: 'white',
      background: theme.palette.primary.main,
    },
    '& .MuiToggleButtonGroup-grouped:not(:first-of-type)': {
      borderLeft: '1px solid #5064e3',
    },
  },
  root: {
    minHeight: 350,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: theme.spacing(4, 0),
    boxShadow: '0px 5px 25px #153B7D0F',
    borderRadius: 25,
  },
  content: {
    width: '70%',
  },
  review: {
    fontSize: 24,
    fontWeight: 300,
  },
}));

export default useStyles;
