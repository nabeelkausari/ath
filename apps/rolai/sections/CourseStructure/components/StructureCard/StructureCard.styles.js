import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  baseCard: {
    minWidth: 500,
    maxWidth: 800,
    minHeight: 550,
    borderRadius: 15,
    padding: theme.spacing(5, 4.2),
    border: '1px solid #EBEEF1',
    flex: 1,
    height: 'fit-content',
    marginBottom: theme.spacing(10),
  },
  content: {
    borderTop: '1px solid #F0F0F0',
  },
}));

export default useStyles;
