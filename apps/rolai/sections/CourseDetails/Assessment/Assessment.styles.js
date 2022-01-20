import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  assessment: {},
  root: {
    maxWidth: 500,
    borderRadius: 15,
    border: '1px solid #EFF2F5',
    padding: theme.spacing(2),
    margin: theme.spacing(2, 4),
    boxShadow: '0px 0px 0px #153B7D14',
    '& .MuiCardContent-root:last-child': {
      padding: theme.spacing(1),
    },
  },
  assesmentDetails: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: theme.spacing(0, 2),
  },
  assesmentImage: {
    paddingTop: theme.spacing(.6),
  },
  assesmentContent: {
    paddingLeft: theme.spacing(3),
  },
}));

export default useStyles;
