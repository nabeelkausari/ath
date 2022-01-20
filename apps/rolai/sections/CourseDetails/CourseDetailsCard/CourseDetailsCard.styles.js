import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { NAVBAR_HEIGHT } from '../../../utils/constants/styles';

const useStyles = makeStyles((theme) => ({
  cardList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  BoxflexWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline',
  },
  root: {
    borderRadius: 15,
    padding: theme.spacing(2.1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    boxShadow: '0px 4px 25px #153B7D14',
  },
  sectionBg: {
    minHeight: 450,
    padding: '58px 0 30px 0',
    background: '#FBFCFD',
  },
  sectionWhiteBg: {
    minHeight: 450,
    background: '#ffffff',
    padding: theme.spacing(6, 0),
  },
  NavFixed: {
    width: '100%',
    zIndex: 9,
    position: 'sticky',
    top: `${NAVBAR_HEIGHT + 56}px`,
    backgroundColor: '#FBFCFD',
    borderBottom: '1px solid #eff1f5',
  },
  navLink: {
    display: 'flex',
    justifyContent: 'center',
    '& .nav-links': {
      cursor: 'pointer',
      padding: theme.spacing(1, 0),
      margin: theme.spacing(0, 6),
      fontSize: '14px !important',
      opacity: 0.75,
      position: 'relative',
    },
    '& .active': {
      opacity: 1,

      '&:after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        width: '80%',
        left: '10%',
        height: '2px',
        backgroundColor: alpha(theme.palette.highlight.main, 1),
        bottom: 0,
      },
    },
  },
  CourseNav: {
    minWidth: 200,
    maxHeight: 310,
    zIndex: 0,
    borderRadius: 15,
    padding: theme.spacing(0, 1),
    backgroundColor: '#F8F9FB',
    borderBottom: '0px',
  },
  courseNavLink: {
    alignItems: 'baseline',
    flexDirection: 'column',
    fontSize: 14,
    color: 'rgba(0,0,0,0.7)',
    '& .nav-links': {
      cursor: 'pointer',
      padding: theme.spacing(1, 2),
      margin: theme.spacing(1, 0),
      borderRadius: 10,
      width: '100%',
    },
    '& .active': {
      color: theme.palette.primary.main,
      borderBottom: '0px solid transparent',
      backgroundColor: alpha(theme.palette.primary.main, 0.07),
      '&:after': {
        content: '">"',
        fontWeight: 500,
        paddingLeft: theme.spacing(1),
        marginLeft: 'auto',
        left: 'unset',
        width: 'unset',
        backgroundColor: 'unset',
        position: 'relative',
        display: 'inline-block',
      },
    },
  },
  titleHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  FixedTitleHeader: {
    width: '100%',
    zIndex: 10,
    position: 'fixed',
    top: `${NAVBAR_HEIGHT}px`,
    backgroundColor: 'white',
    padding: theme.spacing(1, 5),
    boxShadow: '0 4px 11px 0px #153b7d14',
  },
  count: {
    padding: theme.spacing(0),
  },
  cardTitle: {
    lineClamp: 1,
    maxWidth: 400,
    color: theme.palette.primary.main,
    fontWeight: 500,
    fontSize: 20,
    paddingRight: theme.spacing(2),
  },
  courseTab: {
    minHeight: 400,
    padding: theme.spacing(3.5),
  },
  screenXl: {
    minHeight: 850,
  },
}));

export default useStyles;
