import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {},
  left: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: '47.91vh',
    margin: '1.95vh',
    paddingRight: '1.95vh',
    borderRight: '1px solid #7070701c',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  card: {
    display: 'flex',
    height: '13.54',
    boxShadow: 'none',
    borderRadius: '1.04vh',
  },
}));

export default useStyles;
