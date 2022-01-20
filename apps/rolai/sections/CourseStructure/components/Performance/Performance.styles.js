import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    padding: 24,
  },
  pieDetail: {
    display: 'flex',
  },
  heading: {
    fontSize: 18,
    fontWeight: 500,
    margin: '15px 0',
  },
  topCard: {
    display: 'flex',
    boxShadow: '0px 4px 25px #153B7D14',
    borderRadius: 15,
    padding: 30,
    minHeight: 304,
    justifyContent: 'space-between',
  },
  first: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  pie: {
    margin: '0 20px',
  },
  title: {
    marginTop: -5,
    fontSize: 16,
    fontWeight: 500,
  },
}));

export default useStyles;
