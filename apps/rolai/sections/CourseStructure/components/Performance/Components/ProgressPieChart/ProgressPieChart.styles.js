import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    position: 'relative',
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieParent: {
    position: 'relative',
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieBox: {
    position: 'absolute',
    '& path': {
      //   strokeWidth: '6px',
    },
  },
}));

export default useStyles;
