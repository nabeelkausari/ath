import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    display: 'flex',
  },
  noteBody: {
    fontSize: 12,
    color: 'black',
    whiteSpace: 'pre-line',

    '& span': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
      marginLeft: 5,
      cursor: 'pointer',
    },
  },
  parentBody: {
    flex: 1,
  },
  selectedNote: {
    color: theme.palette.primary.main,
  },
  allNotes: {
    '& >div': {
      borderBottom: '1px solid #7070701a',
    },
    // '& >div:hover': {
    //   '& $actions': {
    //     display: 'block',
    //   },
    // },
    '& >div:last-child': {
      borderBottom: 'none',
    },
  },
  ago: {
    color: '#4A4C55',
    fontSize: 12,
    fontStyle: 'italic',
  },
  actions: {
    position: 'absolute',
    display: 'none',
    top: 0,
    right: 0,
    marginTop: 10,
    '& >div': {
      marginLeft: '15px !important',
      cursor: 'pointer',
    },
  },
  viewButton: {
    color: theme.palette.primary.main,
    fontSize: 12,
    cursor: 'pointer',
    textDecoration: 'underline',
    whiteSpace: 'nowrap',
  },
  note: {
    position: 'relative',
    padding: '10px 50px 10px 0',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  heading: {
    cursor: 'pointer',
  },
  count: {
    color: '#4A4C55',
    fontSize: 12,
  },
  parentIcon: {
    background: '#F1F8FF',
    borderRadius: 5,
    height: 40,
    width: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  buttonGroup: {
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 10,
    display: 'flex',
  },
  pointer: {
    cursor: 'pointer',
  },
  primaryButton: {
    minWidth: 50,
    borderRadius: 50,
    padding: '4px 20px',
  },
  noteActions: {
    position: 'absolute',
    display: 'none',
    padding: 5,
    justifyContent: 'flex-end',
    top: 0,
    right: 0,
  },
  selected: {
    margin: '10px 0',
  },
  input: {
    height: '90px',
    alignItems: 'flex-start',
    overflow: 'auto',
    width: '100%',
    borderRadius: 10,
    padding: '10px !important',
    border: '1px solid #B0C0D2',
    fontSize: '80%',
    background: 'white',
    textarea: {
      height: '100%',
    },
    '&::before': {
      borderBottom: 0,
    },
    '&::after': {
      borderBottom: 0,
    },
    '& ::placeholder': {
      fontStyle: 'italic',
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: 0,
    },
  },
}));

export default useStyles;
