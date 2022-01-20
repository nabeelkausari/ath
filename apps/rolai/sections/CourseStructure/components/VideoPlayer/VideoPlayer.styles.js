import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  videoPlayer: {
    background: 'white',
  },
  videoPlayerVideo: {
    width: '100%',
    height: '75%',
    position: 'relative',
    borderRadius: theme.spacing(1.5),
  },
  consoleBtn:{
    padding: '2rem 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'space-around',
    borderRadius: '6px',
    background: '#F1F3FF',
    marginBottom: '2rem',
  }
}));

export default useStyles;
