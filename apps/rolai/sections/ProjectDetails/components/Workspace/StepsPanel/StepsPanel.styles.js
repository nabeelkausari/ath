import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { PALETTE_YELLOW_MAIN } from '../../../../../config/theme';
import {
  FLYOUT_TOP,
  FLYOUT_TOP_NON_PROJECT,
} from '../FunctionsFlyout/FunctionsFlyout.styles';

export const STEPS_PANEL_WIDTH = 290;
export const STEPS_PANEL_HEADER_HEIGHT = 57;
export const NON_PROJECT_TOP_MARGIN = 35;
export const STEPS_PANEL_HEIGHT_PX = `calc(100vh - ${FLYOUT_TOP + 87}px)`;
export const STEPS_PANEL_HEIGHT_NON_PROJECT_PX = `calc(100vh - ${
  FLYOUT_TOP_NON_PROJECT + NON_PROJECT_TOP_MARGIN + 87
}px)`;
const useStyles = makeStyles((theme) => ({
  stepsPanelWrapper: {
    position: 'relative',
    width: STEPS_PANEL_WIDTH,
    borderRadius: 15,
    background: '#fff',
    border: '1px solid #EBEEF1',
    marginLeft: theme.spacing(4.4),
    marginRight: theme.spacing(4.4),
    transition: 'width .4s ease-in',
  },
  stepsPanelWrapperNonProject: {
    marginTop: NON_PROJECT_TOP_MARGIN,
  },
  stepsPanelWrapperClosed: {
    width: 0,
    border: 0,
  },
  appBarWrapper: {
    boxShadow: 'none',
    background: 'transparent',
    borderBottom: '1px solid #EAEDF1',
    padding: theme.spacing(1, 1, 0, 1),
    '& button': {
      textTransform: 'capitalize',
    },
  },
  stepsToggleBtn: {
    position: 'absolute',
    left: -20,
    top: 17,
    right: 0,
    backgroundColor: theme.palette.secondary.dark,
    width: 20,
    height: 30,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'right .4s ease-in',
  },
  stepsToggleBtnClosed: {
    left: 'unset',
    right: -28,
  },
  stepsToggleIcon: {
    width: 12,
    height: 12,
    transform: 'rotate(180deg)',
    marginLeft: -5,
  },
  stepsToggleIconClosed: {
    transform: 'rotate(0deg)',
    marginRight: -8,
  },
  noteSection: {
    // width: 290,
  },
  tabPanelWrapper: {
    height: STEPS_PANEL_HEIGHT_PX,
    overflow: 'auto',
    '& .MuiPaper-root': {
      // width: STEPS_PANEL_WIDTH,
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
  tabPanelWrapperNonProject: {
    height: `calc(${STEPS_PANEL_HEIGHT_NON_PROJECT_PX} - 60px)`,
  },
  notesCount: {
    width: 17,
    height: 17,
    fontSize: 10,
    color: 'white',
    borderRadius: 50,
    background: PALETTE_YELLOW_MAIN,
    textAlign: 'center',
  },
  overviewSection: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
  milestone__button: {
    height: '24px !important',
    minWidth: '24px !important',
    color: '#5064E3 !important',
    background: '#DEE3FF !important',
    padding: '0 !important',
    margin: `${theme.spacing(0, 0.5)} !important`,
    '&:hover': {
      color: '#5064E3 !important',
      background: '#FFFFFF !important',
      border: '1px solid #5064E3 !important',
    },
  },
  active: {
    color: 'white !important',
    background: '#5064E3 !important',
  },
  stepsFooter: {
    height: 60,
    padding: theme.spacing(1, 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepsFooterPopover: {
    top: -10,
    '& .MuiPopover-paper': {
      borderRadius: 15,
      boxShadow: '0px 4px 25px #153B7D14',
      paddingVertical: 5,
    },
    '& .MuiTypography-root': {
      fontSize: 14,
    },
  },
}));

export default useStyles;
