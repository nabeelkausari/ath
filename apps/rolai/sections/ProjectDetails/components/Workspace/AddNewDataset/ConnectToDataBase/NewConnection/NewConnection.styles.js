import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  newConnection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '& div': {
      flex: 1,
    },
  },
}));

export default useStyles;
