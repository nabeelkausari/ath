import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    ActionsWrapper:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background:'#F8FAFF',
        padding: theme.spacing(1,3),
    },
 }));

export default useStyles;
