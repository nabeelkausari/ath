import { makeStyles } from '@mui/styles';
import { STYLES } from '../../Admin/Components/Common/Common.styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    width: 690,
    margin: '20px auto',
    background: 'white',
    border: STYLES.border.primary,
    borderRadius: 10,
    padding: 40,
    minHeight: 654,
    fontSize: 12,
  },
  body: {
    width: 380,
    margin: 'auto',
  },
  city: {
    '& .city-select__control': {
      border: '1px solid #D5D9EE',
      height: 30,
      borderRadius: '10px',
      fontSize: 13,
      // padding: '5px 10px',
      minHeight: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'white',
      width: '100%',
    },
    '& .city-select__indicator-separator': {
      display: 'none',
    },
    '& .city-select__indicator': {
      padding: 0,
      paddingRight: 10,
      color: '#8990ae !important',
      '& svg': {
        width: 16,
      },
    },
    '& .city-select__input-container': {
      padding: 0,
    },
    '& .city-select__value-container': {
      paddingTop: 0,
    },
  },
  inputWrapper: {
    width: '100% !important',
    margin: '10px 0',
  },

  upload: {
    border: STYLES.border.primary,
    borderRadius: 10,
    // padding: 10,
    position: 'relative',
    width: 80,
    height: 80,
    borderRadius: 80,
    margin: 'auto',
    '& >div:first-child': {
      borderRadius: 80,
    },
  },
  edit: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    border: `1px solid ${theme.palette.primary.main}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    height: 30,
    width: 30,
    background: 'white',
    cursor: 'pointer',
  },
  uploadInput: {
    display: 'none',
  },
  date: {
    width: '48%',
    '& .MuiInput-root': {
      border: '1px solid #D5D9EE',
      margin: 0,
      color: 'inherit !important',
      paddingLeft: 10,
    },
    '& .calendar-input': {
      marginBottom: '0 !important',
    },
  },
}));

export default useStyles;
