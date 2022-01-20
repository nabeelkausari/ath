import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  about: {},
  listData: {
    maxWidth: 500,
    borderRadius: 15,
    background: '#F8FAFF',
    margin: theme.spacing(2, 0),
    boxShadow: '0px 0px 0px #153B7D14',
    '& .MuiCardContent-root:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
  content: {
    display: 'flex',
    alignItems: 'baseline',
  },
  subHeader: {
    fontWeight: 300,
  },
  contentImg: {
    width: 23,
    height: 19,
  },
}));

export default useStyles;
