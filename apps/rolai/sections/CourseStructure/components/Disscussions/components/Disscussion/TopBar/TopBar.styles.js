import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    marginTop: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 24,
    marginLeft: 10,
  },
}));

export default useStyles;
