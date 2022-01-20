import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { NAVBAR_HEIGHT } from '../../utils/constants/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: `${NAVBAR_HEIGHT}px`,
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed !important',
    zIndex: 2,
    '& .MuiToolbar-root': {
      padding: '0px 0px !important',
    },
    '& .logo': {
      marginTop: 5,
    },
  },
  explore: {
    marginLeft: `${theme.spacing(4)} !important`,
    fontSize: '14px !important',
    fontWeight: '400 !important',
    padding: '4px 20px !important',
    height: '32px !important',
  },
  search: {
    position: 'relative',
    borderRadius: '50px',
    backgroundColor: alpha(theme.palette.common.white, 0.85),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 1),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: '350px',
    height: '32px',
    '& .MuiInputBase-root': {
      width: '100%',
    },
  },
  searchIconWrapper: {
    padding: theme.spacing(0, 1.5),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInputBase: {
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(0.75, 0.75, 0.75, 0),
      fontSize: '14px',
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(2.5)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      flex: 1,
    },
  },
  login: {
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'row',
    '& >.MuiButton-text': {
      position: 'relative',
      fontWeight: '500',
      padding: '4px 10px !important',
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '&.active:after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        width: '60%',
        height: '2px',
        backgroundColor: alpha(theme.palette.highlight.main, 1),
        bottom: 0,
      },
    },
  },
  avatar: {
    marginLeft: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    borderLeft: '1px solid grey',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    justifyContent: 'space-between',
    '& > div:first-child': {
      marginRight: `${theme.spacing(1)} !important`,
      borderRadius: '50%',
    },
  },
  avatarImg: {
    marginRight: theme.spacing(20),
  },
  menu: {
    '& .MuiPaper-root': {
      borderRadius: '5px',
    },
  },
}));

export default useStyles;
