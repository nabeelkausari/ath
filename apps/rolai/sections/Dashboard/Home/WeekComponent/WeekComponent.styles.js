import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  day: {
    color: '#82889B',
    fontSize: 11,
    marginTop: 5,
    textTransform: 'capitalize',
  },
  date: {
    borderRadius: '50%',
    width: 35,
    height: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: 500,
    border: '1px solid #DEE3FF',
  },
  active: {
    border: `2px solid ${theme.palette.primary.main}`,
  },
  customBadge: {
    background: 'white',
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    minWidth: 16,
    height: 16,
    padding: 2,
    fontSize: 10,
  },
}));

export default useStyles;
