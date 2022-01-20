import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import {
  FLYOUT_TOP,
  FLYOUT_TOP_NON_PROJECT,
} from '../FunctionsFlyout/FunctionsFlyout.styles';
import { LEFT_PANEL_Z_INDEX } from '../LeftPanel/LeftPanel.styles';
import {
  NON_PROJECT_TOP_MARGIN,
  STEPS_PANEL_HEADER_HEIGHT,
  STEPS_PANEL_HEIGHT_NON_PROJECT_PX,
  STEPS_PANEL_HEIGHT_PX,
  STEPS_PANEL_WIDTH,
} from '../StepsPanel/StepsPanel.styles';

const OUTPUT_HEADER_HEIGHT = 136;

const useStyles = makeStyles((theme) => ({
  OutputWrapper: {
    // height: 'calc(100vh - 585px)',
    overflow: 'auto',
    padding: theme.spacing(1, 3),
  },
  flyout: {
    top: FLYOUT_TOP,
    height: `calc(${STEPS_PANEL_HEIGHT_PX} + ${
      STEPS_PANEL_HEADER_HEIGHT + 4
    }px)`,
    width: `calc(50vw - ${STEPS_PANEL_WIDTH / 2 + 15}px)`,
    zIndex: LEFT_PANEL_Z_INDEX - 2,

    '&.flyout-container--2': {
      zIndex: LEFT_PANEL_Z_INDEX,
    },

    '&.flyout-container--full-screen': {
      height: '100vh',
      width: '100vw',
      top: 0,
      zIndex: 9999,

      '& .tab-panel-wrapper': {
        height: `calc(100vh - ${OUTPUT_HEADER_HEIGHT}px)`,
        overflow: 'auto',

        '&__step-details': {
          height: `calc(100vh - ${OUTPUT_HEADER_HEIGHT - 78}px)`,
        },
      },
    },

    '& .step-flyout-container__title': {
      flex: 1,
    },
    '& .step-flyout-container__content': {
      padding: 10,
      height: `calc(${STEPS_PANEL_HEIGHT_NON_PROJECT_PX} - ${
        OUTPUT_HEADER_HEIGHT - STEPS_PANEL_HEADER_HEIGHT - 82
      }px)`,
      overflow: 'auto',
    },
  },
  flyoutNonProject: {
    top: FLYOUT_TOP_NON_PROJECT + NON_PROJECT_TOP_MARGIN,
    height: `calc(${STEPS_PANEL_HEIGHT_NON_PROJECT_PX} + ${
      STEPS_PANEL_HEADER_HEIGHT + 4
    }px)`,
  },
  flyoutResultWrapper: {
    height: `calc(${STEPS_PANEL_HEIGHT_PX} - ${
      OUTPUT_HEADER_HEIGHT - STEPS_PANEL_HEADER_HEIGHT
    }px)`,
    overflow: 'auto',
    // '& .MuiPaper-root': {
    //   width: STEPS_PANEL_WIDTH,
    //   position: 'relative',
    //   border: 'none',
    //   boxShadow: 'none',
    //   marginTop: theme.spacing(0),
    //   '& .MuiBox-root:first-child': {
    //     '& svg': {
    //       display: 'none',
    //     },
    //   },
    // },
  },
  flyoutResultWrapperNonProject: {
    height: `calc(${STEPS_PANEL_HEIGHT_NON_PROJECT_PX} - ${
      OUTPUT_HEADER_HEIGHT - STEPS_PANEL_HEADER_HEIGHT
    }px)`,
  },
  flyoutAccordion: {
    '&.MuiPaper-root': {
      borderRadius: 10,
      boxShadow: 'none',
      color: alpha('#000', 0.7),
      padding: theme.spacing(0.5, 2),
      border: '1px solid #E0E3E9',
      marginBottom: 10,

      '&:before': {
        display: 'none',
      },
    },
    '& .MuiAccordionDetails-root, .MuiAccordionSummary-root': {
      padding: 0,
    },
    '&.Mui-expanded': {
      '& .step-flyout-accordion-icon': {
        transform: 'rotate(90deg)',
      },
    },
    '& .step-flyout-accordion-icon': {
      backgroundColor: '#FFF',
      borderRadius: '50%',
      border: '1px solid #5064E3',
      padding: 1,
      transition: 'transform 0.2s',
      marginRight: 10,
      color: theme.palette.primary.main,
      marginLeft: 'auto',
    },
  },
}));

export default useStyles;
