import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  OutputWrapper: {
    height: 'calc(100vh - 560px)',
    overflow: 'auto',
    padding: theme.spacing(0, 2),
    '& pre': {
      fontSize: 13,
    },
  },
  OutputHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 3),
  },
  previewWrapper: {
    fontSize: 14,
    fontWeight: 500,
  },
  expandIcon: {
    cursor: 'pointer',
  },
  common: {
    fontSize: 14,
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
    marginBottom: 0,
    overflow: 'initial',
    color: 'black',
    '& img': {
      maxWidth: '100%',
    },
  },
  showcode: {
    fontSize: 14,
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
    marginBottom: 0,
    overflow: 'initial',
    color: 'black',
  },
  show__hint_data: {
    padding: theme.spacing(2),
    margin: theme.spacing(1, 0),
    marginBottom: 0,
    color: 'black',
    overflow: 'auto',
    borderRadius: 4,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    fontSize: 14,
  },
  out: {
    color: 'cornflowerblue',
    fontSize: 14,
  },
  error: {
    color: 'red',
    fontSize: 14,
  },
  success: {
    color: 'green',
    width: 'auto',
    fontSize: 14,
  },
  outputContainer: {},
}));

export default useStyles;
