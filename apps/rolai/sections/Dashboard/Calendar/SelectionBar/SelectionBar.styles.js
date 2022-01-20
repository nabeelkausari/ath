import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    height: 61,
    padding: '5px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    '& >div': {
      display: 'flex',
    },
    '& textarea:after, input:after': {
      display: 'none !important',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none !important',
    },
  },

  today: {
    ...rounded,
    cursor: 'pointer',
  },

  date: {
    ...rounded,
  },
  create: {
    ...rounded,
    paddingLeft: 15,
    paddinRight: 20,
    background: theme.palette.primary.main,
    cursor: 'pointer',
  },
  type: {
    ...rounded,
    cursor: 'pointer',
    border: 'none',
    width: 120,
    padding: 0,
    '& .MuiSelect-select': {
      //   paddingRight: '14px !important',
      textTransform: 'capitalize',

      paddingLeft: 20,
    },
    '& .MuiSvgIcon-root': {
      transform: 'rotate(90deg)',
      position: 'absolute',
      right: 15,
    },
  },

  //search styles
  search: {
    ...rounded,
    cursor: 'pointer',
    transition: 'all .5s ease',
    width: 56,
    padding: '0 0',
    '&>div': {
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  searchExpand: {
    width: 598,
    border: '1px solid #B0C0D2',
    background: 'white',
    '&>div': {
      padding: '0 10px',
    },
  },
  searchInput: {
    marginLeft: 10,
    width: 450,
    fontSize: 14,
    border: 'none',
    '&:focus': {
      outline: 0,
      border: 'none',
    },
  },
  calendarIcon: {
    display: 'flex',
    alignItems: 'center',

    marginRight: 8,
  },
  menuItem: {
    textTransform: 'capitalize',
  },
}));

export default useStyles;

const rounded = {
  background: '#F1F3FF',
  borderRadius: 20,
  fontSize: 14,
  padding: '5px 25px',
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 40,
  margin: '10px !important',
};
