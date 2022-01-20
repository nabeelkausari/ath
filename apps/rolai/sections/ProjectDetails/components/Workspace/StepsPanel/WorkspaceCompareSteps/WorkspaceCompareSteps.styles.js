import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  //compare steps styles

  popup: {
    fontSize: 13,
    width: 660,
    height: 150,
    '& textarea:after, input:after': {
      display: 'none !important',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #484850',
    },
    '& .MuiOutlinedInput-root': {
      border: '0px solid red !important',
    },
    '& .MuiInput-root': {
      borderRadius: '10px !important',
      width: '100%',
      marginTop: 2,
      border: '1px solid #B0C0D2',
      padding: '5px 10px',
      '&:before': { display: 'none' },
    },
  },
  heading: {
    fontSize: 14,
    fontWeight: 500,
  },
  popup2: {
    fontSize: '13px !important',
  },
  radioLabel: {
    fontSize: '13px !important',
    lineHeight: 1.6,
  },
  radioLabelRoot: {
    width: '100%',
    wordBreak: 'break-word',
  },
  flex: {
    borderTop: '1px solid #70707011',

    display: 'flex',
    '& >div': {
      width: '50%',
      margin: '20px 0',
    },
    '& >div:last-child': {
      borderLeft: '1px solid #70707011',
      paddingLeft: 20,
    },
  },
}));

export default useStyles;
