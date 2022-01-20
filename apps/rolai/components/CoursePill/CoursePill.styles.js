import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  coursePill: {
    height: '20px',
    background: '#EEF0F8',
    fontSize: 12,
    '& .MuiChip-label': {
      padding: '2px 8px !important',
    },
  },
}));

export default useStyles;
