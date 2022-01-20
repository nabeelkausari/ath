import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  levels: {
    height: 20,
    borderRadius: 5,
    textTransform: 'capitalize',
    border: `1px solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.secondary.main,
    fontWeight: 400,
    fontSize: 12,
    '& .MuiChip-label': {
      padding: theme.spacing(0.1, 0.5),
      color: theme.palette.text.secondary,
    },
  },
}));

export default useStyles;
