import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  chip: {
    padding: '4px 8px',
    fontSize: 10,
    borderRadius: 10,
    textTransform: 'capitalize',
    display: 'table-cell',
    lineHeight: 1,
  },
}));

export default useStyles;
