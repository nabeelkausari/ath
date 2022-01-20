import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    boxShadow: 'none',
    padding: '12px 12px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    borderRadius: 8,
    border: '1px solid #E7EAEF80',
  },
  details: {
    display: 'flex',
    margin: '10px 0',
  },
  remaining: {
    fontSize: 10,
    fontWeight: 500,
    marginLeft: 20,
  },
  heading: {
    fontWeight: '500',
    margin: '10px 0',
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 2,
    fontSize: 14,
    wordBreak: 'break-word',
    overflow: 'hidden',
  },
  buttonBlock: {
    marginTop: 20,
    '& button': {
      marginRight: 10,
    },
    '& a': {
      marginRight: 10,
    },
  },
  overview: {
    fontSize: 14,
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 4,
    wordBreak: 'break-word',
    overflow: 'hidden',
  },
}));

export default useStyles;
