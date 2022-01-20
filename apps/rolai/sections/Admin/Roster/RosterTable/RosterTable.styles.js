import { makeStyles } from '@mui/styles';
import { STYLES } from '../../Components/Common/Common.styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    '& tbody tr:hover': {
      '& $rowActions': {
        display: 'flex',
      },
    },
  },

  rowActions: {
    position: 'absolute',
    right: 20,
    top: 10,
    display: 'none',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& >div': {
      margin: 6,
      cursor: 'pointer',
    },
  },
  deleteButton: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default useStyles;
