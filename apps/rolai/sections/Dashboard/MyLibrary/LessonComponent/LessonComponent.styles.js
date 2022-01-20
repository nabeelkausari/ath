import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    boxShadow: '0px 4px 25px #153B7D14',
    padding: 12,
    // width: 'calc(33.3% - 14px)',
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  infoBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    fontSize: 12,
  },
  info: {
    color: '#4A4C55',
  },
  button1: {
    cursor: 'pointer',

    color: theme.palette.primary.main,

    textDecoration: 'underline',
  },
  button2: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
    '& span': {
      marginLeft: 5,
    },
    '&>div': {
      position: 'relative',
      top: 5,
    },
  },
  heading: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 3,
    wordBreak: 'break-word',
    overflow: 'hidden',
    fontSize: 14,
    fontWeight: 500,
  },
}));

export default useStyles;
