import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  popperClass: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '0 !important',
    '& >div': {
      width: '100%',
    },
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
    fontSize: 20,
    marginBottom: 20,
  },
  topBlock: {
    padding: 23,
    paddingBottom: 5,
    '& .MuiRadio-root': {
      padding: 0,
      marginLeft: 10,
      marginRight: 8,
    },
    '& .MuiSelect-select': {
      // display: 'flex',
      alignItems: 'center',
      marginBottom: -2,
      textTransform: 'capitalize',
    },
  },
  datePicker: {
    width: 200,
    position: 'absolute',
    background: 'white',
    zIndex: 3000,
    border: '1px solid #00000011',
    borderRadius: '10px',
    marginTop: -10,
    '& .date-navigation': {
      fontSize: '13px !important',
      fontWeight: 500,
      padding: '0px 10px',
      paddingTop: 15,
    },
  },
  dateBar: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& >div': {
      width: '32%',
    },
  },
  flexBox: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& >div': {
      width: '48%',
    },
  },
  multiSelect: {
    '& .MuiSelect-select': {
      padding: 2,
    },
  },
  multi: {
    '& .share__control': {
      width: '100%',
      borderRadius: 10,
      position: 'relative',
      // border: '1px solid #ced4da',
      border: '1px solid #B0C0D2 !important',

      color: 'rgba(0, 0, 0, 0.6)',
      paddingTop: 0,
      fontSize: 13,
      minHeight: 30,
      paddingBottom: 0,
      // padding: theme.spacing(0.5, 2),
      margin: theme.spacing(0.5, 0, 0, 0),
      marginBottom: 12,
    },
    '& .share__indicators': {
      padding: 0,
    },
    '& .share__indicator': {
      padding: 3,
      '& svg': { width: 15, height: 15 },
    },
    '& .share__indicator-separator': {
      display: 'none',
    },
    '& .share__value-container': {
      padding: '0 5px',
    },
    '& .share__multi-value': {
      borderRadius: 8,
      background: theme.palette.secondary.main,
      fontSize: 11,
      '& svg': {
        fill: '#58616E',
        stroke: '#58616E',
      },
    },
    '& .share__option': {
      padding: 10,
    },
    '& .share__menu': {
      color: 'black',
      fontSize: 12,
    },
    '& .share__multi-value__remove': {
      '&:hover': {
        background: '#00000011',
        borderRadius: 10,
      },
    },
  },
  selectVal: {
    background: theme.palette.secondary.main,
    borderRadius: 9,
    padding: 7,
    fontSize: 11,
    margin: 2,
    zIndex: 2000,

    cursor: 'wait',
  },
  textArea: {
    maxHeight: '70px !important',
    height: 'initial !important',
    overflow: 'auto',
    alignItems: 'flex-start',
  },
  input: {
    width: '100%',
    borderRadius: 10,
    position: 'relative',
    // border: '1px solid #ced4da',
    height: 30,
    color: 'rgba(0, 0, 0, 0.6)',
    paddingTop: 0,
    fontSize: 13,
    paddingBottom: 0,
    // padding: theme.spacing(0.5, 2),
    margin: theme.spacing(0.6, 0, 0, 0),
    marginBottom: 12,

    '&.Mui-error': {
      borderColor: theme.palette.error.main,
    },
    '&::before': {
      borderBottom: 0,
    },
    '&::after': {
      borderBottom: 0,
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: 0,
    },
    '&:hover': {
      border: '1px solid #00000088',
    },
  },
  label: {
    fontSize: 13,
  },
  radioLabel: {
    fontSize: 13,
    margin: '0 5px 0 -5px',
  },
  select: {},
  menuItem: {
    fontSize: 13,
    padding: '5px 10px',
    minHeight: 20,
    // display: 'inline-block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    // width: '100%',
  },
  buttons: {
    borderTop: '1px solid #00000011 !important',
    margin: '0 -20px 0 -20px',
    display: 'flex',
    alignItems: 'center',

    justifyContent: 'space-between',
    padding: 23,
    '& button': { height: 40 },
  },
  calendarInput: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  calendarIcon: {
    position: 'absolute',
    right: 0,
    marginBottom: -2,
    marginRight: 7,
  },
}));

export default useStyles;
