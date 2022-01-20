import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
  avatarRoot: {
    width: 28,
    height: 28,
    fontSize: 12,
    // backgroundColor: theme.palette.primary.main,
  },
  authorTitle: {
    fontWeight: 500,
  },
  authorSubHeader: {
    fontSize: 12,
  },
}));

export default useStyles;
