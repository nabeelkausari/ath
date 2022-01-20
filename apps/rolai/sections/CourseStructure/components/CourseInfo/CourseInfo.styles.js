import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import {
  COURSE_STRUCTURE_NAVBAR_HEIGHT,
  NAVBAR_HEIGHT,
} from '../../../../utils/constants/styles';

const useStyles = makeStyles((theme) => ({
  courseInfo: {
    flex: 1,
    display: 'flex',
    alignItems: 'self-start',
    padding: theme.spacing(3),
    background: 'white',
  },
  leftPanel: {
    width: 200,
    borderRadius: 15,
    position: 'sticky',
    backgroundColor: '#F8F9FB',
    border: '1px solid #EBEEF1',
    top: `${80 + NAVBAR_HEIGHT + COURSE_STRUCTURE_NAVBAR_HEIGHT}px`,
    left: 0,
    boxSizing: 'initial',
  },
  rightPanel: {
    overflow: 'auto',
    height: 'fit-content',
    borderRadius: 15,
    border: '1px solid #EBEEF1',
    margin: theme.spacing(2, 8, 5, 8),
    paddingBottom: theme.spacing(12),
    background: alpha(theme.palette.common.white, 1),
  },
}));

export default useStyles;
