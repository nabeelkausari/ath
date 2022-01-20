import { makeStyles } from '@mui/styles';

import { HEIGHT_HOUR_BLOCK } from '../../../../utils/helpers/calendar';

const useStyles = makeStyles((theme) => ({
  month: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    height: '100%',
    '& >div': {
      width: '100%',
    },
  },
  avatar: {
    height: '28px',
    width: '28px',
    fontSize: '12px',
    color: theme.palette.primary.main,
    background: 'white',
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#919191',
    padding: 5,
    textAlign: 'center',
    '& span': {
      padding: 5,
      borderRadius: 20,
      cursor: 'pointer',
      '&:hover': {
        background: '#00000011',
      },
    },
  },

  week: {
    width: '100%',
    position: 'relative',
    '& $date': {
      borderBottom: '1px solid #E6E7EB',
    },
  },
  eventWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',

    flexDirection: 'column',
    flex: 1,
  },
  block: {
    height: HEIGHT_HOUR_BLOCK,
    width: '100%',
    borderBottom: '1px solid #E6E7EB',
    position: 'relative',
  },
  monthEvent: {
    height: 32,
    width: '90%',
    margin: '3px 0',
    padding: 5,
    fontSize: 12,
    textAlign: 'left',
    overflow: 'hidden',
    transition: 'all .1s linear',
    cursor: 'pointer',
    textOverflow: 'ellipsis',
    '&:hover': {
      zIndex: 500,
      transform: 'scale(1.005)',
      boxShadow: '-2px 6px 15px -1px rgba(0,0,0,0.3)',
    },
    '& $title': {
      lineClamp: 1,
    },
  },
  event: {
    position: 'absolute',
    width: '95%',
    top: 0,
    padding: 5,
    fontSize: 12,
    textAlign: 'left',
    overflow: 'hidden',
    transition: 'all .1s linear',
    cursor: 'pointer',
    overflow: 'auto',
    // transitionDelay: '2s',

    '&:hover': {
      zIndex: 500,

      transform: 'scale(1.005)',
      boxShadow: '-2px 6px 15px -1px rgba(0,0,0,0.3)',
    },
  },
  title: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 2,
    wordBreak: 'break-word',
    overflow: 'hidden',
    overflow: 'hidden',
  },
  course: {
    fontSize: 16,
    fontWeight: 500,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  events: {
    position: 'absolute',
    width: '95%',
    top: 0,
    // height: '100%',
  },
  more: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    fontSize: 12,
    paddingBottom: 5,
  },
  selectedDate: {
    '& span': {
      background: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
  },
}));

export default useStyles;
