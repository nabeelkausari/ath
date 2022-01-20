import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    boxShadow: '4px 0px 8px #0000001a',
    height: '10vh',
    width: 'calc(33.3% - 14px)',
    borderRadius: '1.31vh',
    padding: '1.31vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  info: {
    marginLeft: '1.95vh',
    zIndex: 1,
  },
  background: {
    position: 'absolute',
    bottom: -4,
    right: 0,
    width: '4.5vh',
    zIndex: 0,
  },
  heading: {
    fontSize: '1.842vh',
    fontWeight: 'bold',
  },
  value: {
    fontSize: '2.23vh',
    fontWeight: 'bold',
    lineHeight: 1.1,
  },
  image: {
    minWidth: '5.26vh',
    maxWidth: '5.26vh',
    height: '5.26vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',

    '& > div': {
      width: '2.63vh',
      height: '2.63vh',
    },
  },
}));

export default useStyles;
