import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
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
    '& .MuiSelect-select': {
      padding: '0px 10px !important',
      marginTop: 2,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #D5D9EE !important',
    },
    // '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    //   border: '1px solid #D5D9EE !important',
    // },
  },
  select: {
    border: '1px solid #D5D9EE',
    height: 30,
    borderRadius: '10px',
    fontSize: 13,
    // padding: '5px 10px',
    background: 'white',
    width: '100%',
  },
  noBorder: {
    background: 'transparent',

    '& .MuiOutlinedInput-notchedOutline': {
      border: '0px solid #D5D9EE !important',
    },
  },
  menuItem: {
    fontSize: 13,
    padding: '5px 10px',
    minHeight: 20,
  },
}));

export default useStyles;
