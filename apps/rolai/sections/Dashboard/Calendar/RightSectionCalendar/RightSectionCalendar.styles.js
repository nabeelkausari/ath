import { makeStyles } from '@mui/styles';
import { HEIGHT_HOUR_BLOCK } from '../../../../utils/helpers/calendar';

const useStyles = makeStyles((theme) => ({
  parent: {
    borderLeft: '1px solid #E6E7EB',
    flex: 1,
  },
  empty: {
    borderRight: '1px solid #E6E7EB',
    width: 47,
    height: 75,
    borderBottom: '1px solid #E6E7EB',
  },
  hours: {
    width: 47,

    textAlign: 'right',
    '& >div': {
      height: HEIGHT_HOUR_BLOCK,
      color: '#919191',
      fontSize: 11,
      fontWeight: 'bold',
      padding: 5,
      marginTop: -1,
      borderRight: '1px solid #E6E7EB',
    },
  },
  topDate: {
    padding: 10,
    '& span': {
      padding: 5,
      borderRadius: 20,
      cursor: 'pointer',
      '&:hover': {
        background: '#00000011',
      },
    },
  },
  selectedDate: {
    '& span': {
      background: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
  },
  calendar: {
    flex: 1,
  },
  wrapper: {
    display: 'flex',
    height: 'calc(100vh - 160px)',
    overflow: 'auto',
  },
  weekWrapper: {
    display: 'flex',
    height: 'calc(100vh - 210px)',
    overflow: 'auto',
  },
  topWrapper: {
    display: 'flex',
  },
  dates: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    height: '100%',
    '& $block': {
      fontSize: 9,
    },
  },
  container: {
    borderTop: '1px solid #E6E7EB',
    background: 'white',
  },
  block: {
    textAlign: 'center',
    borderRight: '1px solid #E6E7EB',
    borderBottom: '1px solid #E6E7EB',
  },
  days: {
    marginRight: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#919191',
    fontSize: 14,
    flex: 1,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    '& $block': {
      alignItems: 'flex-end',
      paddingTop: 10,
      borderBottom: 'none',
    },
  },

  animateLeft: {
    '&-enter': {
      opacity: 0,
      transform: 'translateX(8%)',
    },

    '&-enter-active': {
      opacity: 1,
      transform: 'translateX(0%)',
      transition: 'transform 0.5s, opacity 0.5s ease-in',
    },

    ' &-exit': {
      opacity: 1,
      transform: 'translateX(0%)',
    },

    '&-exit-active': {
      opacity: 0,
      transform: 'translateX(0%)',
      transition: 'transform 0.1s, opacity 0.05s',
    },
  },
  animateRight: {
    '&-enter': {
      opacity: 0,
      transform: 'translate(-8%)',
    },

    '&-enter-active': {
      opacity: 1,
      transform: 'translateX(0%)',
      transition: 'transform 0.5s, opacity 0.5s ease-in',
    },

    ' &-exit': {
      opacity: 1,
      transform: 'translateX(0%)',
    },

    '&-exit-active': {
      opacity: 0,
      transform: 'translateX(0%)',
      transition: 'transform 0.1s, opacity 0.05s',
    },
  },
}));

export default useStyles;
