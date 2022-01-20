import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    marginRight: '2.6vh',
    // width: 347,
    width: 'calc(50% - 1.3vh)',
    '& .MuiTabs-indicator': {
      height: '0.19vh',
      backgroundColor: theme.palette.highlight.main,
    },
  },
  tab: {
    fontSize: '1.69vh',
    textTransform: 'none',
    marginRight: '1.3vh',
    minWidth: '2.6vh',
    minHeight: 'initial',
    padding: '0.52vh',
    paddingBottom: '1.04vh',
    borderRadius: '0.39vh',
  },
  card: {
    padding: '1.56vh',
    // border: '1px solid #E7EAEF80',
    boxShadow: 'none',
    height: '27.34vh',
  },

  heading: {
    fontSize: '1.56vh',
    fontWeight: 500,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    marginTop: '0.65vh',
  },
  lessonTitle: {
    fontSize: '1.69vh',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    marginTop: '0.65vh',
    display: 'flex',
    alignItems: 'center',
    '& >div:first-child': {
      // marginRight: '5px !important',
    },
    '& >span:last-child': {
      marginRight: '0.65vh !important',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  },
  img: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '0.52vh',
  },
  description: {
    fontSize: '1.69vh',
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 5,
    wordBreak: 'break-word',
    overflow: 'hidden',
    marginTop: '1.95vh',
  },
  ago: {
    fontSize: '1.43vh',
    marginTop: '1.3vh',
    color: theme.palette.text.secondary,
  },
}));

export default useStyles;
