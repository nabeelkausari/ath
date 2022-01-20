import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  radioButtons:{
    '& > div':{
      padding:theme.spacing(2,0),
      display: 'flex',
    },
  },
}));

export default useStyles;
