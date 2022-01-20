import { makeStyles } from '@mui/styles';
// import { NAVBAR_HEIGHT } from '../../utils/constants/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    ...theme.sections.dashboard.leftSection,
    paddingBottom: 0,
  },
  welcome: {
    background: theme.palette.secondary.light,
    borderRadius: '1.3vh',
    height: '9.375vh',
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '0 3.12vh',
    marginTop: '3.38vh',
    '&>div:first-child': {
      fontWeight: 'bold',
      fontSize: '1.8vh',
    },
    '&>div:nth-child(2)': {
      fontSize: '1.69vh',
    },
  },
  container: {
    height: 'calc(100vh - 250px)',
    // height: 520,
    overflow: 'auto',
    marginRight: -10,
    paddingRight: 10,
    paddingBottom: 0,
  },
  welcomeIco: {
    position: 'absolute',
    right: '0.65vh',
    bottom: '-1.2vh',
    width: '13.4vh',
  },
  progress: {
    marginTop: '0.65vh',
    display: 'flex',
    alignItems: 'center',
    '& .MuiLinearProgress-root': {
      height: '0.78vh',
      width: '5.85vh',
      borderRadius: '1.95vh',
      background: '#E6E9F2',
      '& .MuiLinearProgress-bar': {
        background: theme.palette.highlight.main,
      },
    },
  },
  progressText: {
    marginLeft: '0.65vh',
    fontSize: '1.43vh',
    lineHeight: 0.5,
    fontWeight: 500,
  },

  resumeBtn: {
    height: '4.03vh',
    fontSize: '1.43vh !important',
    minWidth: '9.11vh',
    padding: '0.65vh 1.3vh !important',
    whiteSpace: 'nowrap',
  },
}));

export default useStyles;
