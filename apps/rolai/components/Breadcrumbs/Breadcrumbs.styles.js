import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 0, 0, 0),
    marginBottom: theme.spacing(3),
    '& .MuiTypography-root': {
      fontWeight: '500',
      fontSize: '14px',
    },

    '& .MuiBreadcrumbs-separator': {
      margin: theme.spacing(0, 0.5),
      '& svg': {
        opacity: 0.5,
      },
    },
  },
}));

export default useStyles;
