import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '18px 0',
  },
  inputs: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginRight: '20px',
  },
}));

export default useStyles;
