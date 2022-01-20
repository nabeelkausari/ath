import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {},
  popperClass: {
    minHeight: 400,
    width: '620px !important',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    '& >div': {
      width: '100%',
    },
    '& textarea:after, input:after': {
      display: 'none !important',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none !important',
    },
  },
  blank: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '200px',
    fontSize: 14,
    color: theme.palette.primary.main,
  },
  reminder: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 13,
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
  subText: {
    fontSize: 14,
    marginBottom: 5,
    display: 'flex',
    alignItems: 'center',
  },
  topBlock: {
    marginBottom: 15,
    padding: 23,
  },
  title: {
    fontSize: 12,
    opacity: 0.7,
  },
  person: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 5,
    '& $title': {
      marginLeft: 5,
    },
  },
  container: {
    display: 'flex',
  },
  left: {
    width: '70%',
    borderRight: '1px solid #00000011',
  },
  right: {
    padding: '0 20px',
  },
  badges: {
    marginBottom: 10,
  },
  badge: {
    display: 'inline-block',
    borderRadius: 10,
    fontSize: 12,
    textTransform: 'capitalize',
    padding: '1px 8px',
    color: 'white',
    marginRight: 8,
  },
  buttons: {
    borderTop: '1px solid #00000011 !important',
    // margin: '0 -20px 0 -20px',
    display: 'flex',
    alignItems: 'center',

    justifyContent: 'space-between',
    padding: 20,
    background: 'white',
    '& button': { height: 40 },
  },
  type: {
    ...rounded,
    cursor: 'pointer',
    border: 'none',
    width: 100,
    padding: 0,
    margin: 0,
    marginLeft: 10,
    '& .MuiSelect-select': {
      //   paddingRight: '14px !important',
      paddingLeft: 20,
    },
    '& .MuiSvgIcon-root': {
      transform: 'rotate(90deg)',
      position: 'absolute',
      right: 15,
    },
  },
  icon: {
    marginRight: '7px !important',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  margin: 10,
};
