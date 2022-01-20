import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  loginImage: {},
  loginContent: {
    width: '75%',
    fontWeight: '600',
    textAlign: 'center',
  },
  loginSubContent: {
    textAlign: 'center',
    width: '69%',
  },
  loginLeftPanel: {
    width: '50%',
    color: 'white',
    background: theme.palette.primary.main,
    borderRadius: '26px 0 0 26px',
    position: 'relative',
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '60px',
      height: '60px',
      borderTopLeftRadius: '25px',
      backgroundColor: '#223280',
      left: 0,
      top: 0,
    },
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '60px',
      height: '60px',
      borderTopLeftRadius: '25px',
      backgroundColor: '#223280',
      bottom: 0,
      right: 0,
    },
  },
}));

export default useStyles;
