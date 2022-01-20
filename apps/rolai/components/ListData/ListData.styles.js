import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  listView: {
    minHeight: 100,
  },
  listItem: {
    alignItems: 'baseline',
    padding: theme.spacing(0.3),
  },
  listIcon: {
    minWidth: 20,
  },
  listText: {
    margin: 0,
  },
}));

export default useStyles;
