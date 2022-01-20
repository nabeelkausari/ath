import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    display: 'flex',
    borderTop: '1px solid #E6E7EB',
    minHeight: 'calc(100vh - 140px)',
    boxShadow: '0px 3px 15px #00000008;',
  },
  left: {
    width: 300,
    borderRight: '1px solid #E6E7EB',
  },
  right: {
    flex: 1,
    display: 'flex',
    alignItems: 'stretch',

    justifyContent: 'space-between',
    flexDirection: 'column',
    '& $topBlock': {
      background: 'red',
    },
  },
  blank: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '200px',
    fontSize: 14,
    color: theme.palette.text.main,
  },
  monthTitle: {
    fontWeight: 500,
    fontSize: 12,
    padding: '8px 10px',
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
    background: 'white',
    padding: '10px 15px',
  },
  event: {
    cursor: 'pointer',
    padding: '8px 10px',
    paddingRight: '5px',
    minHeight: 68,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    borderBottom: '1px solid #E6E7EB',

    '&:hover': {
      background: '#5064E311',
    },
  },
  selected: {
    background: '#5064E311',
  },
  type: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  date: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingRight: 15,
    '&>div:first-child': {
      fontSize: 13,
      fontWeight: 500,
    },
    '&>div:last-child': {
      fontSize: 10,
      fontWeight: 500,
      color: '#919191',
      textTransform: 'uppercase',
    },
  },
  details: {
    fontSize: 12,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    '&>div:first-child': {
      color: theme.palette.primary.main,
      fontSize: 13,
      fontWeight: 500,
    },
    '&>div': {
      display: '-webkit-box',
      boxOrient: 'vertical',
      lineClamp: 1,
      wordBreak: 'break-word',
      overflow: 'hidden',
    },
  },
}));

export default useStyles;
