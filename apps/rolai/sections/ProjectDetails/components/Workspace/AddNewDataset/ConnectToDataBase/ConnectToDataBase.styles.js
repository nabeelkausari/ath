import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  radioButtons: {
    '& > div': {
      padding: theme.spacing(2, 0),
      display: 'flex',
    },
  },
  labelWrapper: {
    position: 'relative',
    '& .MuiStepLabel-labelContainer': {
      color: 'black',
      fontWeight: 400,
      '& .Mui-active': {
        color: theme.palette.primary.main,
      },
    },
  },
  stepperWrapper: {
    background: '#F8FAFF',
    padding: theme.spacing(3),
    '& .MuiStepConnector-root ': {
      '& .MuiStepConnector-line': {
        border: '1px dashed #B0C0D2',
      },
    },
  },
  newConnection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepLabel: {
    position: 'absolute',
    left: 48,
    bottom: 8,
    fontSize: 13,
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
