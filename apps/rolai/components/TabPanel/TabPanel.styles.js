import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  appBarWrapper: {
    boxShadow: 'none !important',
    background: 'transparent !important',
    borderBottom: '1px solid #EAEDF1',
    padding: theme.spacing(1, 1, 0, 1),
    '& button': {
      textTransform: 'capitalize',
    },
  },
  tabPanelWrapper: {
    height: 'calc(100vh - 210px)',
    overflow: 'scroll',
    '& .MuiPaper-root': {
      width: 290,
      position: 'relative',
      border: 'none',
      boxShadow: 'none',
      marginTop: theme.spacing(0),
      '& .MuiBox-root:first-child': {
        '& svg': {
          display: 'none',
        },
      },
    },
  },
}));

export default useStyles;
