import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  topBar: {
    backgroundColor: '#F8F9FB',
    minHeight: theme.spacing(6),
    boxShadow: '0px 2px 5px #153B7D14',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 4),
  },
  chips: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(0.5),
    flexWrap: 'wrap',
    alignContent: 'space-evenly',
  },
  chip: {
    margin: theme.spacing(0.5),
    '&.MuiChip-root': {
      borderRadius: theme.spacing(0.5),
      backgroundColor: '#EEF0F8',
    },
  },
  info: {
    flexShrink: 0,
  },
  clear: {
    flexShrink: 0,
  },
}));

export default useStyles;
