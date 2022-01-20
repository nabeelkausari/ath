import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  inputContainer: {
    padding: theme.spacing(1, 0),
  },
  inputField: {
    width: '100%',
    borderRadius: 25,
    position: 'relative',
    border: '1px solid #ced4da',
    padding: theme.spacing(1, 3),
    margin: theme.spacing(1, 0, 0, 0),
    backgroundColor: theme.palette.common.white,
    '&.MuiInputBase-multiline': {
      height: 'unset',
      borderRadius: 10,
      padding: 16,
    },
    '&.Mui-error': {
      borderColor: theme.palette.error.main,
    },
    '&::before': {
      borderBottom: 0,
    },
    '&::after': {
      borderBottom: 0,
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: 0,
    },
  },
}));

export default useStyles;
