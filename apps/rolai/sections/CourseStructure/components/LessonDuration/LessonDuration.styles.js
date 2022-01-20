import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  contentIcons: {
    height: 16,
    display: 'flex',
    padding: theme.spacing(0, 1),
    borderRight: '1px solid #CFDCE8',
    '&:first-child': {
      paddingLeft: theme.spacing(0),
    },
    '&:last-child': {
      borderRight: '0',
    },
  },
  contentIconsContainer: {
    display: 'flex',
  },
}));

export default useStyles;
