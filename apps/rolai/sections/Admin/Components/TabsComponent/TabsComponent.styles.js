import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  tab: {
    fontSize: 13,
    textTransform: 'none',
    padding: 0,
    marginRight: 10,
    minWidth: 20,
    minHeight: 40,
    padding: 10,
    paddingBottom: 10,
    borderRadius: 3,
    fontWeight: 400,
    color: '#2E343B',
    // minWidth: 100,
    marginRight: 0,
    opacity: '.75',
  },
  active: {
    opacity: 1,
    color: 'inherit !important',
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
      height: 2,
      background: 'transparent',
      '& > span': {
        // maxWidth: 40,
        background: '#3DDF87',
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
}));

export default useStyles;
