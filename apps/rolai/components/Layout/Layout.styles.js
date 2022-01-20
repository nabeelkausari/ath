import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { NAVBAR_HEIGHT } from '../../utils/constants/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#F8F9FB',
    minHeight: '70vh',
    paddingTop: `${NAVBAR_HEIGHT}px`,
  },
  dashboard: {
    display: 'flex',
    width: '100%',
    minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,

    background: '#FAFBFD',
    margin: 'auto',
  },

  admin: {
    display: 'flex',
    width: '100%',
    minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
    fontSize: 13,
    background: '#FAFBFD',
    margin: 'auto',
    '& >div:last-child': {
      flex: 1,
      padding: '25px 30px',
      height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      overflow: 'auto',
    },
  },
}));

export default useStyles;
