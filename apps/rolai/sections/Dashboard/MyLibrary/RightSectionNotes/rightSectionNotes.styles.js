import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    ...theme.sections.dashboard.rightSection,
    margin: 0,
    padding: 0,
    background: 'white',
    boxShadow: 'none',
  },
  topItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spaceBetween: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  rightBody: {
    padding: 16,
    height: 'calc(100vh - 200px)',
    overflow: 'auto',
  },
}));

export default useStyles;
