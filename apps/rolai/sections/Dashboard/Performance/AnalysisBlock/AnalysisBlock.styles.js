import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    marginTop: 30,
  },
  heading: {
    fontSize: 18,
    fontWeight: 500,
  },
  secondary: {
    fontSize: 13,
    color: 'black',
    opacity: 0.7,
  },
  titleBox: {
    margin: '10px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    border: '1px solid #EBEEF1',
    boxShadow: 'none',
    display: 'grid',
    // gridGap: '16px',
    gridTemplateColumns: 'repeat(4, 1fr)',
    borderRadius: 15,
    padding: '26px 0',
  },
}));

export default useStyles;
