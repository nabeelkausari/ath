import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  courses: {},
  coursesContainer: {
    '& .MuiCard-root': {
      padding: theme.spacing(1, 0, 0, 0),
      margin: theme.spacing(2),
      '& .MuiCardContent-root:last-child': {
        paddingBottom: theme.spacing(2),
      },
    },
    '& .MuiStep-root': {
      '&:after': {
        borderLeftStyle: 'dashed',
      },
    },
    '& .rightImage': {
      minHeight: 300,
    },
    '& .MuiStepConnector-root ': {
      '& .MuiStepConnector-line': {
        borderLeftStyle: 'dashed',
      },
    },
    '& .MuiStepIcon-root': {
      fill: theme.palette.secondary.main,
      '& .MuiStepIcon-text': {
        fill: theme.palette.primary.main,
        fontWeight: 600,
        fontSize: 14,
      },
    },
  },
}));

export default useStyles;
