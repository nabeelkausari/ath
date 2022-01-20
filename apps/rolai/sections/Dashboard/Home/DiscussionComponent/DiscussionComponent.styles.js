import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    // marginRight: 20,
    // width: 347,
    width: 'calc(50% - 1.3vh)',
    '& .MuiTabs-indicator': {
      height: '0.19vh',
      backgroundColor: theme.palette.highlight.main,
    },
  },
  tab: {
    fontSize: 13,
    textTransform: 'none',
    marginRight: 10,
    minWidth: 20,
    minHeight: 'initial',
    padding: 4,
    paddingBottom: 8,
    borderRadius: 3,
  },
  card: {
    padding: '1.56vh',
    // border: '1px solid #E7EAEF80',
    boxShadow: 'none',
    height: '27.34vh',
  },
  heading: {
    fontSize: 12,
    fontWeight: 500,
    margin: '8px 0',
  },
  description: {
    fontSize: 13,
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 5,
    wordBreak: 'break-word',
    overflow: 'hidden',
  },
  ago: {
    fontSize: 11,
    marginTop: 10,
    color: '#4A4C55',
  },
}));

export default useStyles;
