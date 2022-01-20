import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginRight: theme.spacing(1),
    '& .MuiLinearProgress-root': {
      height: 6,
      borderRadius: 15,
      background: '#E6E9F2',
      '& .MuiLinearProgress-bar': {
        background: '#2DE352',
      },
    },
  },
}));

export default useStyles;
