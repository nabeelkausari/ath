import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  radioButtons: {
    '& > div': {
      padding: theme.spacing(2, 0),
      display: 'flex',
    },
  },
  fileUploader: {
    fontSize: 12,
    border: '1px dashed #B5BAD1',
    padding: theme.spacing(2),
    textAlign: 'center',
    borderRadius: 20,
    cursor: 'pointer',
    '& p': {
      fontSize: 12,
    },
    '& li': {
      listStyle: 'none',
    },
  },
}));

export default useStyles;
