import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { NAVBAR_HEIGHT } from '../../../utils/constants/styles';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 216,
    display: 'flex',
    flexDirection: 'column',
    fontSize: 12,
    background: '#FFFFFF',
    boxShadow: '0px 3px 15px #00000008',

    height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
    overflow: 'auto',
  },
  profile: {
    margin: '0 auto',
    padding: 26,
    height: 180,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  avatar: {
    height: 80,
    width: 80,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
  },
  item: {
    display: 'flex',
    padding: '10px 18px',
    margin: '4px 12px',
    borderRadius: '10px',
    cursor: 'pointer',
    '&:hover': {
      background: 'rgba(80, 100, 227, 0.1)',
    },
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: '500',
    backgroundColor: theme.palette.secondary.light,
  },
  profileLink: {
    fontSize: 10,
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}));

export default useStyles;
