import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    borderRadius: 15,
    boxShadow: 'none',
    padding: '15px 15px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    position: 'relative',
  },
  details: {
    display: 'flex',
    margin: '6px 0',
    alignItems: 'center',
    // color: theme.palette.text.secondary,
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 4,
    wordBreak: 'break-word',
    overflow: 'hidden',
    fontSize: 14,
  },
  remaining: {
    fontSize: 12,

    marginLeft: 15,
    color: theme.palette.text.secondary,
  },
  org: {
    position: 'absolute',
    right: 0,
    top: 0,
    borderBottomLeftRadius: '15px',
    background: '#D8F9E7',
    fontSize: 11,
    color: '#2EA765',
    padding: '2px 10px',
  },
  heading: {
    fontWeight: '500',
    margin: '8px 0',
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 1,
    wordBreak: 'break-word',
    overflow: 'hidden',
  },
  buttonBlock: {
    marginTop: 15,
    '& button': {
      marginRight: 10,
    },
  },
}));

export default useStyles;
