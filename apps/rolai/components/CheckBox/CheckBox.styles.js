import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  group: {
    display: 'inline-grid',
  },
  checkboxLabel: {
    minHeight: 32,
    alignItems: 'flex-start',
    '& .MuiTypography-root': {
      fontSize: 14,
    },
    '& .MuiSvgIcon-root': {
      width: 20,
    },
    '& .MuiButtonBase-root': {
      padding: theme.spacing(0, 1),
      // color: '#B0C0D2',
      // '&$checked': {
      //   color: theme.palette.primary.main,
      // },
    },
    '& .Mui-disabled': {
      cursor: 'not-allowed',
    },
  },
  labelContainer: {
    display: 'flex',
    wordWrap: 'break-word',
    alignItems: 'flex-start',
    padding: '1px 0',
  },
  listCount: {
    background: '#EEF0F8',
    borderRadius: 10,
    padding: theme.spacing(0, 0.9),
  },
}));

export default useStyles;
