import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  parent: {
    ...theme.sections.dashboard.leftSection,
    paddingTop: 0,
    paddingBottom: 0,
  },
  container: {
    height: 'calc(100vh - 160px)',
    overflow: 'auto',
    marginRight: -10,
    paddingRight: 10,
  },
}));

export default useStyles;
