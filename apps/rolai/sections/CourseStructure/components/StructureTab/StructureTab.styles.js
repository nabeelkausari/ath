import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import {
  COURSE_STRUCTURE_NAVBAR_HEIGHT,
  NAVBAR_HEIGHT,
} from '../../../../utils/constants/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    position: 'relative',

    '& .MuiTab-root': {
      fontWeight: 400,
      textTransform: 'capitalize',
    },
  },
  tabContainer: {
    zIndex: 9,
    width: '100%',
    position: 'fixed !important',
    top: `${NAVBAR_HEIGHT + COURSE_STRUCTURE_NAVBAR_HEIGHT}px`,
    borderTop: '1px solid #EBEEF1',
    borderBottom: '1px solid #EBEEF1',
    backgroundColor: `${theme.palette.background.paper} !important`,
    boxShadow: 'none !important',
  },
  tabs: {
    width: '100%',
    maxWidth: 1500,
    margin: '0px auto',
    padding: theme.spacing(0, 3),
    border: 0,

    '& .MuiTab-root.Mui-selected': {
      borderBottomColor: theme.palette.highlight.main,
    },
  },
  panel: {
    display: 'flex !important',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 1500,
    width: '100%',
    margin: '0 auto !important',
    '& > .MuiBox-root': {
      width: '100%',
      padding: '0 !important',
      marginTop: `${COURSE_STRUCTURE_NAVBAR_HEIGHT + 40}px !important`,
    },
  },
}));

export default useStyles;
