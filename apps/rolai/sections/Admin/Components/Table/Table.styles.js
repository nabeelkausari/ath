import { makeStyles } from '@mui/styles';
import { STYLES } from '../Common/Common.styles';

const useStyles = makeStyles((theme) => ({
  parent: {},
  paper: {
    boxShadow: 'none',
    borderRadius: '15px',
    border: '1px solid #EBEEF1',
    '& tr>td:nth-last-child(2) ,tr>th:nth-last-child(1)': {
      borderRight: '0px solid #EBEEF1 !important',
      paddingRight: '20px',
    },
    '& tr>td:first-child ,tr>th:first-child': {
      paddingLeft: '20px',
    },
    '& th': {
      color: STYLES.color.title,
    },
    '& td': {
      color: STYLES.color.text,
    },
    '& tr': {
      position: 'relative',
    },
    '& td:nth-last-child(2)': {
      paddingRight: '60px !important',
    },
  },
  cell: {
    borderBottom: '1px solid #EBEEF1',
    borderRight: '1px solid #EBEEF1',
    height: 40,
    padding: '5px 10px',
    fontWeight: '400',
  },

  //pagination
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '10px 0',
  },
  page: {
    padding: '0 5px',
    display: 'inline-block',
    cursor: 'pointer',
    color: '#818ECC',
  },
  activePage: {
    color: '#2D43AA',
  },
  item: {
    borderRight: '1px solid #ABB4DD',
    paddingRight: '10px',
  },
  leftArrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& >div': {
      transform: 'rotate(90deg)',
    },
    '& div': {
      display: 'inline-flex',
    },
  },
  rightArrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& >div': {
      transform: 'rotate(-90deg)',
    },
    '& div': {
      display: 'inline-flex',
    },
  },
  twoArrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column-reverse',
    '& >div:first-child': {
      marginTop: '-2px !important',
    },
  },
}));

export default useStyles;
