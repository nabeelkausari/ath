import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import {
  FLYOUT_TOP,
  FLYOUT_TOP_NON_PROJECT,
} from '../FunctionsFlyout/FunctionsFlyout.styles';
import {
  NON_PROJECT_TOP_MARGIN,
  STEPS_PANEL_WIDTH,
} from '../StepsPanel/StepsPanel.styles';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    flex: 1,
  },
  tableContainerNonProject: {
    marginTop: NON_PROJECT_TOP_MARGIN,
  },
  tableHeader: {
    display: 'flex',
    position: 'relative',
  },
  pillContainer: {
    maxWidth: 'calc(100vw - 670px)',
    height: 60,
    paddingBottom: 5,
    overflow: 'auto',
    display: 'flex',
    alignItems: 'flex-start',
  },
  pillContainerWithAdd: {
    maxWidth: 'calc(100vw - 710px)',
  },
  buttonGroup: {},
  addDataSetIcon: {
    paddingLeft: theme.spacing(2),
    paddingTop: 5,
    cursor: 'pointer',
  },
  downloadTable: {
    position: 'absolute',
    right: 0,
    top: 5,
    cursor: 'pointer',
  },
  tablePill: {
    border: '1px solid rgb(222, 227, 255)',
    color: '#000',
    fontWeight: 'normal',
    borderRadius: 0,
    borderRight: 0,
    '&:first-child': {
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    },
    '&:last-child': {
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      borderRight: '1px solid rgb(222, 227, 255)',
    },
    '&.selected': {
      backgroundColor: '#fff',
      color: alpha(theme.palette.primary.main, 1),
    },
  },

  table: {
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 15,
    border: '1px solid #EBEEF1',
    maxHeight: `calc(100vh - ${FLYOUT_TOP + 87}px)`,
    maxWidth: `calc(100vw - ${330 + STEPS_PANEL_WIDTH}px)`,
    width: 'fit-content',
    overflow: 'auto',
    fontWeight: 'normal',
    fontSize: 13,
    transition: 'max-width .4s ease-in',

    '& table': {
      borderCollapse: 'separate',
      borderSpacing: 0,
    },

    '& thead th, thead td': {
      position: 'sticky',
      borderLeft: '1px solid #eee',
      backgroundColor: '#fff',
      top: 0,
      zIndex: 10,
      cursor: 'pointer',
      maxWidth: theme.spacing(15),
      overflow: 'hidden !important',
      textOverflow: 'ellipsis',
      padding: 9.4,
      fontSize: '13px !important',
      fontWeight: '400',

      '&.selected': {
        backgroundColor: theme.palette.secondary.main,
      },

      '&.read-only': {
        cursor: 'default',
      },
    },
    '& tbody td': {
      padding: theme.spacing(1),
      border: '1px solid #EBEEF1',
      borderRight: 0,
      borderBottom: 0,
      '&.selected': {
        backgroundColor: '#F8FAFF',
      },
    },
  },
  tableNonProject: {
    maxHeight: `calc(100vh - ${
      FLYOUT_TOP_NON_PROJECT + NON_PROJECT_TOP_MARGIN + 87
    }px)`,
  },
  tableFullWidth: {
    maxWidth: 'calc(100vw - 330px)',
  },
  tableInput: {
    color: 'rgba(80, 100, 227, 1)',
    background: '#fff',
    border: '1px solid rgba(80, 100, 227, 1) !important',
    borderRadius: 0,
    fontSize: 14,
    padding: theme.spacing(0.5, 2),
    minWidth: 'auto !important',
    marginRight: 1,
    '&::hover': {
      borderBottom: 'none !important',
    },
    '&:before': {
      borderBottom: 'none !important',
    },
    '&:after': {
      borderBottom: 'none !important',
    },
  },
}));

export default useStyles;
