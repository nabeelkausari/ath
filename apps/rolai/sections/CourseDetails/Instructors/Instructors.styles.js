import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  instructors: {
    padding: theme.spacing(0, 6),
  },
  instructorsDetails: {
    display: 'flex',
    padding: theme.spacing(2, 4),
  },
  instructorImage: {
    width: 120,
    height: 120,
    borderRadius: 50,
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    border: '1px solid #5064E3',
  },
  instructorsContent: {
    paddingLeft: theme.spacing(3),
  },
}));

export default useStyles;
