import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { NAVBAR_HEIGHT } from '../../utils/constants/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '70vh',
    paddingTop: `${NAVBAR_HEIGHT}px`,
  },
  listContainer: {
    display: 'flex',
  },
}));

export default useStyles;
