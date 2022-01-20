import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  loginActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0),
    marginTop: theme.spacing(1),
  },
  backToLogin: {
    color: theme.palette.primary.main,
  },
  resetContainer:{
    width:500
  }
}));

export default useStyles;
