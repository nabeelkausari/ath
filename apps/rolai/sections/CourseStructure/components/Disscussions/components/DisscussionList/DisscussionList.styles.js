import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    width: 350,
    padding: '25px 35px',
    background: theme.palette.background.secondary,
    borderLeft: `1px solid ${theme.palette.border.main}`,
    height: '100%',
    overflow: 'auto',
  },
  item: {
    padding: '15px 0',
    borderBottom: `1px solid ${theme.palette.border.main}`,
    cursor: 'pointer',
  },
  list: {
    '& $item:last-child': {
      borderBottom: `1px solid transparent`,
    },
    marginBottom: 20,
  },
  heading: {
    fontWeight: '500',
  },
  link: {
    color: theme.palette.primary.main,
    fontWeight: 'normal',
    fontSize: 12,
    cursor: 'pointer',
  },
}));

export default useStyles;
