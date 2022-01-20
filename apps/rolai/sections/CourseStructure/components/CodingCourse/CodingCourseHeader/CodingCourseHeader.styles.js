import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 2.5),
    background: theme.palette.secondary.main,
  },
  header_title_text: {
    width: 510,
    height: 28,
    lineClamp: 1,
    overflow: 'hidden',
    display: '-webkit-box',
    boxOrient: 'vertical',
    wordBreak: 'break-word',
    paddingRight: theme.spacing(1),
    fontWeight: 400,
  },
  rightSection: {
    display: 'flex',
    alignItems: 'baseline',
  },
  milestoneSteps: {
    padding: theme.spacing(0, 2),
  },
  backIcon:{
    cursor: 'pointer',
  },
  backIconBox:{
    transform:'rotate(270deg)',
    padding:theme.spacing(0,2),
  },
  submitBtn:{
    marginLeft: theme.spacing(2),
  }
}));

export default useStyles;
