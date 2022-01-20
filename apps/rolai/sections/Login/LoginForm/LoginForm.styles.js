import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  loginActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0),
    marginTop: theme.spacing(1),
  },
  loginSubTitle: {
    color: 'rgba(0, 0, 0, 0.6)',
  },
  forgotPassword: {
    color: theme.palette.primary.main,
  },
  passwordVisiblity: {
    color: theme.palette.primary.main,
  },
  loginError: {
    backgroundColor: alpha(theme.palette.error.light, 0.1),
    padding: theme.spacing(1.5),
    borderRadius: theme.spacing(2),
    color: theme.palette.error.main,
    fontSize: '14px',
    marginTop: theme.spacing(-1),
  },
  root: {
    width: '100%',
  },
  email: {
    '& label': {
      fontSize: 12,
      width: 31,
      height: 16,
    },
  },
  password: {
    '& label': {
      fontSize: 12,
      width: 54,
      height: 16,
    },
  },
}));

export default useStyles;
