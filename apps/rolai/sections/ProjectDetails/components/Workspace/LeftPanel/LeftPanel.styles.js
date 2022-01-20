import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import {
  FLYOUT_TOP,
  FLYOUT_TOP_NON_PROJECT,
} from '../FunctionsFlyout/FunctionsFlyout.styles';

export const LEFT_PANEL_WIDTH = 231;
export const LEFT_PANEL_Z_INDEX = 51;

const useStyles = makeStyles((theme) => ({
  panel: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  datasetsSection: {
    '& $leftBarTitle': {
      padding: theme.spacing(2, 2, 1, 3.5),
      marginTop: 0,
    },
  },
  functionsSection: {
    paddingLeft: theme.spacing(3.5),
    paddingRight: theme.spacing(2),
  },

  datasetsBar: {
    maxHeight: `calc(100vh - ${FLYOUT_TOP + 484}px)`,
    overflow: 'auto',
    padding: theme.spacing(0, 2, 0, 3.5),
  },

  datasetsBarNonProject: {
    maxHeight: `calc(100vh - ${FLYOUT_TOP_NON_PROJECT + 480}px)`,
  },

  leftBar: {
    width: LEFT_PANEL_WIDTH,
    backgroundColor: '#fff',
    boxShadow: '0px 3px 6px #153B7D14',
    marginRight: theme.spacing(4.4),
    position: 'relative',
    zIndex: LEFT_PANEL_Z_INDEX,
    flex: 1,
    height: `calc(100vh - ${FLYOUT_TOP}px)`,
    overflow: 'auto',
  },
  leftBarNonProject: {
    height: `calc(100vh - ${FLYOUT_TOP_NON_PROJECT}px)`,
  },
  leftBarOpen: {
    width: 400,
    backgroundColor: '#fff',
    boxShadow: '0px 3px 6px #153B7D14',
    padding: 30,
    marginLeft: theme.spacing(-4.4),
  },
  leftBarTitle: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  leftBarTitleText: {
    marginLeft: `${theme.spacing(1)} !important`,
    color: '#000',
    fontWeight: 'normal',
    fontSize: '14px !important',
  },
  leftBarItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    position: 'relative',
  },
  datasetItem: {
    minHeight: 35,
    padding: theme.spacing(0, 1),
  },
  leftBarItemSelected: {
    color: theme.palette.primary.main,
    borderRadius: 15,
  },
  leftBarItemText: {
    flex: 1,
    fontWeight: 'normal',
    fontSize: '14px !important',
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer',
  },
  loading: {
    opacity: 0.5,
    cursor: 'wait',
  },
  listCountContainer: {
    position: 'absolute',
    right: theme.spacing(2),
    background:
      'linear-gradient(270deg, white, white, white, rgb(255 255 255 / 62%))',
    paddingLeft: theme.spacing(2),
  },
  listCount: {
    background: '#EEF0F8',
    borderRadius: 10,
    padding: theme.spacing(0, 0.7),
    display: 'inline-block',
    marginLeft: 'auto',
    fontSize: 12,
  },
}));

export default useStyles;
