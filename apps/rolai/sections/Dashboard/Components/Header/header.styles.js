import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    display: 'flex',
    marginTop: '1.9vh',
    padding: '0 0.26vh',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&>div:first-child': {
      fontWeight: 'bold',
      fontSize: '1.82vh',
    },
    '&>button:last-child': {
      fontSize: '1.43vh',
    },
  },
  button: {
    display: 'inline-block',
    padding: 0,
    minHeight: 0,
    minWidth: 0,
  },
}));

export default useStyles;
