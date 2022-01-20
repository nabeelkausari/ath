import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  databases_list: {
    width: 80,
    height: 80,
    background: 'white',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    margin: theme.spacing(1),
    border: '1px solid #5064E3',
    borderRadius: 10,
  },
  disabled_db: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  selectDbWrapper: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-around',
  },
  dbLabel: {
    fontSize: 12,
  },
}));

export default useStyles;
