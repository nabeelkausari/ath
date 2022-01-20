import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    ...theme.sections.dashboard.rightSection,
    margin: 0,
    padding: 0,
    background: 'white',
    boxShadow: 'none',
  },
  rightBody: {
    padding: 16,
    height: 'calc(100vh - 200px)',
    overflow: 'auto',
  },
  boxContainer: {
    display: 'grid',
    gridGap: '16px',
    gridTemplateColumns: 'repeat(3, 1fr)',
    justifyContent: 'start',
  },
}));

export default useStyles;
