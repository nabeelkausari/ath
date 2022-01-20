import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  appBarWrapper: {
    boxShadow: 'none',
    background: 'transparent',
    borderRadius: 0,
    padding: theme.spacing(1, 1, 0, 1),
    '& button': {
      textTransform: 'capitalize',
      fontWeight: 400,
    },
  },
  radioButtons: {
    '& > div': {
      padding: theme.spacing(2, 0),
      display: 'flex',
    },
  },
  catergory: {
    width: '50%',
    height: 35,
    margin: theme.spacing(0.5, 0, 2, 0),
  },
  fileUploader: {
    fontSize: 12,
    border: '1px dashed #B5BAD1',
    padding: theme.spacing(2),
    textAlign: 'center',
    borderRadius: 20,
    '& p': {
      fontSize: 12,
    },
    '& li': {
      listStyle: 'none',
    },
  },
}));

export default useStyles;
