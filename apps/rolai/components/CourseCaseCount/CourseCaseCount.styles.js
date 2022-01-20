import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  countSnippet: {
    display: 'flex',
  },
  countIcon: {
    display: 'flex',
    justifyContent: 'center',
    marginRight: 8,
  },
  countText: {
    '&.MuiTypography-root': {
      // lineHeight: 1.85,
      fontSize: 13,
    },
  },
}));

export default useStyles;
