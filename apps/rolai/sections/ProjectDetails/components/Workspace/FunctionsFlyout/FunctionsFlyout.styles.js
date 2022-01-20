import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { LEFT_PANEL_Z_INDEX } from '../LeftPanel/LeftPanel.styles';

export const FLYOUT_TOP_NON_PROJECT = 56;
export const FLYOUT_TOP = 123;
export const FUNCTIONS_FLYOUT_LEFT = 230;
export const FUNCTIONS_FLYOUT_WIDTH = 350;
const useStyles = makeStyles((theme) => ({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    zIndex: LEFT_PANEL_Z_INDEX - 1,
    overflow: 'hidden',
    backgroundColor: alpha(theme.palette.common.black, 0.25),
    display: 'flex',
    alignItems: 'flex-start',
  },
  flyout: {
    position: 'absolute',
    left: FUNCTIONS_FLYOUT_LEFT,
    top: FLYOUT_TOP,
    zIndex: LEFT_PANEL_Z_INDEX,
    width: FUNCTIONS_FLYOUT_WIDTH,
    backgroundColor: '#fff',
    padding: theme.spacing(3),
    overflow: 'auto',
    height: `calc(100vh - ${FLYOUT_TOP}px)`,
  },
  flyoutNonProject: {
    top: FLYOUT_TOP_NON_PROJECT,
    height: `calc(100vh - ${FLYOUT_TOP_NON_PROJECT}px)`,
  },
  flyoutParams: {
    position: 'absolute',
    left: FUNCTIONS_FLYOUT_WIDTH + FUNCTIONS_FLYOUT_LEFT,
    top: FLYOUT_TOP,
    zIndex: LEFT_PANEL_Z_INDEX,
    width: 450,
    backgroundColor: '#fff',
    padding: theme.spacing(3),
    overflow: 'auto',
    height: `calc(100vh - ${FLYOUT_TOP}px)`,
    borderLeft: '1px solid #eee',
  },
  flyoutParamsNonProject: {
    top: FLYOUT_TOP_NON_PROJECT,
    height: `calc(100vh - ${FLYOUT_TOP_NON_PROJECT}px)`,
  },
  tableName: {
    margin: theme.spacing(0, 0.5),
    fontSize: 14,
    color: '#626262',
  },
  chips: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(0.5),
    flexWrap: 'wrap',
    alignContent: 'space-evenly',
  },
  chip: {
    margin: theme.spacing(0.5),
    '&.MuiChip-root': {
      borderRadius: '10px !important',
      backgroundColor: '#DEE3FF !important',
    },
    '& svg': {
      backgroundColor: 'transparent !important',
      fill: 'black',
    },
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold !important',
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
