import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 2.5),
    background: theme.palette.secondary.main,
    maxHeight: 56,
  },
  header_title_text: {
    lineClamp: 1,
    overflow: 'hidden',
    display: '-webkit-box',
    boxOrient: 'vertical',
    wordBreak: 'break-word',
    paddingRight: theme.spacing(1),
    marginLeft: `${theme.spacing(1)} !important`,
  },
  rightSection: {
    display: 'flex',
    alignItems: 'baseline',
  },
  milestoneSteps: {
    padding: theme.spacing(0, 2),
  },
  backIcon: {
    cursor: 'pointer',
  },
}));

export default useStyles;
