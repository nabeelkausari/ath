import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    minHeight: 450,
    minWidth: 700,
    zIndex: 1,
    position: 'relative',
    borderRadius: 28,
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.background.paper,
    '&:focus-visible': {
      outline: 'none',
    },
  },
  closeIconImage: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
  },
}));

export default useStyles;
