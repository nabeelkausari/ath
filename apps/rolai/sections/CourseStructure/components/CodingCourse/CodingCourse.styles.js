import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  coding_container: {
    top:0,
    left: 0,
    bottom: 0,
    zIndex: 900,
    width: '100vw',
    overflow: 'auto',
    position: 'fixed',
    minHeight: '100vh',
    background: '#FFFFFF',
  },
  panel:{
    display:'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: theme.spacing(4.5),
  }
}));

export default useStyles;
