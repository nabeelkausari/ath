import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  bannerContainer: {
    padding: theme.spacing(2, 0),
    marginBottom: theme.spacing(2),
  },
  banner: {
    background: 'white',
    height: 97,
    padding: theme.spacing(2, 0),
    display: 'flex',
    borderRadius: 15,
    marginTop: theme.spacing(2),
  },
  bannerImage: {
    minWidth: 350,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
  },
  bannerLogo: {
    width: 270,
    height: 50,
  },
  bannerContent: {
    borderLeft: '1px solid #EFF2F5',
    padding: theme.spacing(0, 4),

    '& h6': {
      fontSize: 16,
      fontWeight: 'medium',
    },

    '& p': {
      fontSize: 14,
      fontWeight: 'normal',
    },
  },
}));

export default useStyles;
