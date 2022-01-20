import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { NAVBAR_HEIGHT } from '../../../utils/constants/styles';

const useStyles = makeStyles((theme) => ({
  sectionBg: {
    minHeight: 450,
    padding: '58px 0 30px 0',
  },
  sectionWhiteBg: {
    minHeight: 450,
    background: 'white',
    padding: theme.spacing(6, 0),
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
  NavFixed: {
    width: '100%',
    zIndex: 9,
    position: 'sticky',
    top: `${NAVBAR_HEIGHT + 56}px`,
    backgroundColor: '#F8F9FB',
    borderBottom: '1px solid #eff1f5',
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
  cardTitle: {
    lineClamp: 1,
    maxWidth: 400,
    color: theme.palette.primary.main,
    fontWeight: 500,
    fontSize: 20,
    paddingRight: theme.spacing(2),
  },
  screenXl: {
    minHeight: 800,
  },
}));

export default useStyles;
