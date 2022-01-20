import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { FLYOUT_TOP } from '../FunctionsFlyout/FunctionsFlyout.styles';

const useStyles = makeStyles((theme) => ({
  console: {
    height: `calc(100vh - ${FLYOUT_TOP}px)`,
    width: '100vw',
    position: 'relative',

    '& .ath-console': {
      width: '100%',
      height: '100%',
      border: 'none',
    },
  },
}));

export default useStyles;
