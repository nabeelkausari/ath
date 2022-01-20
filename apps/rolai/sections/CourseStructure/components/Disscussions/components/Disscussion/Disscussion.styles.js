import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  profile: {
    // width: '32px',
  },
  body: {
    flex: 1,
    paddingLeft: 10,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  followBtn: {
    borderRadius: 24,
    height: 24,
    display: 'inline-flex',
    alignItems: 'center',
    padding: '10px 12px',
    // width: 95,
    justifyContent: 'space-between',
    fontSize: 12,
  },
  following: {
    background: theme.palette.green.secondary,
    color: theme.palette.success.main,
  },
  follow: {
    background: theme.palette.secondary.light,
    color: theme.palette.primary.main,
  },
  secondary: {
    color: theme.palette.text.secondary,
    fontSize: 12,
  },
  heading: {
    fontSize: 16,
    fontWeight: 500,
  },
  title: {
    fontWeight: 500,
    borderBottom: `1px solid ${theme.palette.border.main}`,
    paddingBottom: 15,
  },
  commentBox: {
    display: 'flex',
    alignItems: 'flex-start',
    margin: '15px 0',
  },
  comment: {
    background: theme.palette.background.secondary,
    borderRadius: 15,
    padding: 10,

    '& >div:first-child': {
      fontWeight: 500,
    },
    '& >div:last-child': {
      color: theme.palette.text.secondary,
    },
  },
  commentWrapper: {
    flex: 1,
    marginLeft: 15,
  },
  input: {
    flex: 1,
    borderRadius: 10,
    padding: '5px 10px',
    height: '35px',
    marginLeft: 15,
    fontSize: 14,
    border: `1px solid ${theme.palette.border.main}`,
    marginRight: 10,
  },
  reply: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& >div': {
      marginLeft: 10,
    },
  },

  //new discussion
  bottom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputWrapper: {
    marginBottom: 20,
    width: '100% !important',
  },

  //input box
  sendBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 34,
    borderRadius: 4,
    padding: '8px !important',
    minWidth: 'initial',
    paddingLeft: '4px !important',
  },

  //pin
  pin: {
    cursor: 'pointer',
  },
}));

export default useStyles;
