import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  input: {
    border: '1px solid #D5D9EE',
    height: 30,
    borderRadius: '10px',
    fontSize: 13,
    padding: '5px 10px',
    background: 'white',
    width: '100%',
    outline: 'none',
  },
  noBorder: {
    background: 'transparent',
    border: '1px solid transparent !important',
  },
  disabled: {
    background: theme.palette.border.main,
    cursor: 'none',
    border: '1px solid transparent !important',
    '& input': {
      color: theme.palette.text.primary,
      '-webkit-text-fill-color': 'initial !important',
    },
  },
  ico: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
  box: {
    width: '200px',
    '& .MuiInputBase-multiline': {
      height: 'initial',
      padding: '0 !important',
      '& textarea': {
        padding: '5px 10px !important',
      },
    },
  },
}));

export default useStyles;
