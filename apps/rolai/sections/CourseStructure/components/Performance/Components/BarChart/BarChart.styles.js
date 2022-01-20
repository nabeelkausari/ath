import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    marginTop: 20,
    '& >div:first-child': {
      marginTop: 0,
    },
  },
  bar: {
    width: 181,
    height: 30,
    // margin: 20,
    borderRadius: '0 4px 4px 0',
  },

  barParent: {
    display: 'flex',
    alignItems: 'center',
    marginTop: -30,

    '& >div:first-child': {
      width: 130,
      borderRight: '1px solid #4A4C5555',
      height: 100,
      display: 'flex',
      alignItems: 'center',
      // justifyContent: 'center',
      fontSize: 13,

      //   '&>div': {},
    },
    '& >div:last-child': {
      fontWeight: 500,
      fontSize: 14,
      marginLeft: 10,
    },
  },
}));

export default useStyles;
