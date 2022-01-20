import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    tableWrapper:{
        height:'calc(100vh - 510px)',
        overflow:'auto',
        padding:theme.spacing(0,3),
        '& table':{
            '& th':{
                background:'#F8FAFF',
                fontWeight:400,
                color:'#333',
                padding:theme.spacing(1.5),
                borderBottom: 0,
            },
            '& td':{
                borderBottom: '1px solid #EAEDF1',
                padding:theme.spacing(1.5),
            },
        }
    },
    fullScreen:{
        height:'calc(100vh - 220px)',
    }
 }));

export default useStyles;
