import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  tab: {
    fontSize: '1.69vh',
    textTransform: 'none',
    marginRight: '1.3vh',
    minWidth: '2.6vh',
    minHeight: 'initial',
    padding: '0.52vh',
    paddingBottom: '1.04vh',
    borderRadius: 3,
  },
  card: {
    padding: '1.56vh',
    border: '1px solid #E7EAEF80',
    boxShadow: 'none',
    // width: 'calc(33.3% - 14px)',
    borderRadius: '1.04vh',
    height: '13.28vh',
    cursor: 'pointer',
  },
  heading: {
    fontSize: '1.56vh',
    fontWeight: 500,
    margin: '1.04vh 0',
  },
  description: {
    fontSize: '1.56vh',
    marginTop: '1.3vh',
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 3,
    wordBreak: 'break-word',
    overflow: 'hidden',
  },
}));

export default useStyles;
