import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  panel: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  tabPanel: {
    '& > .MuiBox-root': {
      padding: 0,
    },
  },
}));

export default useStyles;
