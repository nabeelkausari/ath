import { makeStyles } from '@mui/styles';
// import { NAVBAR_HEIGHT } from '../../utils/constants/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    ...theme.sections.dashboard.leftSection,
    paddingTop: 0,
    paddingBottom: 0,
  },
  container: {
    height: 'calc(100vh - 160px)',
    overflow: 'auto',
    marginRight: -10,
    paddingRight: 10,
  },
  welcome: {
    background: theme.palette.secondary.main,
    borderRadius: 10,
    height: 72,
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '0 24px',
    marginTop: 26,
    '&>div:first-child': {
      fontWeight: 'bold',
    },
    '&>div:nth-child(2)': {
      fontSize: 13,
    },
  },
  welcomeIco: {
    position: 'absolute',
    right: 20,
    bottom: -7,
  },
  progress: {
    marginTop: 5,
    display: 'flex',
    alignItems: 'center',
    '& .MuiLinearProgress-root': {
      height: 6,
      width: 45,
      borderRadius: 15,
      background: '#E6E9F2',
      '& .MuiLinearProgress-bar': {
        background: '#2DE352',
      },
    },
  },
  progressText: {
    color: 'black',
    marginLeft: 5,
    fontSize: 11,
    lineHeight: 0.5,
    fontWeight: 500,
  },
  rightComp: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'column',
    fontSize: 10,
    fontWeight: 500,
    color: '#4A4C55',
  },
  resumeBtn: {
    height: 31,
    fontSize: 11,
    width: 70,
  },
  lesson: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    justifyContent: 'space-between',
    fontSize: 12,

    padding: '4px 0',
    '& >div:first-child': {
      width: '70%',
    },
  },
  active: {
    color: theme.palette.primary.main,
  },
  activeRound: {
    background: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.border.main}`,
    transform: 'rotate(0deg) !important',

    '& img': {},
  },
  round: {
    width: 21,
    height: 21,
    background: theme.palette.secondary.main,

    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'rotate(-90deg)',
    transition: '.2s all linear',
    border: `1px solid ${theme.palette.border.main}`,
    marginBottom: 4,
  },
  bottomComp: {
    marginTop: 5,
    paddingTop: 4,
    borderTop: '1px solid #E6E6E6',
    fontSize: 12,
  },
  noteCount: {
    color: theme.palette.text.secondary,
    fontSize: 12,
    fontWeight: 400,
  },
  lesson_title: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    marginTop: 5,
    display: 'flex',
    alignItems: 'center',
    '& >div:first-child': {
      // marginRight: '5px !important',
    },
    '& >span:last-child': {
      marginRight: '5px !important',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  },
  img: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 3,
  },
}));

export default useStyles;
