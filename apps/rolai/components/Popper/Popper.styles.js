import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  popper: {
    width: '450px',
    // minHeight: 690,
    background: 'white',
    borderRadius: 20,
    zIndex: 1200,
    // padding: '23px 30px',
    boxShadow: '0px 0px 25px #00000029',
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${theme.palette.background.paper} transparent transparent transparent`,
      },
    },
    '&[data-popper-placement*="right"] $arrow': {
      left: 0,
      marginTop: 15,
      marginBottom: 15,
      marginLeft: '-1.9em',
      height: '9em',
      width: '2em',
      '&::before': {
        borderWidth: '2em 2em 2em 0',
        borderColor: `transparent ${theme.palette.background.paper} transparent transparent`,
      },
    },
    '&[data-popper-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-1.9em',
      marginTop: 15,
      marginBottom: 15,
      height: '9em',
      width: '2em',
      '&::before': {
        borderWidth: '2em 0 2em 2em',

        borderColor: `transparent transparent transparent ${theme.palette.background.paper}`,
      },
    },
  },
  arrow: {
    position: 'absolute',
    fontSize: 7,
    right: 0,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  close: {
    position: 'absolute',
    right: 20,
    top: 20,
    cursor: 'pointer',
  },
}));

export default useStyles;
