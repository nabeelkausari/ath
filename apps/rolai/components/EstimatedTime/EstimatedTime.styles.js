import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  timeContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: theme.spacing(0, 4),
  },
  clockWrapper: {
    width: 40,
    height: 40,
    borderRadius: 7,
    background: '#F1F3FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default useStyles;
