import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    editorWrapper:{
        height:'calc(100vh - 450px)',
        overflow:'auto',
        padding:theme.spacing(1,3)
    }
 }));

export default useStyles;
