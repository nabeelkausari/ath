import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  tab: {
    fontSize: 13,
    textTransform: 'none',
    padding: 0,
    marginRight: 10,
    minWidth: 20,
    minHeight: 40,
    padding: 4,
    paddingBottom: 0,
    borderRadius: 3,
    fontWeight: 400,
    color: '#2E343B',
    minWidth: 100,
    marginRight: 0,
  },

  tabs: {
    '& >div:first-child': {
      display: 'flex',
    },
    minWidth: 200,
    '& .indicator': {
      display: 'flex',
      justifyContent: 'center',
      // width: '100% !important'
      height: 3,
      background: 'transparent',
      '& > span': {
        // maxWidth: 40,
        background: theme.palette.highlight.main,
        width: '60%',
      },
    },
    '& .flexContainer': {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      // width:'fit-content'
    },
  },
  tabsParent: {
    boxShadow: '0px 3px 15px #00000008',
    paddingLeft: 20,
    // height: 42,
  },
}));

export default useStyles;
