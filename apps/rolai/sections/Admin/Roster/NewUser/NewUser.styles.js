import { makeStyles } from '@mui/styles';
import { STYLES } from '../../Components/Common/Common.styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    display: 'flex',
    color: '#14215B',
    fontSize: 13,
    alignItems: 'stretch',
    height: '100%',
    position: 'absolute',
    bottom: 0,
    flex: 1,
    left: 20,
    right: 0,
    zIndex: 100,
    // marginBottom: -20,
  },
  left: {
    width: 300,
  },
  right: {
    flex: 1,
    background: '#F8FAFF',
    padding: 20,
    marginTop: 10,
    display: 'flex',
    justifyContent: 'space-between',
  },
  boxClass: {
    minWidth: 'initial',
    width: 'calc(100% - 25px) !important',
    marginRight: '20px',
    marginBottom: '12px',
  },
  wrapper: {
    width: 'calc(50% - 10px)',
    width: 400,
  },
  block: {
    border: STYLES.border.primary,
    borderRadius: 8,
    height: '358px',
    background: 'white',
  },
  scrollList: {
    height: 'calc(100% - 80px)',
    overflow: 'auto',
    borderTop: STYLES.border.primary,
    padding: '0 15px',

    '&>div': {
      margin: '10px 0',
    },
  },
  rightScrollList: {
    height: 'calc(100%)',
    padding: 15,
    overflow: 'auto',
  },

  heading: {
    color: '#727A9D',
  },
  items: {
    padding: '0 5px 5px 10px',
    '& >div': {
      margin: '10px 0',
    },
  },
  reset: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.main,
  },
  paper: {
    width: 240,
    fontSize: 13,
    boxShadow: '0px 4px 25px #153B7D14',
    borderRadius: 8,
    padding: 10,
  },
}));

export default useStyles;
