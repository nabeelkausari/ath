import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    ConsolePanel:{
        flex: 1,
        borderRadius: 15,
        border: '1px solid #EBEEF1',
        height: 'calc(100vh - 150px)',
        overflow:'hidden',
    },
    appBarWrapper: {
        boxShadow: 'none',
        borderRadius:'0px !important',
        background: 'transparent',
        borderBottom: '1px solid #EAEDF1',
        padding: theme.spacing(1, 1, 0, 1),
        '& button': {
            fontWeight: 400,
            textTransform: 'capitalize',
        },
    },
    consoleAppBarWrapper:{
        position:'relative',
    },
    resetCode:{
        position: 'absolute',
        top: theme.spacing(3),
        right: theme.spacing(8),
        cursor:'pointer',
    },
    expandConsole:{
        position: 'absolute',
        top: theme.spacing(3),
        right: theme.spacing(2),
        cursor:'pointer',
    }
 }));

export default useStyles;
