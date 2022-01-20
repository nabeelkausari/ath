import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  button: {},

  inputContainer: {
    padding: theme.spacing(1, 0),
    '& .Mui-focused': {
      // border: '1px solid red !important',
      // color: 'red',
    },
  },
  parent: {
    '& textarea:after, input:after': {
      display: 'none !important',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #484850',
    },
    '& .MuiInput-root': {
      borderRadius: '10px !important',
      width: '100%',
      marginBottom: 10,
      marginTop: 5,
      border: '1px solid #B0C0D2',
      padding: '5px 10px',
      '&:before': { display: 'none' },
    },
  },
  inputField: {
    width: '100%',
    borderRadius: 10,
    position: 'relative',
    // border: '1px solid #ced4da',
    height: 30,
    // color: 'rgba(0, 0, 0, 0.6)',
    paddingTop: 0,
    fontSize: 13,

    paddingBottom: 0,
    padding: theme.spacing(0.5, 2),
    margin: theme.spacing(1, 0, 0, 0),
    backgroundColor: theme.palette.common.white,
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
    // '& div': {
    //   padding: theme.spacing(0.5, 0),
    // },
  },
  descriptionWrapper: {
    '& .MuiInputBase-multiline': {
      height: 60,
      alignItems: 'flex-start',

      overflow: 'auto !important',

      '& textarea': {
        maxHeight: '100%',
        overflow: 'auto !important',
      },
    },
  },
  select: {
    width: '50%',
    padding: 0,
    $inputField: {
      padding: theme.spacing(0.5, 2),
    },
  },
  menuItem: {
    fontSize: 13,
    padding: '5px 10px',
    minHeight: 20,
  },
  label: {
    fontSize: 13,
  },
}));

export default useStyles;
