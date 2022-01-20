import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    compareSteps:{
        display: 'flex',
        alignItems: 'initial',
        justifyContent: 'space-between',
    },
    appBarWrapper: {
        boxShadow: 'none',
        background: 'transparent',
        padding: theme.spacing(1, 1, 0, 1),
        borderRadius:'0px !important',

        '& button': {
            fontWeight: 400,
            textTransform: 'capitalize',
        },
    },
    consoleAppBarWrapper:{
        position:'relative',
    },
    divider:{
        background:'#EEF0F8',
        width:2,
        margin:theme.spacing(.2)
    },
    copyCode:{
        cursor: 'pointer',
        paddingTop:theme.spacing(2.5),
    }
 }));

export default useStyles;
