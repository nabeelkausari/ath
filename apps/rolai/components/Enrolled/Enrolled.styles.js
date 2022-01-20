import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  enrolled: {
    color: theme.palette.success.main,
    display: 'flex',
    alignItems: 'baseline',
    width: 68,
    justifyContent: 'space-between',
  },
}));

export default useStyles;
