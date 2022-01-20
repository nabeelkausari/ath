import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    border: '1px solid #EBEEF1',
    borderRadius: '15px !important',
    margin: '10px 0 !important',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '& .MuiAccordionSummary-content,.MuiAccordionSummary-content.Mui-expanded':
      {
        margin: '0 !important',
        minHeight: 'initial !important',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    '& .MuiAccordionSummary-root': {
      minHeight: 'initial !important',
    },
    '& .MuiCollapse-hidden .MuiCollapse-wrapper': {
      display: 'none',
    },
  },
  titleBox: {
    padding: 15,
    display: 'flex',
  },
  round: {
    width: 23,
    height: 23,
    border: '1px solid #E0E8F1',
    borderRadius: '50%',
    background: '#F1F8FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    transition: 'transform 0.2s',
    '& svg': {
      height: '.8em',
    },
  },
  activeRound: {
    transform: 'rotate(90deg)',
  },
  title: {
    '&>div:first-child': {
      fontSize: 12,
      '& span': {
        fontWeight: 'bold',
      },
    },
    '&>div:last-child': {
      fontSize: 14,
      fontWeight: 500,
    },
  },
}));

export default useStyles;
