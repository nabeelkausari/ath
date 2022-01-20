import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 'calc(100vh - 180px)',
    paddingTop: 10,
  },
  left: {
    width: '800px',
    height: '100%',
    margin: 'auto',
  },
  leftWrapper: {
    overflow: 'auto',
    flex: 1,
    height: '100%',
  },
  wrapper: {
    boxShadow: '0px 5px 25px #153B7D0F;',
    padding: 30,
    background: 'white',
    margin: '30px 0',
    borderRadius: '20px',
  },
}));

export default useStyles;
