import { makeStyles } from '@mui/styles';
import { STYLES } from '../Components/Common/Common.styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    width: 690,
    margin: '20px auto',
    background: 'white',
    border: STYLES.border.primary,
    borderRadius: 10,
    padding: 40,
    minHeight: 654,
  },
  body: {
    width: 380,
    margin: 'auto',
  },
  inputWrapper: {
    width: '100%',
    margin: '10px 0',
  },

  upload: {
    border: STYLES.border.primary,
    borderRadius: 10,
    padding: 10,
    position: 'relative',
  },
  edit: {
    position: 'absolute',
    bottom: -10,
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
}));

export default useStyles;
