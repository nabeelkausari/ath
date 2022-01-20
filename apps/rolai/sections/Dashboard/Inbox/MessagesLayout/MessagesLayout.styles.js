import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    padding: 25,
    fontSize: 13,
    height: 'calc(100vh - 100px)',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  activeTab: {
    color: 'white !important',
    background: theme.palette.primary.main,
  },
  tabs: {
    width: 72,
    background: 'white',
    borderRadius: 10,
  },
  search: {
    background: theme.palette.background.dark,

    borderRadius: 15,
    margin: '10px 0 20px 0',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& button': {
      padding: '0 !important',
      justifyContent: 'flex-end',
    },
  },
  tab: {
    height: 62,
    width: 62,
    margin: 5,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
    color: theme.palette.text.secondary,
  },
  body: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    background: 'white',
    flex: 1,
    marginLeft: 20,
    borderRadius: 10,
  },
  leftbody: {
    height: 'calc(100% - 70px)',
    overflow: 'auto',
  },
  left: {
    width: 310,
    padding: '25px 16px 25px 25px',
    borderRight: `1px solid ${theme.palette.border.light}`,
  },
  right: {
    flex: 1,
    padding: 20,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    border: `1px solid transparent`,

    background: theme.palette.background.light,
    borderRadius: 10,
    margin: '11px 0',
    padding: 8,
    paddingLeft: 0,
    cursor: 'pointer',
  },
  avatar: {
    width: 50,
    borderLeft: `4px solid transparent`,
    padding: '0 8px',
  },
  avatar2: {
    width: 50,
  },
  activeUser: {
    border: `1px solid ${theme.palette.border.main}`,
    '& $avatar': {
      borderLeft: `4px solid ${theme.palette.highlight.main}`,
    },
    '& $userName': {
      '& >div:first-child': {
        color: theme.palette.primary.main,
      },
    },
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& >div:first-child': {
      fontWeight: 500,
    },
    '& >div:last-child': {
      color: theme.palette.text.secondary,
      opacity: 0.7,
      fontStyle: 'italic',
      fontSize: 12,
    },
  },
  message: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 1,
    wordBreak: 'break-word',
    overflow: 'hidden',
  },
  topBar: {
    borderBottom: `1px solid ${theme.palette.border.light}`,
    paddingBottom: 20,
    paddingTop: 15,
  },
  chat: {
    flex: 1,
    overflow: 'auto',
    marginBottom: '10px',
  },
  name: {
    fontWeight: 600,
    fontSize: 16,
  },
  name2: {
    fontWeight: 600,
    fontSize: 13,
  },
  send: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: theme.palette.background.dark,
    borderRadius: 4,
    padding: 8,
    paddingLeft: 20,
  },
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
  input: {
    flex: 1,
    marginRight: 10,
  },
  allMessage: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: '10px 0',
    '& >div:first-child': {
      width: '60%',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
  },
  ownerMessage: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    '& >div:first-child': {
      width: '60%',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      flexDirection: 'row-reverse',
      textAlign: 'right',
    },
    '& $messageText': {
      background: '#d8f9e782',
    },
  },
  avatarBox: {
    width: 80,
  },
  messageText: {
    background: '#2d43aa0d',
    borderRadius: 10,
    padding: '10px 15px',
    margin: '5px 0',
  },
  time: {
    color: theme.palette.text.secondary,
    fontStyle: 'italic',
  },
}));

export default useStyles;
