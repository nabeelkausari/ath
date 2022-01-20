import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    editorWrapper:{
        height:'calc(100vh - 510px)',
        minWidth:500,
        overflow:'hidden',
        padding:theme.spacing(2),
        '& #blah2':{
            width:'100% !important',
            height:'100% !important',
        },
    },
    consoleHeader:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        paddingBottom: theme.spacing(2),
    },
    fullScreen:{
        height:'calc(100vh - 220px)',
    }
 }));

export default useStyles;
