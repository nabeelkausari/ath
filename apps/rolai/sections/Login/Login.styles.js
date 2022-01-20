import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => {
  return {
    loginContainer: {
      display: 'flex',
      // width: theme.breakpoints
    },
    loginSubContent: {
      textAlign: 'center',
    },
    loginRightPanel: {
      width: '50%',
      display: 'flex',
      alignItems: 'center',
    },
    loginRightPanelConatiner: {},
    closeIconImage: {
      cursor: 'pointer',
    },
  };
});

export default useStyles;
