import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  table: {
    borderRadius: '50%',
  },
  tableHeader: {
    '& .MuiTableRow-root': {
      background: '#F8FAFF',
      '& th': {
        fontWeight: 400,
      },
      '& th:first-child': {
        borderTopLeftRadius: 15,
      },
      '& th:last-child': {
        borderTopRightRadius: 15,
      },
    },
  },
  tableData: {
    // color:
  },
}));

export default useStyles;
