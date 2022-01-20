import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  progressContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  progressWrapper: {
    width: 40,
    height: 40,
    borderRadius: 7,
    background: '#F1F3FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContent: {
    display: 'flex',
  },
  view: {
    minWidth: 26,
    padding: theme.spacing(0.2, 0, 0, 0),
    fontSize: 12,
    fontWeight: 400,
  },
  progress: {
    width: 90,
  },
}));

export default useStyles;
