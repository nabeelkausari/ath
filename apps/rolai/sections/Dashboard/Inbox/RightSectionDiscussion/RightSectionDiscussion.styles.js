import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    ...theme.sections.dashboard.rightSection,
    margin: 0,
    padding: 0,
    background: 'white',
    boxShadow: 'none',
    fontSize: 13,
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
  wrapper: {
    padding: 30,
    borderBottom: `1px solid ${theme.palette.border.main}`,
  },
}));

export default useStyles;
